"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface NodePoint {
  position: THREE.Vector3;
  connections: number[];
  color: THREE.Color;
  size: number;
}

interface SignalPulse {
  startIdx: number;
  endIdx: number;
  progress: number;
  speed: number;
}

function NetworkMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const signalsRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();

  // Generate neural network nodes and synaptic connections
  const { nodes, lineGeometry, signals } = useMemo(() => {
    const nodeCount = 38;
    const generatedNodes: NodePoint[] = [];
    const cyan = new THREE.Color("#00f0ff");
    const white = new THREE.Color("#e2e8f0");
    const cyanDark = new THREE.Color("#007799");

    // Distributed in a layered ellipsoid / neural graph topology
    for (let i = 0; i < nodeCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.4 + Math.random() * 0.9;

      const sinPhi = Math.sin(phi);
      const x = r * sinPhi * Math.cos(theta) * 1.3;
      const y = r * sinPhi * Math.sin(theta) * 0.9;
      const z = r * Math.cos(phi) * 1.1;

      // Color variation: mostly cyan, some high-intensity white nodes
      const isHub = Math.random() > 0.75;
      const nodeColor = isHub ? white : Math.random() > 0.4 ? cyan : cyanDark;

      generatedNodes.push({
        position: new THREE.Vector3(x, y, z),
        connections: [],
        color: nodeColor,
        size: isHub ? 0.08 : 0.05,
      });
    }

    // Connect nodes that are within distance threshold
    const linePositions: number[] = [];
    const lineColors: number[] = [];
    const maxDistance = 2.1;

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = generatedNodes[i].position.distanceTo(generatedNodes[j].position);
        if (dist < maxDistance) {
          generatedNodes[i].connections.push(j);
          generatedNodes[j].connections.push(i);

          linePositions.push(
            generatedNodes[i].position.x,
            generatedNodes[i].position.y,
            generatedNodes[i].position.z,
            generatedNodes[j].position.x,
            generatedNodes[j].position.y,
            generatedNodes[j].position.z
          );

          // Subtle gradient on line
          lineColors.push(0, 0.94, 1.0, 0.4);
          lineColors.push(0, 0.6, 0.8, 0.2);
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );

    // Initial signals pulsing along edges
    const initialSignals: SignalPulse[] = [];
    for (let i = 0; i < 18; i++) {
      const startIdx = Math.floor(Math.random() * nodeCount);
      const node = generatedNodes[startIdx];
      if (node.connections.length > 0) {
        const endIdx =
          node.connections[Math.floor(Math.random() * node.connections.length)];
        initialSignals.push({
          startIdx,
          endIdx,
          progress: Math.random(),
          speed: 0.005 + Math.random() * 0.009,
        });
      }
    }

    return {
      nodes: generatedNodes,
      lineGeometry: geometry,
      signals: initialSignals,
    };
  }, []);

  // Geometry for node dots
  const nodeGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];
    const colors: number[] = [];

    nodes.forEach((node) => {
      positions.push(node.position.x, node.position.y, node.position.z);
      colors.push(node.color.r, node.color.g, node.color.b);
    });

    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    return geo;
  }, [nodes]);

  // Buffer for moving signals
  const signalGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(signals.length * 3);
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [signals.length]);

  // Animation frame loop
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Gentle base rotation
    groupRef.current.rotation.y += delta * 0.12;
    groupRef.current.rotation.x += delta * 0.04;

    // Smooth mouse parallax
    const targetRotX = pointer.y * 0.35;
    const targetRotY = pointer.x * 0.45;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      0.03
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY + state.clock.getElapsedTime() * 0.08,
      0.03
    );

    // Update signal pulses
    if (signalsRef.current) {
      const posAttr = signalsRef.current.geometry.attributes
        .position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      signals.forEach((sig, idx) => {
        sig.progress += sig.speed;
        if (sig.progress >= 1.0) {
          sig.progress = 0;
          // Pick next connection
          const currNode = nodes[sig.endIdx];
          sig.startIdx = sig.endIdx;
          if (currNode.connections.length > 0) {
            sig.endIdx =
              currNode.connections[
                Math.floor(Math.random() * currNode.connections.length)
              ];
          }
        }

        const startPos = nodes[sig.startIdx].position;
        const endPos = nodes[sig.endIdx].position;

        posArray[idx * 3] = THREE.MathUtils.lerp(
          startPos.x,
          endPos.x,
          sig.progress
        );
        posArray[idx * 3 + 1] = THREE.MathUtils.lerp(
          startPos.y,
          endPos.y,
          sig.progress
        );
        posArray[idx * 3 + 2] = THREE.MathUtils.lerp(
          startPos.z,
          endPos.z,
          sig.progress
        );
      });

      posAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Neural Lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Nodes */}
      <points geometry={nodeGeometry}>
        <pointsMaterial
          size={0.14}
          vertexColors
          transparent
          opacity={0.88}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Signal Pulses */}
      <points ref={signalsRef} geometry={signalGeometry}>
        <pointsMaterial
          size={0.22}
          color="#ffffff"
          transparent
          opacity={0.95}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function NeuralNetwork3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Pause rendering when off-screen using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 48 }}
        dpr={[1, 1.5]}
        frameloop={isVisible ? "always" : "never"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.5} />
        <NetworkMesh />
      </Canvas>
    </div>
  );
}
