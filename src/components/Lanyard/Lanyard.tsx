/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

// Procedural high-contrast woven strap texture creator
function createBandTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Fill strap background with dark slate tone
    ctx.fillStyle = '#111115';
    ctx.fillRect(0, 0, 1024, 128);

    // Highlight top and bottom emerald ribbon borders
    ctx.fillStyle = '#10b981';
    ctx.fillRect(0, 0, 1024, 7);
    ctx.fillRect(0, 121, 1024, 7);

    // Subtle micro diagonal woven stitching grid lines
    ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
    for (let i = 0; i < 1024; i += 16) {
      ctx.beginPath();
      ctx.moveTo(i, 7);
      ctx.lineTo(i + 40, 121);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.12)';
      ctx.stroke();
    }

    // Tech text inside strap centered
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 34px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('AI SYSTEMS ENGINEER  //  A. R. QASIM  //  ACCESS GRANTED', 512, 64);
  }
  
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

export interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  imageUrl?: string;
}

export default function Lanyard({ 
  position = [0, 0, 20], 
  gravity = [0, -40, 0], 
  fov = 22, 
  transparent = true,
  imageUrl = "https://i.ibb.co/VYhK10hL/Pfp-Cropped-Fence-Bg-removed-500kb.png"
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper bg-bg-secondary/40 border border-border-color rounded-lg overflow-hidden h-full min-h-[420px] relative w-full flex items-center justify-center">
      {/* Absolute watermark indicator guiding the user that they can swing or drag */}
      <div className="absolute top-4 left-4 pointer-events-none select-none font-mono text-[9px] text-[#10b981] flex items-center gap-1.5 font-bold uppercase tracking-wider bg-[#10b981]/10 px-2.5 py-1 rounded border border-[#10b981]/25 z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Drag & Interact with 3D Security ID</span>
      </div>

      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent, antialias: true }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
        style={{ width: '100%', height: '100%', outline: 'none' }}
      >
        <ambientLight intensity={Math.PI * 1.25} />
        <directionalLight position={[5, 12, 10]} intensity={2.5} castShadow />
        <pointLight position={[-10, 10, -10]} intensity={1.5} />
        
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 40 : 1 / 60}>
          <Band isMobile={isMobile} imageUrl={imageUrl} />
        </Physics>
        
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={8}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

const MeshLineGeom = 'meshLineGeometry' as any;
const MeshLineMat = 'meshLineMaterial' as any;

