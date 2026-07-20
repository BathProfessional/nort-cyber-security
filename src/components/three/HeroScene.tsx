"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/useMousePosition";

/* ── Shield geometry from interlocking plates ── */
function ShieldCore({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const plates = useRef<THREE.Group>(null);
  const energyRing = useRef<THREE.Mesh>(null);
  const energyRing2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.15 + mouse.current.x * 0.3;
      group.current.rotation.x = mouse.current.y * 0.15;
    }
    if (plates.current) {
      plates.current.rotation.y = -t * 0.08;
    }
    if (energyRing.current) {
      energyRing.current.rotation.z = t * 0.4;
      energyRing.current.scale.setScalar(1 + Math.sin(t * 2) * 0.04);
    }
    if (energyRing2.current) {
      energyRing2.current.rotation.z = -t * 0.25;
      energyRing2.current.scale.setScalar(1 + Math.cos(t * 1.5) * 0.06);
    }
  });

  const platePositions = useMemo(() => {
    const items: { pos: [number, number, number]; rot: [number, number, number]; color: string }[] = [];
    const colors = ["#00F0FF", "#0088FF", "#00F0FF", "#FF00AA", "#00F0FF", "#0088FF"];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      items.push({
        pos: [Math.cos(angle) * 1.1, Math.sin(angle) * 1.3, 0.15],
        rot: [0, 0, angle],
        color: colors[i],
      });
    }
    return items;
  }, []);

  return (
    <group ref={group}>
      {/* Outer shield shell */}
      <mesh>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshBasicMaterial
          color="#00F0FF"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Solid inner shield body */}
      <mesh>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshStandardMaterial
          color="#001a2e"
          emissive="#003344"
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.2}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh>
        <icosahedronGeometry args={[1.42, 1]} />
        <meshBasicMaterial color="#00F0FF" wireframe transparent opacity={0.5} />
      </mesh>

      {/* Interlocking plates */}
      <group ref={plates}>
        {platePositions.map((p, i) => (
          <mesh key={i} position={p.pos} rotation={p.rot}>
            <boxGeometry args={[0.55, 0.75, 0.06]} />
            <meshStandardMaterial
              color={p.color}
              emissive={p.color}
              emissiveIntensity={0.8}
              metalness={0.7}
              roughness={0.25}
              transparent
              opacity={0.7}
            />
          </mesh>
        ))}
      </group>

      {/* Core hexagon node */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.12, 6]} />
        <meshStandardMaterial
          color="#FF00AA"
          emissive="#FF00AA"
          emissiveIntensity={1.5}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Circuit ring lines */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.7, 0.015, 8, 48]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.8} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.0, 0.01, 8, 48]} />
        <meshBasicMaterial color="#0088FF" transparent opacity={0.5} />
      </mesh>

      {/* Energy rings */}
      <mesh ref={energyRing} rotation={[Math.PI / 2.2, 0.2, 0]}>
        <torusGeometry args={[2.1, 0.02, 8, 64]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.6} />
      </mesh>
      <mesh ref={energyRing2} rotation={[1.2, 0.5, 0.3]}>
        <torusGeometry args={[2.4, 0.015, 8, 64]} />
        <meshBasicMaterial color="#FF00AA" transparent opacity={0.35} />
      </mesh>

      {/* Point light from core */}
      <pointLight color="#00F0FF" intensity={2} distance={8} />
      <pointLight color="#FF00AA" intensity={0.8} distance={4} position={[0, 0, 0.5]} />
    </group>
  );
}

/* ── Incoming threats that vaporize ── */
function ThreatParticles({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const count = 18;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const data = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6 - 3
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        Math.random() * 0.04 + 0.02
      ),
      life: Math.random(),
      speed: 0.3 + Math.random() * 0.5,
    }));
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorCyan = useMemo(() => new THREE.Color("#00F0FF"), []);
  const colorThreat = useMemo(() => new THREE.Color("#FF2266"), []);
  const colorTemp = useMemo(() => new THREE.Color(), []);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    data.forEach((d, i) => {
      d.life += delta * d.speed * 0.4;
      // Move toward center
      const dir = new THREE.Vector3(0, 0, 0).sub(d.position).normalize();
      d.position.add(dir.multiplyScalar(delta * d.speed * 1.5));

      const dist = d.position.length();
      if (dist < 2.0 || d.life > 1) {
        // Respawn far out
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const r = 6 + Math.random() * 4;
        d.position.set(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi) - 1
        );
        d.life = 0;
      }

      dummy.position.copy(d.position);
      const s = dist < 2.3 ? 0.3 + (1 - dist / 2.3) * 1.5 : 0.15;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);

      // Color: threat red → cyan spark near shield
      const t = dist < 2.5 ? 1 - (dist - 1.8) / 0.7 : 0;
      colorTemp.copy(colorThreat).lerp(colorCyan, Math.max(0, Math.min(1, t)));
      mesh.current!.setColorAt(i, colorTemp);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.08, 6, 6]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}

/* ── Data towers in background ── */
function DataTowers() {
  const towers = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => {
      const angle = (i / 18) * Math.PI * 2;
      const r = 5 + Math.random() * 3;
      return {
        pos: [Math.cos(angle) * r, -2.5 + Math.random() * 0.5, Math.sin(angle) * r - 2] as [
          number,
          number,
          number,
        ],
        h: 1 + Math.random() * 3,
        w: 0.15 + Math.random() * 0.2,
      };
    });
  }, []);

  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <group ref={group}>
      {towers.map((t, i) => (
        <mesh key={i} position={[t.pos[0], t.pos[1] + t.h / 2, t.pos[2]]}>
          <boxGeometry args={[t.w, t.h, t.w]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? "#0088FF" : "#00F0FF"}
            transparent
            opacity={0.25}
            wireframe={i % 2 === 0}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Protective energy waves ── */
function EnergyWaves() {
  const rings = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!rings.current) return;
    rings.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const t = (state.clock.elapsedTime * 0.5 + i * 0.4) % 2;
      const s = 1.5 + t * 2;
      mesh.scale.setScalar(s);
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, 0.4 * (1 - t / 2));
    });
  });

  return (
    <group ref={rings} rotation={[Math.PI / 2, 0, 0]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i}>
          <ringGeometry args={[0.95, 1.0, 64]} />
          <meshBasicMaterial
            color="#00F0FF"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Mouse tracker inside canvas ── */
function MouseTracker({
  mouse,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const { pointer } = useThree();
  useFrame(() => {
    mouse.current.x += (pointer.x - mouse.current.x) * 0.08;
    mouse.current.y += (pointer.y - mouse.current.y) * 0.08;
  });
  return null;
}

function Scene() {
  const mouse = useRef({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.15} />
      <MouseTracker mouse={mouse} />

      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
        <ShieldCore mouse={mouse} />
      </Float>

      <EnergyWaves />
      {!isMobile && <ThreatParticles mouse={mouse} />}
      {!isMobile && <DataTowers />}

      <Sparkles
        count={isMobile ? 24 : 55}
        scale={10}
        size={1.4}
        speed={0.4}
        color="#00F0FF"
        opacity={0.45}
      />

      {/* Ground plane glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.8, 0]}>
        <circleGeometry args={[6, 64]} />
        <meshBasicMaterial
          color="#00F0FF"
          transparent
          opacity={0.04}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}

export default function HeroScene() {
  const isMobile = useIsMobile();

  return (
    <div className="absolute inset-0 canvas-container">
      <Canvas
        camera={{ position: [0, 0.5, 6], fov: 45 }}
        dpr={isMobile ? 1 : [1, 1.75]}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
