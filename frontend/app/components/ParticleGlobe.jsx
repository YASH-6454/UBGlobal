'use client';

import { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';

export default function ParticleGlobe() {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });

  const createGlobe = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = container.clientWidth;
    const h = container.clientHeight;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 0.3, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // --- Globe group for unified rotation ---
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // --- Sphere Particles (Fibonacci Sphere) ---
    const PARTICLE_COUNT = 4500;
    const GLOBE_RADIUS = 2.2;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const originalPositions = new Float32Array(PARTICLE_COUNT * 3);

    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const baseColor = new THREE.Color(0xff6600);
    const dimColor = new THREE.Color(0xcc4400);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const y = 1 - (i / (PARTICLE_COUNT - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;

      const px = radiusAtY * Math.cos(theta) * GLOBE_RADIUS;
      const py = y * GLOBE_RADIUS;
      const pz = radiusAtY * Math.sin(theta) * GLOBE_RADIUS;

      positions[i * 3] = px;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = pz;
      originalPositions[i * 3] = px;
      originalPositions[i * 3 + 1] = py;
      originalPositions[i * 3 + 2] = pz;

      // Vary color slightly per particle
      const blend = Math.random() * 0.4;
      const c = baseColor.clone().lerp(dimColor, blend);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = 0.018 + Math.random() * 0.017;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Custom shader for size attenuation + per-vertex color
    const particleMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        uniform float uPixelRatio;
        void main() {
          vColor = color;
          vec3 pos = position;
          float wave = sin(uTime * 0.5 + pos.x * 2.0 + pos.y * 1.5) * 0.03;
          pos += normalize(pos) * wave;
          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * uPixelRatio * (300.0 / -mvPos.z);
          gl_Position = projectionMatrix * mvPos;
          vAlpha = 0.7 + 0.3 * (1.0 - abs(pos.y) / 2.5);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float dist = length(gl_PointCoord - 0.5) * 2.0;
          if (dist > 1.0) discard;
          float alpha = smoothstep(1.0, 0.3, dist) * vAlpha;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    globeGroup.add(particles);

    // --- Subtle Edge Glow (thin rim halo only) ---
    const createEdgeGlow = (radius, opacity, color) => {
      const geo = new THREE.SphereGeometry(radius, 48, 48);
      const mat = new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color(color) },
          uOpacity: { value: opacity },
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vViewDir;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
            vViewDir = normalize(-mvPos.xyz);
            gl_Position = projectionMatrix * mvPos;
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          uniform float uOpacity;
          varying vec3 vNormal;
          varying vec3 vViewDir;
          void main() {
            float rim = 1.0 - abs(dot(vNormal, vViewDir));
            float glow = pow(rim, 8.0);
            gl_FragColor = vec4(uColor, glow * uOpacity);
          }
        `,
        transparent: true,
        depthWrite: false,
        side: THREE.FrontSide,
        blending: THREE.NormalBlending,
      });
      return new THREE.Mesh(geo, mat);
    };

    globeGroup.add(createEdgeGlow(2.25, 0.5, 0xff6600));
    globeGroup.add(createEdgeGlow(2.4, 0.15, 0xff8833));

    // Inner warm core
    const coreGeo = new THREE.SphereGeometry(2.0, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x1a0800, transparent: true, opacity: 0.25 });
    globeGroup.add(new THREE.Mesh(coreGeo, coreMat));

    // --- Latitude / Longitude wireframe rings ---
    const ringMat = new THREE.LineBasicMaterial({ color: 0xff6600, transparent: true, opacity: 0.04 });
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI;
      const ringGeo = new THREE.BufferGeometry();
      const ringPts = [];
      for (let j = 0; j <= 64; j++) {
        const t = (j / 64) * Math.PI * 2;
        ringPts.push(new THREE.Vector3(
          GLOBE_RADIUS * Math.cos(t) * Math.sin(angle),
          GLOBE_RADIUS * Math.cos(angle),
          GLOBE_RADIUS * Math.sin(t) * Math.sin(angle)
        ));
      }
      ringGeo.setFromPoints(ringPts);
      globeGroup.add(new THREE.Line(ringGeo, ringMat));
    }
    // Equatorial rings
    for (let i = 0; i < 3; i++) {
      const lat = ((i + 1) / 4) * Math.PI - Math.PI / 2;
      const r = GLOBE_RADIUS * Math.cos(lat);
      const y = GLOBE_RADIUS * Math.sin(lat);
      const pts = [];
      for (let j = 0; j <= 64; j++) {
        const t = (j / 64) * Math.PI * 2;
        pts.push(new THREE.Vector3(r * Math.cos(t), y, r * Math.sin(t)));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      globeGroup.add(new THREE.Line(geo, ringMat));
    }

    // --- Trade Route Arcs with Traveling Light ---
    const routeData = [
      { start: [19.07, 72.87], end: [51.91, 4.47], color: 0xff6600 },   // Mumbai → Rotterdam
      { start: [19.07, 72.87], end: [1.35, 103.82], color: 0xffa040 },  // Mumbai → Singapore
      { start: [19.07, 72.87], end: [31.23, 121.47], color: 0xff8820 }, // Mumbai → Shanghai
      { start: [19.07, 72.87], end: [40.71, -74.0], color: 0xff6600 },  // Mumbai → New York
      { start: [19.07, 72.87], end: [-33.86, 151.2], color: 0xffa040 }, // Mumbai → Sydney
      { start: [19.07, 72.87], end: [51.5, -0.12], color: 0xff8820 },   // Mumbai → London
    ];

    const latLonToVec3 = (lat, lon, radius) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    };

    const tradeRoutes = [];
    routeData.forEach((route) => {
      const startVec = latLonToVec3(route.start[0], route.start[1], GLOBE_RADIUS);
      const endVec = latLonToVec3(route.end[0], route.end[1], GLOBE_RADIUS);

      // Calculate arc height based on distance
      const dist = startVec.distanceTo(endVec);
      const mid = startVec.clone().add(endVec).multiplyScalar(0.5);
      const arcHeight = GLOBE_RADIUS + dist * 0.4;
      mid.normalize().multiplyScalar(arcHeight);

      const curve = new THREE.QuadraticBezierCurve3(startVec, mid, endVec);
      const curvePoints = curve.getPoints(80);

      // Dashed arc line
      const arcGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const arcMat = new THREE.LineBasicMaterial({
        color: route.color,
        transparent: true,
        opacity: 0.35,
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      globeGroup.add(arcLine);

      // Traveling light dot
      const dotGeo = new THREE.SphereGeometry(0.04, 8, 8);
      const dotMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(curvePoints[0]);
      globeGroup.add(dot);

      // Light trail (smaller dots following)
      const trailDots = [];
      for (let t = 0; t < 5; t++) {
        const tGeo = new THREE.SphereGeometry(0.025 - t * 0.004, 6, 6);
        const tMat = new THREE.MeshBasicMaterial({
          color: route.color,
          transparent: true,
          opacity: 0.6 - t * 0.1,
        });
        const tDot = new THREE.Mesh(tGeo, tMat);
        globeGroup.add(tDot);
        trailDots.push(tDot);
      }

      tradeRoutes.push({ curve, curvePoints, dot, trailDots, progress: Math.random() });
    });

    // --- Hotspot Nodes ---
    const hotspotLocations = [
      { lat: 19.07, lon: 72.87, label: 'Mumbai' },
      { lat: 51.91, lon: 4.47, label: 'Rotterdam' },
      { lat: 1.35, lon: 103.82, label: 'Singapore' },
      { lat: 31.23, lon: 121.47, label: 'Shanghai' },
      { lat: 40.71, lon: -74.0, label: 'New York' },
      { lat: -33.86, lon: 151.2, label: 'Sydney' },
      { lat: 51.5, lon: -0.12, label: 'London' },
    ];

    const hotspotMeshes = [];
    hotspotLocations.forEach((loc) => {
      const pos = latLonToVec3(loc.lat, loc.lon, GLOBE_RADIUS);

      // Core dot
      const coreGeo = new THREE.SphereGeometry(0.055, 12, 12);
      const coreMat = new THREE.MeshBasicMaterial({ color: 0xff6600 });
      const core = new THREE.Mesh(coreGeo, coreMat);
      core.position.copy(pos);
      globeGroup.add(core);

      // Pulse ring
      const ringGeo = new THREE.RingGeometry(0.07, 0.12, 20);
      const ringMatl = new THREE.MeshBasicMaterial({
        color: 0xff6600,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMatl);
      ring.position.copy(pos);
      ring.lookAt(0, 0, 0);
      globeGroup.add(ring);

      // Outer pulse ring (expanding)
      const outerRingGeo = new THREE.RingGeometry(0.08, 0.1, 20);
      const outerRingMat = new THREE.MeshBasicMaterial({
        color: 0xff6600,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
      });
      const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
      outerRing.position.copy(pos);
      outerRing.lookAt(0, 0, 0);
      globeGroup.add(outerRing);

      hotspotMeshes.push({ core, ring, outerRing, ringMatl, outerRingMat });
    });

    // --- Ambient floating dust particles ---
    const DUST_COUNT = 400;
    const dustPositions = new Float32Array(DUST_COUNT * 3);
    for (let i = 0; i < DUST_COUNT; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 12;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xff6600,
      size: 0.015,
      transparent: true,
      opacity: 0.2,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(dustGeo, dustMat));

    // --- Animation ---
    const startTime = performance.now();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = (performance.now() - startTime) * 0.001;

      // Update shader time
      particleMat.uniforms.uTime.value = t;

      // Smooth mouse-driven rotation
      targetRotation.current.x += (mouseRef.current.y * 0.3 - targetRotation.current.x) * 0.02;
      targetRotation.current.y += (mouseRef.current.x * 0.3 - targetRotation.current.y) * 0.02;

      globeGroup.rotation.x = targetRotation.current.x;
      globeGroup.rotation.y = t * 0.06 + targetRotation.current.y;

      // Animate traveling lights
      tradeRoutes.forEach((route) => {
        route.progress = (route.progress + 0.0015) % 1;
        const idx = Math.floor(route.progress * (route.curvePoints.length - 1));
        route.dot.position.copy(route.curvePoints[idx]);

        // Trail follows
        route.trailDots.forEach((td, ti) => {
          const trailIdx = Math.max(0, idx - (ti + 1) * 3);
          td.position.copy(route.curvePoints[trailIdx]);
        });
      });

      // Pulse hotspots
      hotspotMeshes.forEach((hs, i) => {
        const pulse = Math.sin(t * 2 + i * 0.8) * 0.5 + 0.5;
        hs.ringMatl.opacity = 0.2 + pulse * 0.4;
        const scale = 1 + pulse * 0.5;
        hs.outerRing.scale.set(scale, scale, scale);
        hs.outerRingMat.opacity = 0.3 * (1 - pulse);
      });

      renderer.render(scene, camera);
    };
    animate();

    // --- Events ---
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
      };
    };
    container.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    const cleanup = createGlobe();
    return cleanup;
  }, [createGlobe]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[400px] cursor-grab active:cursor-grabbing"
      style={{ touchAction: 'none' }}
    />
  );
}