function Band({ maxSpeed = 45, minSpeed = 0, isMobile = false, imageUrl = "https://i.ibb.co/VYhK10hL/Pfp-Cropped-Fence-Bg-removed-500kb.png" }) {
  const band = useRef<THREE.Mesh>(null),
    fixed = useRef<any>(null),
    j1 = useRef<any>(null),
    j2 = useRef<any>(null),
    j3 = useRef<any>(null),
    card = useRef<any>(null);

  const vec = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);

  const segmentProps = { type: 'dynamic' as any, canSleep: true, colliders: false as any, angularDamping: 4, linearDamping: 4 };

  const [cardTexture, setCardTexture] = useState<THREE.CanvasTexture | null>(null);
  const bandTexture = useMemo(() => createBandTexture(), []);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const redraw = (img?: HTMLImageElement) => {
      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, 0, 720);
      grad.addColorStop(0, '#0a0a0d');
      grad.addColorStop(0.5, '#111116');
      grad.addColorStop(1, '#050507');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 720);

      // Fine tech lines
      ctx.fillStyle = 'rgba(255, 255, 255, 0.012)';
      for (let i = 0; i < 720; i += 3) {
        ctx.fillRect(0, i, 512, 1);
      }

      // Neon-green/emerald glowing high-precision tech border
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 14;
      ctx.strokeRect(7, 7, 498, 706);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 3;
      ctx.strokeRect(20, 20, 472, 680);

      // Cyber Grid
      ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
      for (let y = 40; y < 720; y += 16) {
        ctx.fillRect(40, y, 432, 1.5);
      }

      // Hologram secure badge in top right
      ctx.beginPath();
      ctx.arc(430, 80, 26, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(430, 80, 14, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.85)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(430, 80, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      // Top security headers
      ctx.fillStyle = '#e4e4e7';
      ctx.font = 'bold 18px monospace';
      ctx.fillText('ACCESS PASS // SECURE ID', 40, 70);

      ctx.fillStyle = '#10b981';
      ctx.font = '13px monospace';
      ctx.fillText('CREDENTIAL AUTHENTICATED // AI SYSTEMS', 40, 105);

      // Horizontal line
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.fillRect(40, 135, 432, 2);

      // Profile photo box
      ctx.fillStyle = '#050507';
      ctx.fillRect(156, 175, 200, 220);
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
      ctx.lineWidth = 4;
      ctx.strokeRect(156, 175, 200, 220);

      // Cybertech backdrop inside photo box
      const photoGrad = ctx.createRadialGradient(256, 285, 20, 256, 285, 110);
      photoGrad.addColorStop(0, '#111827'); 
      photoGrad.addColorStop(1, '#030712'); 
      ctx.fillStyle = photoGrad;
      ctx.fillRect(158, 177, 196, 216);

      if (img) {
        // Draw loaded image of the user beautifully trimmed
        ctx.drawImage(img, 158, 177, 196, 216);
      } else {
        // Fallback elegant head silhouette
        ctx.fillStyle = '#1f2937';
        ctx.beginPath();
        ctx.arc(256, 255, 38, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(256, 350, 68, 55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(256, 255, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Metadata text fields
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 30px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('AHMAD RAYAN QASIM', 256, 445);

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 21px monospace';
      ctx.fillText('AI SYSTEMS ENGINEER', 256, 485);

      ctx.fillStyle = '#9ca3af';
      ctx.font = '16px monospace';
      ctx.fillText('CLASS OF 2028 // PORTAL CODES', 256, 520);

      // Futuristic barcode
      ctx.fillStyle = '#e5e7eb';
      const cellWidth = 9;
      for (let xNum = 0; xNum < 28; xNum++) {
        const hHeight = Math.floor(Math.sin(xNum * 0.5) * 12) + 38;
        ctx.fillRect(132 + xNum * cellWidth, 570, cellWidth - 3, hHeight);
      }

      // Verification footer code
      ctx.fillStyle = '#6b7280';
      ctx.font = 'bold 14px monospace';
      ctx.fillText('NODE_VERIFIED_SEC_INTEGRITY_v2.5', 256, 672);

      if (tex) {
        tex.needsUpdate = true;
      }
    };

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 16;
    setCardTexture(tex);
    redraw();

    if (imageUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imageUrl;
      img.onload = () => {
        redraw(img);
      };
      img.onerror = (e) => {
        console.warn('Failed to load profile photo, falling back to layout shape silhouette', e);
      };
    }

    return () => {
      tex.dispose();
    };
  }, [imageUrl]);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3()
    ]);
  }, []);

  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ 
        x: vec.x - dragged.x, 
        y: vec.y - dragged.y, 
        z: vec.z - dragged.z 
      });
    }
    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      
      const geom = band.current.geometry as any;
      if (geom.setPoints) {
        geom.setPoints(curve.getPoints(isMobile ? 16 : 32));
      }
      ang.copy(card.current.angvel() || { x: 0, y: 0, z: 0 });
      rot.copy(card.current.rotation() || { x: 0, y: 0, z: 0, w: 1 });
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => {
              (e.target as any).releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={e => {
              (e.target as any).setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            {/* The main Badge Card Mesh using a box primitive */}
            <mesh>
              <boxGeometry args={[0.8, 1.125, 0.015]} />
              <meshPhysicalMaterial
                map={cardTexture || undefined}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.2}
                metalness={0.15}
              />
            </mesh>

            {/* Simulated clamp coupling at the top */}
            <mesh position={[0, 0.585, 0.005]}>
              <boxGeometry args={[0.14, 0.08, 0.04]} />
              <meshStandardMaterial metalness={0.9} roughness={0.1} color="#e5e7eb" />
            </mesh>

            {/* Simulated metal ring hook hook coupling onto the band */}
            <mesh position={[0, 0.65, 0.005]}>
              <torusGeometry args={[0.06, 0.014, 8, 24]} />
              <meshStandardMaterial metalness={0.9} roughness={0.1} color="#e5e7eb" />
            </mesh>
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <MeshLineGeom />
        <MeshLineMat
          color="#ffffff"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={bandTexture}
          repeat={[-3.5, 1]}
          lineWidth={1.1}
        />
      </mesh>
    </>
  );
}
