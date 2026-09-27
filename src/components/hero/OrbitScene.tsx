"use client";

import { useEffect, useRef } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  Points,
  PointsMaterial,
  Scene,
  SRGBColorSpace,
  Sprite,
  SpriteMaterial,
  ACESFilmicToneMapping,
  Vector3,
  WebGLRenderer,
} from "three";

// A corrugated chrome tube bent into an arc: the "orbit" of the parallax mark.
function ribbedArc(opts: { radius: number; tube: number; ribs: number; tubular: number; radial: number; start: number; end: number }) {
  const { radius, tube, ribs, tubular, radial, start, end } = opts;
  const positions = new Float32Array((tubular + 1) * (radial + 1) * 3);
  const indices: number[] = [];
  let p = 0;
  for (let i = 0; i <= tubular; i++) {
    const t = start + (end - start) * (i / tubular);
    // Rounded ribs with sharp grooves between them
    const rib = Math.pow(Math.abs(Math.sin(t * ribs)), 0.45);
    const r = tube * (0.94 + 0.06 * rib);
    const ct = Math.cos(t);
    const st = Math.sin(t);
    for (let j = 0; j <= radial; j++) {
      const phi = (j / radial) * Math.PI * 2;
      const ring = radius + r * Math.cos(phi);
      positions[p++] = ring * ct;
      positions[p++] = ring * st;
      positions[p++] = r * Math.sin(phi);
    }
  }
  for (let i = 0; i < tubular; i++) {
    for (let j = 0; j < radial; j++) {
      const a = i * (radial + 1) + j;
      const b = (i + 1) * (radial + 1) + j;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }
  const g = new BufferGeometry();
  g.setAttribute("position", new BufferAttribute(positions, 3));
  g.setIndex(indices);
  g.computeVertexNormals();
  return g;
}

// A dark studio with a few softboxes, so chrome reflects light and black space.
function studioEnvironment(renderer: WebGLRenderer) {
  const env = new Scene();
  env.background = new Color(0x020202);
  const box = (w: number, h: number, intensity: number, pos: [number, number, number], look: [number, number, number] = [0, 0, 0]) => {
    const m = new Mesh(
      new PlaneGeometry(w, h),
      new MeshBasicMaterial({ color: new Color(intensity, intensity, intensity) }),
    );
    m.position.set(...pos);
    m.lookAt(new Vector3(...look));
    env.add(m);
  };
  box(14, 3, 3.2, [0, 9, 2]); // big overhead strip
  box(2.2, 10, 2.4, [9, 1, 3]); // right strip
  box(1.2, 8, 0.9, [-9, 0, 2]); // faint left fill
  box(10, 1.2, 1.6, [0, 3, -10]); // back rim
  box(4, 4, 0.5, [0, -8, 6]); // floor bounce
  const pmrem = new PMREMGenerator(renderer);
  const tex = pmrem.fromScene(env, 0.02).texture;
  pmrem.dispose();
  return tex;
}

function glowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.08, "rgba(255,255,255,0.9)");
  g.addColorStop(0.25, "rgba(255,255,255,0.18)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  return t;
}

