"use client";
import { useState, useRef, useContext, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

// import { Model1 } from "./3d-logo";

import * as THREE from "three";
// import { Vector3 } from "three";
import * as random from "maath/random/dist/maath-random.cjs";
import { Html } from "@react-three/drei";
import { CameraPositionContext } from "../common/contexts/CameraPositionContext";
import GlobalImage from "../common/components/GlobalImage/GlobalImage";

// const random = require('maath/random/dist/maath-random.esm')

function HtmlBox() {
  const { data, setData } = useContext(CameraPositionContext);

  const [vec] = useState(() => new THREE.Vector3());
  const mesh: any = useRef();
  let y: number;
  let x: number;
  onmousemove = function (e) {
    y = e.clientY;
    x = e.clientX;
  };
  const { viewport, camera } = useThree();
  useFrame(() => {
    mesh.current.rotation.x += 0.001;
    // mesh.current.rotation.y += 0.001;
    if (data) {
      camera.position.lerp(vec.set(data[0], data[1], data[2]), 0.05);
    }
  });

  return (
    <mesh ref={mesh} position={[0.6, 0.2, 0.3]}>
      <Html
        occlude
        transform
        distanceFactor={1.5}
        rotation={[0, 1, 0]}
        position={[0, -0.2, 0]}
        className="z-50"
      >
        <p
          onClick={() => {
            setData([0.6, 0.3, 0.3]);
          }}
          className="cursor-pointer"
        >
          React
        </p>
      </Html>
      <Html
        transform
        distanceFactor={1}
        rotation={[0, 1, 0]}
        position={[0, 0, 0]}
        className="z-50"
      >
        <p
          onClick={() => {
            setData([0.6, 0.5, 0.3]);
          }}
          className="cursor-pointer"
        >
          Next.js
        </p>
      </Html>
      {/* <Model1
        scale={[0.01, 0.01, 0.01]}
        position={[0, 0.4, 0.3]}
        className="cursor-pointer"
      /> */}
    </mesh>
  );
}

const Home = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const [move, setMove] = useState(0);
  const { data, setData } = useContext(CameraPositionContext);

  const handleScroll = (e: any) => {
    setScrollTop(e.currentTarget.scrollTop);
    const progress: any = document.querySelector(".progress");
    const container: any = document.querySelector(".container");
    const docHeight: any =
      document.querySelector("#app")!.scrollHeight - window.innerHeight;

    let top = scrollTop;
    let perc = Math.ceil((top * 100) / docHeight);

    container.setAttribute("data-scroll", perc);
    progress.style.strokeDashoffset = 264 - (perc / 100) * 264;
    setMove(264 - (perc / 100) * 264);
  };
  const [showScreen, setShowScreen] = useState(false);
  return (
    <div
      className={`fixed overflow-x-hidden ${
        showScreen ? "right-0 top-0" : "right-28 top-24"
      }`}
      // style={{ cursor: "url(/src/assets/cur.png), auto" }}
    >
      {showScreen && (
        <div className="fixed top-0 left-0 w-full  z-50 bg-gray-500 flex px-3 py-2 gap-2">
          <span
            className=" bg-red-500 rounded-full w-3 h-3 group flex items-center justify-center select-none text-center"
            onClick={() => {
              setShowScreen(false);
            }}
          >
            <span className="hidden group-hover:block font-sans text-[7px] text-red-950">
              X
            </span>
          </span>
          <span
            className=" bg-green-500 rounded-full w-3 h-3 group flex items-center justify-center select-none text-center"
            onClick={() => {
              setShowScreen(false);
            }}
          ></span>
        </div>
      )}
      <div className="fixed right-20 top-20">
        <GlobalImage
          src="/computer.png"
          alt="computer"
          width={120}
          height={120}
          onClick={() => {
            setShowScreen(true);
          }}
        />
      </div>
      <div
        className="scroller"
        onScroll={handleScroll}
        style={{ position: "absolute", zIndex: "9", width: "100vw" }}
        id="app"
      >
        <div
          className={"wrapper"}
          style={{
            zIndex: "99999999",
            display: "fixed",
            width: "auto",
            height: "auto",
          }}
        >
          <div className={` container`} data-scroll="0">
            <svg
              width="90"
              height="90"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                r="42"
                cx="45"
                cy="45"
                fill="transparent"
                strokeDasharray="264"
                strokeDashoffset="0"
              />
              <circle
                className={` progress`}
                r="42"
                cx="45"
                cy="45"
                fill="transparent"
                strokeDasharray="264"
                strokeDashoffset="264"
              />
            </svg>
          </div>
        </div>

        <div
          className="fixed bottom-4 left-[50%] cursor-pointer -translate-x-1/2 text-white z-50"
          onClick={() => {
            setData([4, 1, 2]);
          }}
        >
          back to center
        </div>
      </div>

      <Canvas
        style={{
          width: showScreen ? "100vw" : "60px",
          height: showScreen ? "100vh" : "30px",
          background: "#1d1d12",
        }}
        camera={{ position: [10, 1, 3] }}
      >
        {showScreen && (
          <>
            <HtmlBox />
            <Stars />
          </>
        )}
        <pointLight color={"#08B4AB"} position={[10, 10, 10]} />
      </Canvas>
    </div>
  );
};

function Stars(props: any) {
  const ref: any = useRef();

  let y: number;
  let x: number;
  onmousemove = function (e) {
    y = e.clientY;
    x = e.clientX;
  };

  const { viewport, camera } = useThree();
  const [vec] = useState(() => new THREE.Vector3());

  useFrame(({}, delta: any) => {
    ref.current.rotation.x -= delta / 40;
    ref.current.rotation.y -= delta / 600;
    camera.position.lerp(vec.set(1.3, 0, 0.3), 0.05);
  });
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(400), { radius: 2 })
  );
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#FFA0E0"
          size={0.007}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default Home;
