import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

/* "Toon Cat FREE" by Omabuarts Studio, CC-BY-4.0 — a small rigged, animated
   GLB (self-hosted at public/models/toon-cat.glb since it's ~200KB, light
   enough to just load). Walks in once, then sits and watches the cursor:
   head/neck track the pointer, one ear twitches on hover, the tail sways
   faster while "purring," and a click triggers a hop or a stretch.
   https://sketchfab.com/3d-models/toon-cat-free-b2bd1ee7858444bda366110a2d960386 */
const MODEL_URL = "/models/toon-cat.glb";

const TAIL_BONES = ["tail_07", "tail01_08", "tail02_09", "tail03_010", "tailend_011"];
const POSE_BONES = ["neck_017", "head_018", "earL_019", "earR_020", ...TAIL_BONES];
const ENTER_FROM = -3.4;

export default function InteractiveCat() {
  const hostRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let disposed = false;
    let raf = 0;
    let holdTimeout = 0;
    let modelReady = false;
    let posed = false;
    let hovering = false;
    let hoverT = 0;
    let phase = "enter";
    let phaseT = 0;
    let t = 0;

    const bones = {};
    const look = { x: 0, y: 0 };
    const lookSmooth = { x: 0, y: 0 };
    const react = { blinkT: 0, purr: 0, hop: 0, stretch: 0, flick: 0 };
    const clock = new THREE.Clock();
    const tmpQ = new THREE.Quaternion();
    const tmpE = new THREE.Euler();

    const setRot = (bone, x, y, z) => {
      if (!bone || !bone.userData.qBase) return;
      tmpE.set(x, y, z);
      tmpQ.setFromEuler(tmpE);
      bone.quaternion.copy(bone.userData.qBase).multiply(tmpQ);
    };
    const snapshotPose = () => {
      POSE_BONES.forEach((n) => {
        if (bones[n]) bones[n].userData.qBase = bones[n].quaternion.clone();
      });
      posed = true;
    };

    const W = host.clientWidth || 1;
    const H = host.clientHeight || 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.className = "pet-widget__canvas";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, W / H, 0.1, 100);
    camera.position.set(0, 1.15, 4.6);
    camera.lookAt(0, 0.72, 0);

    scene.add(new THREE.HemisphereLight(0xffffff, 0xd8cfc0, 0.85));
    const key = new THREE.DirectionalLight(0xfff6e8, 1.5);
    key.position.set(2.4, 4.2, 3);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far = 14;
    key.shadow.camera.left = -3;
    key.shadow.camera.right = 3;
    key.shadow.camera.top = 3;
    key.shadow.camera.bottom = -3;
    key.shadow.radius = 3;
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xbcd4ff, 0.4);
    rim.position.set(-3, 2, -2.5);
    scene.add(rim);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(14, 14),
      new THREE.ShadowMaterial({ opacity: 0.16 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const rig = new THREE.Group();
    scene.add(rig);

    let mixer = null;
    let idle = null;

    new GLTFLoader().load(
      MODEL_URL,
      (gltf) => {
        if (disposed) return;
        const cat = gltf.scene;
        cat.traverse((o) => {
          if (o.isMesh) {
            o.castShadow = true;
            o.frustumCulled = false;
            if (o.material) o.material.side = THREE.FrontSide;
          }
          if (o.isBone) bones[o.name] = o;
        });

        const fit = new THREE.Group();
        fit.add(cat);
        rig.add(fit);

        cat.updateWorldMatrix(true, true);
        const bounds = new THREE.Box3().setFromObject(cat);
        const size = bounds.getSize(new THREE.Vector3());
        const scaleK = 1.5 / size.y;
        const center = bounds.getCenter(new THREE.Vector3());
        fit.scale.setScalar(scaleK);
        fit.position.set(-center.x * scaleK, -bounds.min.y * scaleK, -center.z * scaleK);

        if (gltf.animations.length) {
          mixer = new THREE.AnimationMixer(cat);
          idle = mixer.clipAction(gltf.animations[0]);
          idle.timeScale = 1.35;
          idle.play();
        }
        modelReady = true;
        setReady(true);
      },
      undefined,
      () => {
        if (!disposed) setFailed(true);
      }
    );

    const onPointerMove = (e) => {
      const r = host.getBoundingClientRect();
      look.x = THREE.MathUtils.clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1, 1);
      look.y = THREE.MathUtils.clamp(((e.clientY - r.top) / r.height) * 2 - 1, -1, 1);
    };
    const onPointerEnter = () => {
      hovering = true;
      react.flick = 1;
    };
    const onPointerLeave = () => {
      hovering = false;
      look.x = 0;
      look.y = 0;
    };
    const onClick = () => {
      if (idle) {
        idle.timeScale = 0.8;
        window.clearTimeout(holdTimeout);
        holdTimeout = window.setTimeout(() => {
          if (idle) idle.timeScale = 0;
        }, 620);
      }
      react.purr = 1;
      react.blinkT = 1;
      if (Math.random() < 0.5) react.hop = 1;
      else react.stretch = 1;
    };

    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerenter", onPointerEnter);
    host.addEventListener("pointerleave", onPointerLeave);
    host.addEventListener("click", onClick);

    function tick() {
      const dt = Math.min(clock.getDelta(), 0.05);
      t += dt;
      phaseT += dt;
      if (mixer) mixer.update(dt);

      if (modelReady) {
        if (phase === "enter") {
          const k = Math.min(phaseT / 2.6, 1);
          const eased = 1 - (1 - k) ** 2;
          rig.position.x = ENTER_FROM * (1 - eased);
          rig.rotation.y = THREE.MathUtils.lerp(Math.PI * 0.5, 0.22, eased);
          if (k === 1) {
            phase = "idle";
            phaseT = 0;
            if (idle) idle.timeScale = 0;
            snapshotPose();
          }
        } else {
          rig.position.x += (0 - rig.position.x) * 0.05;
          rig.rotation.y += (0.22 - rig.rotation.y) * 0.05;
        }

        react.purr = Math.max(0, react.purr - dt * 1.1);
        react.hop = Math.max(0, react.hop - dt * 1.4);
        react.stretch = Math.max(0, react.stretch - dt * 0.7);
        react.flick = Math.max(0, react.flick - dt * 1.6);
        react.blinkT = Math.max(0, react.blinkT - dt * 2.2);
        hoverT += ((hovering ? 1 : 0) - hoverT) * 0.12;

        lookSmooth.x += (look.x - lookSmooth.x) * 0.08;
        lookSmooth.y += (look.y - lookSmooth.y) * 0.08;

        const breathe = Math.sin(t * 1.6) * 0.012;
        const hopArc = Math.sin((1 - react.hop) * Math.PI) * 0.22 * (react.hop > 0 ? 1 : 0);
        const shiver = react.purr * Math.sin(t * 34) * 0.012;
        rig.position.y = breathe + hopArc;
        rig.position.z = shiver;
        rig.scale.setScalar(1 + react.stretch * 0.03 * Math.sin(react.stretch * Math.PI));

        const K = { yaw: 0.14, pitch: 0.06, tail: 0.03, ear: 0.06 };
        if (posed) {
          const yaw = lookSmooth.x * K.yaw;
          const pitch = lookSmooth.y * K.pitch;
          setRot(bones.neck_017, pitch * 0.5, yaw * 0.4, 0);
          setRot(bones.head_018, pitch - react.stretch * 0.05, yaw, Math.sin(t * 0.9) * 0.01);

          const twitch = (Math.sin(t * 18) * 0.5 * hoverT + react.flick) * K.ear;
          setRot(bones.earL_019, 0, 0, twitch);
          setRot(bones.earR_020, 0, 0, -twitch * 0.8);

          const rate = 1.1 + react.purr * 3;
          const amp = K.tail * (1 + react.purr * 0.8 + react.flick);
          TAIL_BONES.forEach((n, i) => {
            setRot(bones[n], 0, Math.sin(t * rate - i * 0.5) * amp, 0);
          });
        }

        const squint = 1 - react.blinkT * 0.8;
        if (bones.eyeL_022) bones.eyeL_022.scale.y = squint;
        if (bones.eyeR_023) bones.eyeR_023.scale.y = squint;
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    const resize = () => {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(holdTimeout);
      ro.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerenter", onPointerEnter);
      host.removeEventListener("pointerleave", onPointerLeave);
      host.removeEventListener("click", onClick);
      scene.traverse((o) => {
        if (!o.isMesh) return;
        o.geometry?.dispose();
        (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m?.dispose());
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="pet-widget__scene" ref={hostRef}>
      {(!ready || failed) && (
        <div className="hero__scene-fallback">
          <p className="mono dim">
            {failed ? "the cat wandered off, reload to try again" : "waking the cat…"}
          </p>
        </div>
      )}
      <div className="pet-widget__tag">
        <span>say hi</span>
      </div>
    </div>
  );
}
