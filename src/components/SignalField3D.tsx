"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface SignalFieldSceneProps {
  progress: number;
  pointerPos: { x: number; y: number };
}

// Custom GLSL Shaders for Fine Noise-to-Signal Dust Convergence
const vertexShader = `
  uniform float uProgress;
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uPixelRatio;
  uniform vec3 uSignalColor;

  attribute vec3 aTargetPosition;
  attribute vec3 aColor;
  attribute float aSize;
  attribute vec2 aRandom;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Non-linear easing for smooth model convergence
    float p = smoothstep(0.0, 1.0, uProgress);
    vec3 pos = mix(position, aTargetPosition, p);

    // Subtle natural turbulence (diminishes as convergence reaches ordered state)
    float idleAmp = (1.0 - p * 0.7) * 0.12;
    pos.x += sin(uTime * 0.8 + aRandom.x * 6.28) * idleAmp;
    pos.y += cos(uTime * 0.7 + aRandom.y * 6.28) * idleAmp;
    pos.z += sin(uTime * 0.6 + (aRandom.x + aRandom.y) * 3.14) * idleAmp;

    // Pointer interaction: particles gently pushed and attracted
    vec3 pointerWorld = vec3(uPointer.x * 3.8, uPointer.y * 2.6, 0.4);
    vec3 toPointer = pos - pointerWorld;
    float dist = length(toPointer);
    if (dist < 2.5 && dist > 0.001) {
      float repel = (1.0 - dist / 2.5) * 0.35;
      pos += normalize(toPointer) * repel;
    }

    // Periodic amber signal pulse traveling through the network
    float pulseSpeed = 1.8;
    float pulseFreq = 1.2;
    float wave = sin(uTime * pulseSpeed - (pos.x * 0.65 + length(pos.yz) * 1.0) * pulseFreq);
    float signalBoost = smoothstep(0.78, 1.0, wave);

    // Color: mostly muted paper/blue, illuminated by amber wave on pulse
    vColor = mix(aColor, uSignalColor, signalBoost * 0.8);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Fine dust particle point size: multiplier 34.0, strictly clamped to 1.5–4.5 px
    float pointScale = aSize * (1.0 + signalBoost * 0.3);
    float pSize = pointScale * (34.0 / -mvPosition.z) * uPixelRatio;
    gl_PointSize = clamp(pSize, 1.5 * uPixelRatio, 4.5 * uPixelRatio);

    // Restrained per-particle alpha so canvas remains dark navy overall
    vAlpha = (0.24 + signalBoost * 0.3) * smoothstep(13.0, 3.5, -mvPosition.z);
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Soft circular particle with anti-aliased edge
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;

    float halo = smoothstep(0.5, 0.05, dist);
    gl_FragColor = vec4(vColor, halo * vAlpha);
  }
`;