export default function OrbitScene({ onReady }: { onReady?: () => void }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // No WebGL: the CSS glow behind stays as the fallback
    }

    const small = window.matchMedia("(max-width: 767px)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 1.75));
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = SRGBColorSpace;
    host.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    const scene = new Scene();
    const envMap = studioEnvironment(renderer);
    scene.environment = envMap;

    const camera = new PerspectiveCamera(32, 1, 0.1, 100);
    const lookAt = new Vector3(0, 0.2, 0);

    // The ring
    const radius = 3.4;
    const arcGeo = ribbedArc({
      radius,
      tube: 0.62,
      ribs: 70,
      tubular: small ? 700 : 1400,
      radial: small ? 28 : 44,
      start: -0.25,
      end: Math.PI + 0.25,
    });
    const chrome = new MeshStandardMaterial({ color: 0xd8d8d8, metalness: 1, roughness: 0.22 });
    const arc = new Mesh(arcGeo, chrome);

    const orbit = new Group();
    orbit.add(arc);
    orbit.position.set(0, -radius - 1.15, 0);
    orbit.rotation.set(-0.42, 0.55, 0);
    scene.add(orbit);

    // The star, sighted from two points on the orbit
    const glow = glowTexture();
    const star = new Sprite(new SpriteMaterial({ map: glow, blending: AdditiveBlending, depthWrite: false, transparent: true }));
    const starPos = new Vector3(2.35, 1.95, -1.5);
    star.position.copy(starPos);
    star.scale.setScalar(0.9);
    scene.add(star);

    const sightMat = new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.16 });
    const sightLines: Line[] = [];
    const footA = new Vector3();
    const footB = new Vector3();
    for (let k = 0; k < 2; k++) {
      const geo = new BufferGeometry().setFromPoints([new Vector3(), starPos]);
      const line = new Line(geo, sightMat);
      sightLines.push(line);
      scene.add(line);
    }
    const updateSightLines = () => {
      orbit.updateMatrixWorld();
      // Points on the top outer edge of the ring at two angles
      footA.set(Math.cos(2.35) * (radius + 0.62), Math.sin(2.35) * (radius + 0.62), 0).applyMatrix4(orbit.matrixWorld);
      footB.set(Math.cos(0.95) * (radius + 0.62), Math.sin(0.95) * (radius + 0.62), 0).applyMatrix4(orbit.matrixWorld);
      [footA, footB].forEach((f, k) => {
        const attr = sightLines[k].geometry.getAttribute("position") as BufferAttribute;
        attr.setXYZ(0, f.x, f.y, f.z);
        attr.setXYZ(1, starPos.x, starPos.y, starPos.z);
        attr.needsUpdate = true;
      });
    };

    // Drifting dust
    const dustCount = small ? 160 : 320;
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 16;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 9;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
    }
    const dustGeo = new BufferGeometry();
    dustGeo.setAttribute("position", new BufferAttribute(dustPos, 3));
    const dust = new Points(
      dustGeo,
      new PointsMaterial({ color: 0xffffff, size: 0.028, transparent: true, opacity: 0.55, depthWrite: false }),
    );
    scene.add(dust);

    // Size
    let camY = 0.4;
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // Pull back on narrow screens so the whole ring fits
      const narrow = w / h < 1;
      camY = narrow ? 0.6 : 0.4;
      camera.position.set(0, camY, narrow ? 15.5 : 10.5);
      camera.fov = narrow ? 36 : 32;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    // Pointer parallax: fitting, for a company named after parallax
    const pointer = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(host);

    let raf = 0;
    let first = true;
    const start = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      const t = (now - start) / 1000;

      orbit.rotation.y = 0.55 + Math.sin(t * 0.18) * 0.16;
      orbit.rotation.z = Math.sin(t * 0.11) * 0.03;
      star.scale.setScalar(0.85 + Math.sin(t * 1.6) * 0.06);
      dust.rotation.y = t * 0.012;
      dust.position.y = Math.sin(t * 0.2) * 0.1;

      camera.position.x += (pointer.x * 0.55 - camera.position.x) * 0.04;
      camera.position.y += (camY - pointer.y * 0.3 - camera.position.y) * 0.04;
      camera.lookAt(lookAt);

      updateSightLines();
      renderer.render(scene, camera);
      if (first) {
        first = false;
        onReady?.();
      }
    };

    if (reduceMotion) {
      camera.lookAt(lookAt);
      updateSightLines();
      renderer.render(scene, camera);
      onReady?.();
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      arcGeo.dispose();
      chrome.dispose();
      dustGeo.dispose();
      glow.dispose();
      envMap.dispose();
      sightLines.forEach((l) => l.geometry.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [onReady]);

  return <div ref={hostRef} className="absolute inset-0" />;
}
