import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Volume2, VolumeX, RotateCw, Sparkles, Flame } from 'lucide-react';
import { toggleBBQSizzle, getSizzleState } from '../utils/audio';

export default function ThreeGrillHero() {
  const mountRef = useRef(null);
  const [isSizzleOn, setIsSizzleOn] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const sceneElementsRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 360;
    let height = container.clientHeight || 360;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08080c, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    // Adjust camera distance based on viewport width
    const isMobile = width < 640;
    camera.position.set(0, isMobile ? 3.6 : 3.2, isMobile ? 6.8 : 5.8);
    camera.lookAt(0, 0.3, 0);

    // 2. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0x22110c, 1.2);
    scene.add(ambientLight);

    // Dynamic fire flicker point light
    const fireLight = new THREE.PointLight(0xff4500, 4.5, 8, 1.5);
    fireLight.position.set(0, 0.6, 0);
    fireLight.castShadow = true;
    scene.add(fireLight);

    // Secondary ember light
    const amberLight = new THREE.PointLight(0xff9900, 2.5, 7, 2);
    amberLight.position.set(0.5, 0.2, 0.5);
    scene.add(amberLight);

    // Cool rim light
    const rimLight = new THREE.DirectionalLight(0x384050, 0.8);
    rimLight.position.set(-3, 6, -2);
    scene.add(rimLight);

    // Interactive cursor heat light
    const cursorLight = new THREE.PointLight(0xff6a00, 0, 4);
    scene.add(cursorLight);

    // 4. Charcoal Bed & Grill
    const grillGroup = new THREE.Group();
    scene.add(grillGroup);

    // Grill Basin / Bowl
    const basinGeo = new THREE.CylinderGeometry(2.3, 1.8, 0.6, 32);
    const basinMat = new THREE.MeshStandardMaterial({
      color: 0x151518,
      roughness: 0.85,
      metalness: 0.7,
    });
    const basin = new THREE.Mesh(basinGeo, basinMat);
    basin.position.y = -0.2;
    basin.receiveShadow = true;
    grillGroup.add(basin);

    // Burning Charcoal Chunks
    const coalsGroup = new THREE.Group();
    const coalGeo = new THREE.DodecahedronGeometry(0.18, 1);
    const coalMat = new THREE.MeshStandardMaterial({
      color: 0x1a0a05,
      emissive: 0xff2200,
      emissiveIntensity: 0.9,
      roughness: 0.9,
      metalness: 0.1,
    });

    const glowingCoalMat = new THREE.MeshStandardMaterial({
      color: 0x2b0d04,
      emissive: 0xff5500,
      emissiveIntensity: 1.8,
      roughness: 0.8,
    });

    for (let i = 0; i < 55; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 1.8;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = 0.05 + Math.random() * 0.15 - (radius * 0.08);

      const mat = (i % 2 === 0) ? coalMat : glowingCoalMat;
      const coalMesh = new THREE.Mesh(coalGeo, mat);
      coalMesh.position.set(x, y, z);
      coalMesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      const scale = 0.6 + Math.random() * 0.7;
      coalMesh.scale.set(scale, scale * 0.7, scale);
      coalsGroup.add(coalMesh);
    }
    grillGroup.add(coalsGroup);

    // Cast Iron Grill Grate
    const grateGroup = new THREE.Group();
    const ironMat = new THREE.MeshStandardMaterial({
      color: 0x222226,
      roughness: 0.4,
      metalness: 0.85,
    });

    const ringGeo = new THREE.TorusGeometry(2.1, 0.04, 12, 40);
    ringGeo.rotateX(Math.PI / 2);
    const ringMesh = new THREE.Mesh(ringGeo, ironMat);
    ringMesh.position.y = 0.38;
    grateGroup.add(ringMesh);

    const barCount = 15;
    for (let i = 0; i < barCount; i++) {
      const zPos = -1.9 + (i * (3.8 / (barCount - 1)));
      const chordLen = 2 * Math.sqrt(Math.max(0, 2.1 * 2.1 - zPos * zPos));
      if (chordLen > 0.3) {
        const barGeo = new THREE.CylinderGeometry(0.025, 0.025, chordLen, 8);
        barGeo.rotateZ(Math.PI / 2);
        const barMesh = new THREE.Mesh(barGeo, ironMat);
        barMesh.position.set(0, 0.38, zPos);
        grateGroup.add(barMesh);
      }
    }
    grillGroup.add(grateGroup);

    // 5. 3D BBQ Skewers
    const skewersGroup = new THREE.Group();
    skewersGroup.position.y = 0.48;
    grillGroup.add(skewersGroup);

    const skewerMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      metalness: 0.9,
      roughness: 0.2,
    });

    const chickenMat = new THREE.MeshStandardMaterial({
      color: 0xa83208,
      roughness: 0.7,
      metalness: 0.1,
    });

    const mintHerbMat = new THREE.MeshStandardMaterial({
      color: 0x2e7d32,
      roughness: 0.6,
    });

    const pepperMat = new THREE.MeshStandardMaterial({
      color: 0xd63031,
      roughness: 0.4,
    });

    const skewerOffsets = [-0.65, 0, 0.65];

    skewerOffsets.forEach((zOffset, skewerIdx) => {
      const singleSkewer = new THREE.Group();
      singleSkewer.position.z = zOffset;

      const rodGeo = new THREE.CylinderGeometry(0.02, 0.02, 3.2, 10);
      rodGeo.rotateZ(Math.PI / 2);
      const rodMesh = new THREE.Mesh(rodGeo, skewerMat);
      singleSkewer.add(rodMesh);

      const handleGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 10);
      handleGeo.rotateZ(Math.PI / 2);
      const handleMat = new THREE.MeshStandardMaterial({ color: 0x5c2c16, roughness: 0.9 });
      const handleMesh = new THREE.Mesh(handleGeo, handleMat);
      handleMesh.position.x = -1.45;
      singleSkewer.add(handleMesh);

      const chunkCount = 4;
      for (let c = 0; c < chunkCount; c++) {
        const chunkGeo = new THREE.BoxGeometry(0.32, 0.28, 0.32, 2, 2, 2);
        const pos = chunkGeo.attributes.position;
        for (let v = 0; v < pos.count; v++) {
          pos.setXYZ(
            v,
            pos.getX(v) * (0.85 + Math.random() * 0.3),
            pos.getY(v) * (0.85 + Math.random() * 0.3),
            pos.getZ(v) * (0.85 + Math.random() * 0.3)
          );
        }
        chunkGeo.computeVertexNormals();

        const chunkMesh = new THREE.Mesh(chunkGeo, chickenMat);
        const xPos = -0.7 + (c * 0.48);
        chunkMesh.position.set(xPos, 0, 0);
        chunkMesh.rotation.set(Math.random() * 0.5, Math.random() * 0.5, Math.random() * 0.5);
        chunkMesh.castShadow = true;
        singleSkewer.add(chunkMesh);

        // Mint chili flakes on top
        const flakeGeo = new THREE.SphereGeometry(0.04, 6, 6);
        for (let f = 0; f < 3; f++) {
          const flake = new THREE.Mesh(flakeGeo, mintHerbMat);
          flake.position.set(xPos + (Math.random() - 0.5) * 0.2, 0.16, (Math.random() - 0.5) * 0.2);
          singleSkewer.add(flake);
        }

        if (c < chunkCount - 1) {
          const spacerGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.05, 10);
          spacerGeo.rotateZ(Math.PI / 2);
          const spacerMesh = new THREE.Mesh(spacerGeo, pepperMat);
          spacerMesh.position.set(xPos + 0.24, 0, 0);
          singleSkewer.add(spacerMesh);
        }
      }

      singleSkewer.rotation.y = (skewerIdx - 1) * 0.05;
      skewersGroup.add(singleSkewer);
    });

    // 6. Dynamic Rising Embers / Sparks Particle System
    const emberCount = 140;
    const emberGeo = new THREE.BufferGeometry();
    const emberPositions = new Float32Array(emberCount * 3);
    const emberVelocities = [];

    for (let i = 0; i < emberCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const rad = Math.random() * 1.5;
      emberPositions[i * 3] = Math.cos(angle) * rad;
      emberPositions[i * 3 + 1] = 0.2 + Math.random() * 2.5;
      emberPositions[i * 3 + 2] = Math.sin(angle) * rad;

      emberVelocities.push({
        x: (Math.random() - 0.5) * 0.015,
        y: 0.018 + Math.random() * 0.03,
        z: (Math.random() - 0.5) * 0.015,
        wobble: Math.random() * Math.PI * 2,
      });
    }

    emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));

    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 230, 150, 1)');
    grad.addColorStop(0.3, 'rgba(255, 100, 20, 0.8)');
    grad.addColorStop(0.7, 'rgba(255, 30, 0, 0.3)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const emberTexture = new THREE.CanvasTexture(canvas);
    const emberMat = new THREE.PointsMaterial({
      size: 0.15,
      map: emberTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xffaa44,
    });

    const embers = new THREE.Points(emberGeo, emberMat);
    scene.add(embers);

    // 7. Volumetric Smoke Particles
    const smokeCount = 35;
    const smokeGroup = new THREE.Group();
    const smokeCanvas = document.createElement('canvas');
    smokeCanvas.width = 128;
    smokeCanvas.height = 128;
    const sCtx = smokeCanvas.getContext('2d');
    const sGrad = sCtx.createRadialGradient(64, 64, 5, 64, 64, 60);
    sGrad.addColorStop(0, 'rgba(180, 180, 190, 0.25)');
    sGrad.addColorStop(0.5, 'rgba(120, 110, 110, 0.12)');
    sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 128, 128);

    const smokeTexture = new THREE.CanvasTexture(smokeCanvas);
    const smokeMaterial = new THREE.MeshBasicMaterial({
      map: smokeTexture,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
    const smokeGeo = new THREE.PlaneGeometry(0.8, 0.8);

    const smokePuffs = [];
    for (let i = 0; i < smokeCount; i++) {
      const puff = new THREE.Mesh(smokeGeo, smokeMaterial);
      puff.position.set(
        (Math.random() - 0.5) * 1.6,
        0.5 + Math.random() * 3.0,
        (Math.random() - 0.5) * 1.6
      );
      puff.rotation.z = Math.random() * Math.PI * 2;
      const sc = 0.6 + Math.random() * 1.5;
      puff.scale.set(sc, sc, sc);
      smokeGroup.add(puff);

      smokePuffs.push({
        mesh: puff,
        baseScale: sc,
        vY: 0.008 + Math.random() * 0.014,
        rotSpeed: (Math.random() - 0.5) * 0.01,
        driftX: (Math.random() - 0.5) * 0.006,
      });
    }
    scene.add(smokeGroup);

    sceneElementsRef.current = {
      scene,
      camera,
      renderer,
      grillGroup,
      fireLight,
      amberLight,
      cursorLight,
      embers,
      emberPositions,
      emberVelocities,
      smokePuffs,
    };

    // 8. Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      const flicker = Math.sin(elapsedTime * 9) * 0.4 + Math.cos(elapsedTime * 14) * 0.3;
      fireLight.intensity = 4.2 + flicker;
      amberLight.intensity = 2.4 + Math.sin(elapsedTime * 6) * 0.5;

      glowingCoalMat.emissiveIntensity = 1.4 + Math.sin(elapsedTime * 3.5) * 0.6;

      if (autoRotate && !isDraggingRef.current) {
        grillGroup.rotation.y += 0.004;
      }

      // Embers
      const positions = emberGeo.attributes.position.array;
      for (let i = 0; i < emberCount; i++) {
        const vel = emberVelocities[i];
        vel.wobble += 0.03;

        positions[i * 3] += vel.x + Math.sin(vel.wobble) * 0.004;
        positions[i * 3 + 1] += vel.y;
        positions[i * 3 + 2] += vel.z + Math.cos(vel.wobble) * 0.004;

        if (positions[i * 3 + 1] > 3.8) {
          const angle = Math.random() * Math.PI * 2;
          const rad = Math.random() * 1.5;
          positions[i * 3] = Math.cos(angle) * rad;
          positions[i * 3 + 1] = 0.2;
          positions[i * 3 + 2] = Math.sin(angle) * rad;
        }
      }
      emberGeo.attributes.position.needsUpdate = true;

      // Smoke
      smokePuffs.forEach((puff) => {
        puff.mesh.position.y += puff.vY;
        puff.mesh.position.x += puff.driftX + Math.sin(elapsedTime + puff.mesh.position.y) * 0.002;
        puff.mesh.rotation.z += puff.rotSpeed;
        
        const progress = Math.min(1, Math.max(0, (puff.mesh.position.y - 0.5) / 3.0));
        const currentScale = puff.baseScale * (1 + progress * 2.2);
        puff.mesh.scale.set(currentScale, currentScale, currentScale);

        if (puff.mesh.position.y > 3.6) {
          puff.mesh.position.y = 0.5;
          puff.mesh.position.x = (Math.random() - 0.5) * 1.4;
          puff.mesh.position.z = (Math.random() - 0.5) * 1.4;
        }
      });

      smokeGroup.children.forEach(puff => {
        puff.quaternion.copy(camera.quaternion);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Mouse & Touch events
    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / width) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / height) * 2 + 1;

      cursorLight.position.set(mouseX * 3, 1.2 + mouseY * 1.5, 2.5);
      cursorLight.intensity = 1.8;

      if (isDraggingRef.current) {
        const deltaX = e.clientX - previousMousePositionRef.current.x;
        const deltaY = e.clientY - previousMousePositionRef.current.y;

        grillGroup.rotation.y += deltaX * 0.008;
        grillGroup.rotation.x = Math.max(-0.2, Math.min(0.6, grillGroup.rotation.x + deltaY * 0.005));

        previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e) => {
      if (isDraggingRef.current && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
        const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

        grillGroup.rotation.y += deltaX * 0.008;
        grillGroup.rotation.x = Math.max(-0.2, Math.min(0.6, grillGroup.rotation.x + deltaY * 0.005));

        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      const isMob = width < 640;
      camera.position.set(0, isMob ? 3.6 : 3.2, isMob ? 6.8 : 5.8);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [autoRotate]);

  const handleToggleSound = () => {
    const newState = toggleBBQSizzle();
    setIsSizzleOn(newState);
  };

  return (
    <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[620px] rounded-3xl overflow-hidden glass-panel border border-orange-500/20 shadow-[0_0_40px_rgba(255,80,0,0.18)] select-none">
      {/* Three.js Canvas Container */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Touch & Drag to rotate 3D Coal Grill"
      />

      {/* 3D Interactive Floating Badge */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-orange-500/30 text-[10px] sm:text-xs font-semibold text-orange-400">
        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-orange-500 animate-ping" />
        <span>3D LIVE COAL GRILL</span>
      </div>

      {/* Interactive Controls Overlay */}
      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Sound Sizzle Button */}
          <button
            onClick={handleToggleSound}
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold transition-all duration-300 backdrop-blur-md ${
              isSizzleOn
                ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-[0_0_20px_rgba(255,80,0,0.6)] animate-flame-pulse'
                : 'bg-black/70 text-zinc-300 hover:text-white border border-white/10 hover:border-orange-500/40'
            }`}
          >
            {isSizzleOn ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300 animate-bounce" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            <span>{isSizzleOn ? 'Sizzle: ON' : 'Sizzle Sound'}</span>
          </button>

          {/* Auto-Rotate Toggle */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-[10px] sm:text-xs font-semibold backdrop-blur-md transition-all ${
              autoRotate ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' : 'bg-black/70 text-zinc-400 border border-white/10'
            }`}
            title="Toggle 360° Rotation"
          >
            <RotateCw className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            <span>360°</span>
          </button>
        </div>

        <div className="text-[10px] sm:text-[11px] text-zinc-400 bg-black/70 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl border border-white/10 pointer-events-auto">
          👆 <span className="text-orange-400 font-medium">Drag to rotate</span>
        </div>
      </div>

      {/* Fiery radial vignette effect */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,#08080c_95%)]" />
    </div>
  );
}
