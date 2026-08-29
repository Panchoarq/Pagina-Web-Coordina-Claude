"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Crossfade con leve distorsion (wipe diagonal) entre dos texturas.
const FRAGMENT = /* glsl */ `
  uniform sampler2D texA;
  uniform sampler2D texB;
  uniform float progress;
  varying vec2 vUv;
  void main() {
    float wipe = smoothstep(0.0, 1.0, clamp((vUv.x + vUv.y * 0.3 - (progress * 1.3 - 0.15)) * 2.5, 0.0, 1.0));
    vec4 a = texture2D(texA, vUv);
    vec4 b = texture2D(texB, vUv);
    gl_FragColor = mix(a, b, 1.0 - wipe);
  }
`;

export default function DesignPlansViewer({ plans }) {
  const mountRef = useRef(null);
  const [active, setActive] = useState(0);
  const stateRef = useRef({ material: null, textures: [], target: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const loader = new THREE.TextureLoader();
    const textures = plans.map((p) => {
      const t = loader.load(p.src);
      t.colorSpace = THREE.SRGBColorSpace;
      return t;
    });

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      uniforms: {
        texA: { value: textures[0] },
        texB: { value: textures[0] },
        progress: { value: 1 },
      },
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    stateRef.current = { material, textures, target: 0 };

    let raf;
    let progress = 1;
    let currentIdx = 0;

    function resize() {
      const { clientWidth, clientHeight } = mount;
      renderer.setSize(clientWidth, clientHeight, false);
    }
    resize();
    window.addEventListener("resize", resize);

    function tick() {
      const targetIdx = stateRef.current.target;
      if (targetIdx !== currentIdx && progress >= 1) {
        material.uniforms.texA.value = textures[currentIdx];
        material.uniforms.texB.value = textures[targetIdx];
        progress = 0;
        currentIdx = targetIdx;
      }
      if (progress < 1) {
        progress = Math.min(1, progress + 0.025);
        material.uniforms.progress.value = progress;
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      textures.forEach((t) => t.dispose());
      mount.removeChild(renderer.domElement);
    };
  }, [plans]);

  useEffect(() => {
    stateRef.current.target = active;
  }, [active]);

  return (
    <div className="plans-viewer">
      <div className="plans-stage" ref={mountRef}>
        <span className="plans-label">{plans[active]?.label}</span>
      </div>
      <div className="plans-rail">
        {plans.map((p, i) => (
          <button
            key={p.src}
            className={`plans-thumb${i === active ? " is-active" : ""}`}
            onClick={() => setActive(i)}
            aria-label={p.label}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt={p.label} />
          </button>
        ))}
      </div>
    </div>
  );
}
