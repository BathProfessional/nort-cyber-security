"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/useMousePosition";

/* ── Infinite Tron perspective grid floor ── */
function TronGridFloor() {
  const group = useRef<THREE.Group>(null);
  const gridMat = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#00F0FF") },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        varying vec2 vUv;
        void main() {
          vec2 uv = vUv * 2.0 - 1.0;
          // Moving grid toward camera
          float y = (vUv.y + uTime * 0.08);
          float gx = abs(fract(uv.x * 18.0) - 0.5);
          float gy = abs(fract(y * 22.0) - 0.5);
          float line = smoothstep(0.04, 0.0, min(gx, gy));
          // Fade with distance (top of plane = far)
          float fade = pow(1.0 - vUv.y, 1.4) * 0.85;
          // Horizon bloom
          float horizon = exp(-pow((vUv.y - 0.92) * 18.0, 2.0)) * 0.9;
          float alpha = (line * fade + horizon * 0.5) * 0.95;
          vec3 col = mix(uColor, vec3(0.0, 0.35, 0.08), vUv.y);
          gl_FragColor = vec4(col, alpha);
        }
      `,
    });
    return mat;
  }, []);

  useFrame((state) => {
    gridMat.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <group ref={group} position={[0, -2.6, 1]}>
      <mesh rotation={[-Math.PI / 2.15, 0, 0]} position={[0, 0, -4]}>
        <planeGeometry args={[40, 28, 1, 1]} />
        <primitive object={gridMat} attach="material" />
      </mesh>
      {/* Horizon light bar */}
      <mesh position={[0, 0.02, -12]} rotation={[0, 0, 0]}>
        <planeGeometry args={[30, 0.08]} />
        <meshBasicMaterial
          color="#00F0FF"
          transparent
          opacity={0.55}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ── Matrix digital rain (3D falling glyphs as particles) ── */
function MatrixRain({ count = 400 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  const data = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      x: (Math.random() - 0.5) * 22,
      y: Math.random() * 16 - 4,
      z: (Math.random() - 0.5) * 14 - 2,
      speed: 1.2 + Math.random() * 3.5,
      size: 0.04 + Math.random() * 0.12,
      hue: Math.random() > 0.15 ? 0 : 1, // mostly cyan, some magenta
      phase: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    data.forEach((d, i) => {
      d.y -= d.speed * delta;
      if (d.y < -5) {
        d.y = 10 + Math.random() * 4;
        d.x = (Math.random() - 0.5) * 22;
        d.z = (Math.random() - 0.5) * 14 - 2;
      }
      dummy.position.set(d.x, d.y, d.z);
      const pulse = 0.7 + Math.sin(d.phase + d.y * 2) * 0.3;
      dummy.scale.set(d.size * 0.4, d.size * (2 + pulse * 2), d.size * 0.4);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
      // Tron cyan (+ occasional bright head)
      if (d.hue === 0) {
        color.setRGB(0, 1 * pulse, 0.25 * pulse);
      } else {
        color.setRGB(0.7 * pulse, 1 * pulse, 0.7 * pulse);
      }
      mesh.current!.setColorAt(i, color);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial transparent opacity={0.75} toneMapped={false} />
    </instancedMesh>
  );
}

/* ── Hexagonal Tron shield / identity disc ── */
function ShieldCore({
  mouse,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const ringC = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.2 + mouse.current.x * 0.35;
      group.current.rotation.x = 0.15 + mouse.current.y * 0.18;
    }
    if (inner.current) inner.current.rotation.y = -t * 0.35;
    if (ringA.current) {
      ringA.current.rotation.z = t * 0.6;
      ringA.current.rotation.x = Math.sin(t * 0.4) * 0.3;
    }
    if (ringB.current) {
      ringB.current.rotation.z = -t * 0.4;
      ringB.current.rotation.y = t * 0.2;
    }
    if (ringC.current) {
      ringC.current.rotation.z = t * 0.25;
      ringC.current.scale.setScalar(1 + Math.sin(t * 2.2) * 0.05);
    }
    if (core.current) {
      const s = 1 + Math.sin(t * 3) * 0.08;
      core.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group} position={[0, 0.3, 0]}>
      {/* Outer wireframe dodeca / icosa */}
      <mesh>
        <icosahedronGeometry args={[2.0, 1]} />
        <meshBasicMaterial color="#00F0FF" wireframe transparent opacity={0.22} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.55, 1]} />
        <meshStandardMaterial
          color="#001408"
          emissive="#00F0FF"
          emissiveIntensity={0.2}
          metalness={0.95}
          roughness={0.15}
          transparent
          opacity={0.92}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.58, 1]} />
        <meshBasicMaterial color="#00F0FF" wireframe transparent opacity={0.7} />
      </mesh>

      {/* Circuit plates */}
      <group ref={inner}>
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          const col = i % 3 === 0 ? "#4DB8FF" : i % 2 === 0 ? "#0088FF" : "#00F0FF";
          return (
            <mesh
              key={i}
              position={[Math.cos(a) * 1.15, Math.sin(a) * 1.15, 0.2]}
              rotation={[0, 0, a]}
            >
              <boxGeometry args={[0.45, 0.7, 0.05]} />
              <meshStandardMaterial
                color={col}
                emissive={col}
                emissiveIntensity={1.3}
                metalness={0.6}
                roughness={0.2}
                transparent
                opacity={0.85}
              />
            </mesh>
          );
        })}
      </group>

      {/* Identity disc core */}
      <mesh ref={core} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.55, 0.08, 12, 48]} />
        <meshBasicMaterial color="#00F0FF" toneMapped={false} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.1, 6]} />
        <meshStandardMaterial
          color="#B8FFB8"
          emissive="#00F0FF"
          emissiveIntensity={2.2}
          toneMapped={false}
        />
      </mesh>

      {/* Orbiting energy rings */}
      <mesh ref={ringA}>
        <torusGeometry args={[2.15, 0.018, 8, 80]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.85} toneMapped={false} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 3, 0.4, 0]}>
        <torusGeometry args={[2.35, 0.012, 8, 80]} />
        <meshBasicMaterial color="#4DB8FF" transparent opacity={0.45} toneMapped={false} />
      </mesh>
      <mesh ref={ringC} rotation={[1.1, 0.6, 0.2]}>
        <torusGeometry args={[2.55, 0.01, 8, 80]} />
        <meshBasicMaterial color="#0055AA" transparent opacity={0.5} toneMapped={false} />
      </mesh>

      {/* Scan ring on disc face */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 0.95, 64]} />
        <meshBasicMaterial
          color="#00F0FF"
          transparent
          opacity={0.55}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <pointLight color="#00F0FF" intensity={4.5} distance={12} />
      <pointLight color="#4DB8FF" intensity={1.2} distance={6} position={[0.5, 0.3, 0.5]} />
      <pointLight color="#0055AA" intensity={1} distance={8} position={[-1, -0.5, 1]} />
    </group>
  );
}

/* ── Light-cycle style energy ribbons ── */
function LightRibbons() {
  const lines = useRef<THREE.Group>(null);
  const curves = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => {
      const side = i % 2 === 0 ? 1 : -1;
      const y = -1.5 + i * 0.5;
      const points = [];
      for (let t = 0; t <= 20; t++) {
        const x = side * (3 + t * 0.35);
        const yy = y + Math.sin(t * 0.4 + i) * 0.4;
        const z = -2 - t * 0.15;
        points.push(new THREE.Vector3(x, yy, z));
      }
      return new THREE.CatmullRomCurve3(points);
    });
  }, []);

  useFrame((state) => {
    if (!lines.current) return;
    lines.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      mesh.position.z = ((state.clock.elapsedTime * (0.8 + i * 0.15)) % 6) - 1;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.25 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.15;
    });
  });

  return (
    <group ref={lines}>
      {curves.map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 40, 0.015 + (i % 2) * 0.01, 6, false]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? "#4DB8FF" : "#00F0FF"}
            transparent
            opacity={0.4}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Threats streaking in and vaporizing ── */
function ThreatParticles() {
  const count = 28;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorTemp = useMemo(() => new THREE.Color(), []);
  const cyan = useMemo(() => new THREE.Color("#00F0FF"), []);
  const threat = useMemo(() => new THREE.Color("#FF3344"), []);

  const data = useMemo(
    () =>
      Array.from({ length: count }).map(() => {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const r = 7 + Math.random() * 5;
        return {
          position: new THREE.Vector3(
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.sin(phi) * Math.sin(theta),
            r * Math.cos(phi) - 1
          ),
          speed: 1.2 + Math.random() * 2,
          life: Math.random(),
        };
      }),
    []
  );

  useFrame((_, delta) => {
    if (!mesh.current) return;
    data.forEach((d, i) => {
      const dir = d.position.clone().normalize().multiplyScalar(-1);
      d.position.add(dir.multiplyScalar(delta * d.speed));
      const dist = d.position.length();
      if (dist < 2.1) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const r = 8 + Math.random() * 4;
        d.position.set(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.6,
          r * Math.cos(phi) - 1
        );
        d.speed = 1.2 + Math.random() * 2;
      }
      dummy.position.copy(d.position);
      // Streak: elongated toward center
      const s = dist < 3 ? 0.4 + (3 - dist) * 0.3 : 0.12;
      dummy.scale.set(s * 0.5, s * 0.5, s * (dist < 4 ? 3 : 1.5));
      dummy.lookAt(0, 0, 0);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
      const t = THREE.MathUtils.clamp(1 - (dist - 2) / 2, 0, 1);
      colorTemp.copy(threat).lerp(cyan, t);
      mesh.current!.setColorAt(i, colorTemp);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial toneMapped={false} transparent opacity={0.9} />
    </instancedMesh>
  );
}

/* ── City / data towers on the grid ── */
function DataTowers() {
  const group = useRef<THREE.Group>(null);
  const towers = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => {
      const angle = (i / 24) * Math.PI * 2 + Math.random() * 0.2;
      const r = 6 + Math.random() * 5;
      return {
        pos: [
          Math.cos(angle) * r,
          -2.5,
          Math.sin(angle) * r - 3,
        ] as [number, number, number],
        h: 0.8 + Math.random() * 4,
        w: 0.12 + Math.random() * 0.25,
        wire: i % 2 === 0,
      };
    });
  }, []);

  useFrame((state) => {
    if (group.current) group.current.rotation.y = state.clock.elapsedTime * 0.025;
  });

  return (
    <group ref={group}>
      {towers.map((t, i) => (
        <group key={i} position={t.pos}>
          <mesh position={[0, t.h / 2, 0]}>
            <boxGeometry args={[t.w, t.h, t.w]} />
            <meshBasicMaterial
              color={i % 4 === 0 ? "#4DB8FF" : i % 2 === 0 ? "#0055AA" : "#00F0FF"}
              transparent
              opacity={0.35}
              wireframe={t.wire}
              toneMapped={false}
            />
          </mesh>
          {/* Beacon top */}
          <mesh position={[0, t.h + 0.05, 0]}>
            <boxGeometry args={[t.w * 0.6, 0.06, t.w * 0.6]} />
            <meshBasicMaterial color="#00F0FF" toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ── Expanding shield pulses ── */
function EnergyWaves() {
  const rings = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!rings.current) return;
    rings.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const t = (state.clock.elapsedTime * 0.7 + i * 0.5) % 2.2;
      mesh.scale.setScalar(1.4 + t * 2.2);
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, 0.55 * (1 - t / 2.2));
    });
  });

  return (
    <group ref={rings} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.3, 0]}>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i}>
          <ringGeometry args={[0.98, 1.05, 80]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#00F0FF" : "#0055AA"}
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Hex wall behind shield ── */
function HexBackdrop() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = state.clock.elapsedTime * 0.03;
  });
  return (
    <group ref={ref} position={[0, 0.5, -6]}>
      <mesh>
        <circleGeometry args={[8, 6]} />
        <meshBasicMaterial color="#00F0FF" wireframe transparent opacity={0.1} />
      </mesh>
      <mesh>
        <circleGeometry args={[5.5, 6]} />
        <meshBasicMaterial color="#0055AA" wireframe transparent opacity={0.14} />
      </mesh>
      <mesh>
        <circleGeometry args={[3, 6]} />
        <meshBasicMaterial color="#4DB8FF" wireframe transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

function MouseTracker({
  mouse,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const { pointer } = useThree();
  useFrame(() => {
    mouse.current.x += (pointer.x - mouse.current.x) * 0.1;
    mouse.current.y += (pointer.y - mouse.current.y) * 0.1;
  });
  return null;
}

function Scene() {
  const mouse = useRef({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 8, 28]} />
      <ambientLight intensity={0.12} />
      <MouseTracker mouse={mouse} />

      <TronGridFloor />
      <HexBackdrop />
      <MatrixRain count={isMobile ? 180 : 520} />

      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.35}>
        <ShieldCore mouse={mouse} />
      </Float>

      <EnergyWaves />
      {!isMobile && <ThreatParticles />}
      {!isMobile && <DataTowers />}
      {!isMobile && <LightRibbons />}

      <Sparkles
        count={isMobile ? 30 : 80}
        scale={[14, 10, 10]}
        size={1.8}
        speed={0.5}
        color="#00F0FF"
        opacity={0.55}
      />

      {/* Ground glow disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.55, 0]}>
        <circleGeometry args={[5, 64]} />
        <meshBasicMaterial
          color="#00F0FF"
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
          depthWrite={false}
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
        camera={{ position: [0, 1.2, 7.5], fov: 48, near: 0.1, far: 60 }}
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