function ParticlePoints({ progress, pointerPos }: SignalFieldSceneProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { gl, scene } = useThree();

  // Subtle depth fog matching ink page background (#0F1626)
  useEffect(() => {
    scene.fog = new THREE.FogExp2("#0F1626", 0.045);
    return () => {
      scene.fog = null;
    };
  }, [scene]);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const count = isMobile ? 2800 : 7200;

  const { chaosPositions, targetPositions, colors, sizes, randoms } = useMemo(() => {
    const chaos = new Float32Array(count * 3);
    const target = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const szs = new Float32Array(count);
    const rands = new Float32Array(count * 2);

    // Color tokens: mostly muted blue-grey and paper; amber only as a restrained accent
    const mutedBlueDark = new THREE.Color("#364B6B");
    const mutedBlue = new THREE.Color("#556B8F");
    const paper = new THREE.Color("#ECE8DF");
    const paperDim = new THREE.Color("#9AA3B5");
    const amber = new THREE.Color("#F2A93B");

    // Neural structure layers for target alignment: 5 principal layers along X
    const layerXs = [-3.0, -1.5, 0.0, 1.5, 3.0];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // 1. CHAOS: Turbulent noise cloud ("untrained model output")
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.pow(Math.random(), 0.6) * 4.4 + 0.5;

      const sinPhi = Math.sin(phi);
      const cx = r * sinPhi * Math.cos(theta);
      const cy = r * sinPhi * Math.sin(theta) * 0.75;
      const cz = r * Math.cos(phi) * 1.05;

      chaos[i3] = cx + Math.sin(cy * 2.0) * 0.7;
      chaos[i3 + 1] = cy + Math.cos(cz * 2.0) * 0.5;
      chaos[i3 + 2] = cz + Math.sin(cx * 2.0) * 0.6;

      // 2. TARGET: Ordered, aligned neural structure & concentric manifolds
      if (Math.random() < 0.72) {
        const layerIdx = Math.floor(Math.random() * layerXs.length);
        const lx = layerXs[layerIdx];
        const ringAngle = Math.random() * Math.PI * 2.0;
        const ringRadius = 0.3 + Math.pow(Math.random(), 0.7) * 2.2;
        target[i3] = lx + (Math.random() - 0.5) * 0.2;
        target[i3 + 1] = Math.sin(ringAngle) * ringRadius;
        target[i3 + 2] = Math.cos(ringAngle) * ringRadius * 0.75;
      } else {
        const t = Math.random() * 2.0 - 1.0;
        const orbitalAngle = Math.random() * Math.PI * 2.0;
        const orbitalR = 1.9 + Math.sin(t * Math.PI) * 0.7;
        target[i3] = t * 3.2;
        target[i3 + 1] = Math.sin(orbitalAngle) * orbitalR * 0.6;
        target[i3 + 2] = Math.cos(orbitalAngle) * orbitalR * 0.75;
      }

      // 3. COLOR PALETTE:
      // ~60% muted blue/slate, ~28% paper/paper-dim, ~12% amber signal
      const roll = Math.random();
      let chosenColor: THREE.Color;
      if (roll < 0.35) {
        chosenColor = mutedBlueDark;
      } else if (roll < 0.60) {
        chosenColor = mutedBlue;
      } else if (roll < 0.75) {
        chosenColor = paperDim;
      } else if (roll < 0.88) {
        chosenColor = paper;
      } else {
        chosenColor = amber;
      }

      cols[i3] = chosenColor.r;
      cols[i3 + 1] = chosenColor.g;
      cols[i3 + 2] = chosenColor.b;

      // 4. SIZE & RANDOM PHASES
      szs[i] = Math.random() * 0.8 + 0.8;
      rands[i * 2] = Math.random();
      rands[i * 2 + 1] = Math.random();
    }

    return {
      chaosPositions: chaos,
      targetPositions: target,
      colors: cols,
      sizes: szs,
      randoms: rands,
    };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 1.5) },
      uSignalColor: { value: new THREE.Color("#F2A93B") },
    }),
    [gl]
  );

  useFrame((state, delta) => {
    if (!materialRef.current) return;

    // Smoothly update uniforms
    materialRef.current.uniforms.uProgress.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uProgress.value,
      progress,
      0.1
    );
    materialRef.current.uniforms.uTime.value += delta;
    materialRef.current.uniforms.uPointer.value.set(pointerPos.x, pointerPos.y);

    // Subtle camera parallax
    const targetCamX = pointerPos.x * 0.35;
    const targetCamY = pointerPos.y * 0.25;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetCamX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetCamY, 0.05);
    state.camera.lookAt(0, 0, 0);

    // Gentle global rotation
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[chaosPositions, 3]}
        />
        <bufferAttribute
          attach="attributes-aTargetPosition"
          args={[targetPositions, 3]}
        />
        <bufferAttribute
          attach="attributes-aColor"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[sizes, 1]}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          args={[randoms, 2]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

interface SignalField3DProps {
  progress: number;
  pointerPos: { x: number; y: number };
  isActive: boolean;
}

export default function SignalField3D({ progress, pointerPos, isActive }: SignalField3DProps) {
  return (
    <div className="absolute inset-0 h-full w-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        frameloop={isActive ? "always" : "never"}
        className="h-full w-full"
      >
        <ParticlePoints progress={progress} pointerPos={pointerPos} />
      </Canvas>
    </div>
  );
}
