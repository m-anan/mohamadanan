"use client";
import {
  useState,
  useRef,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode,
  Suspense,
} from "react";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls } from "@react-three/drei";

// import { Model1 } from "./3d-logo";

import * as THREE from "three";
// import { Vector3 } from "three";
import * as random from "maath/random/dist/maath-random.cjs";
import { Html } from "@react-three/drei";
import { CameraPositionContext } from "../common/contexts/CameraPositionContext";
import GlobalImage from "../common/components/GlobalImage/GlobalImage";
import { BiHome, BiInfoCircle } from "react-icons/bi";
import { Model1 } from "./3d-logo";

// const random = require('maath/random/dist/maath-random.esm')

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
        showScreen ? "right-0 top-0" : "right-[116px] top-24 xs:right-[53px]"
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
      <div
        className="fixed right-20 top-20 xs:right-4 cursor-pointer"
        onClick={() => {
          setShowScreen(true);
        }}
      >
        <GlobalImage
          src="/computer.png"
          alt="computer"
          width={140}
          height={140}
        />
      </div>
      <div
        className="scroller"
        onScroll={handleScroll}
        style={{ position: "absolute", zIndex: "9", width: "100vw" }}
        id="app"
      >
        <div
          className={"wrapper xs:hidden"}
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
      </div>

      <Canvas
        style={{
          width: showScreen ? "100vw" : "70px",
          height: showScreen ? "100dvh" : "37px",
          background: "#1d1d12",
        }}
        onClick={() => {
          if (!showScreen) setShowScreen(true);
        }}
        camera={{ position: [0, 0, 0] }}
      >
        {showScreen && (
          <>
            <HtmlBox data={data} setData={setData} position={[-3, 0, 0]}>
              <div className="grid grid-cols-2 xs:grid-cols-1 gap-5 my-10 border p-5 rounded-md select-none max-h-screen overflow-auto">
                <div className="w-fit an-move-side-fade an-active">
                  <p>
                    <span className="text-gray-400">Firstname:</span> Mohamad
                  </p>
                </div>
                <div className="w-fit an-move-side-fade an-active">
                  <p>
                    <span className="text-gray-400">Lastname:</span> Anan
                  </p>
                </div>
                <div className="w-fit an-move-side-fade an-active">
                  <p>
                    <span className="text-gray-400">Age:</span> 25
                  </p>
                </div>
                <div className="w-fit an-move-side-fade an-active">
                  <p>
                    <span className="text-gray-400">Nationality:</span> Syrian
                  </p>
                </div>
                <div className="w-fit an-move-side-fade an-active">
                  <p>
                    <span className="text-gray-400">Address:</span> Dubai, UAE
                  </p>
                </div>
                <div className="w-fit an-move-side-fade an-active">
                  <p>
                    <span className="text-gray-400">Phone:</span> +971568669305
                  </p>
                </div>
                <div className="w-fit an-move-side-fade an-active">
                  <p>
                    <span className="text-gray-400">Email:</span>{" "}
                    mohmad2000.an@gmail.com
                  </p>
                </div>
                <div className="w-fit an-move-side-fade an-active">
                  <p>
                    <span className="text-gray-400">Languages:</span> Arabic,
                    English
                  </p>
                </div>
              </div>
            </HtmlBox>
            <HtmlBox data={data} setData={setData} position={[3, 2.6, -3]}>
              <div className="my-10 border rounded-md p-5 max-h-screen overflow-auto">
                <div className="an-move-top-fade an-active">
                  <h2 className="text-3xl mb-20">My Service:</h2>
                </div>
                <div className="grid xs:grid-cols-1 grid-cols-2 gap-5">
                  <div className="p-5 rounded flex justify-center items-center flex-col gap-5 text-center">
                    <div className="w-fit an-pop-up an-active">
                      <div className="border-2 border-gray-500 w-[80px] h-[80px] flex justify-center items-center rounded-full text-3xl text-primary-200">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 24 24"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20 3H7c-1.103 0-2 .897-2 2v2H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h6c1.103 0 2-.897 2-2h8c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM9.997 19H4V9h6l-.003 10zm10-2H12V9c0-1.103-.897-2-2-2H7V5h13l-.003 12z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="an-move-top-fade an-active">
                      <h3 className="font-bold text-2xl">
                        Frontend Development
                      </h3>
                    </div>
                    <div className="an-move-top-fade an-active">
                      <p className="text-gray-300">
                        Modern and mobile-ready website that will help you reach
                        all of your marketing.
                      </p>
                    </div>
                  </div>
                  <div className="p-5 rounded flex justify-center items-center flex-col gap-5 text-center">
                    <div className="w-fit an-pop-up an-active">
                      <div className="border-2 border-gray-500 w-[80px] h-[80px] flex justify-center items-center rounded-full text-3xl text-primary-200">
                        <svg
                          stroke="currentColor"
                          fill="none"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="2"
                            y="2"
                            width="20"
                            height="8"
                            rx="2"
                            ry="2"
                          ></rect>
                          <rect
                            x="2"
                            y="14"
                            width="20"
                            height="8"
                            rx="2"
                            ry="2"
                          ></rect>
                          <line x1="6" y1="6" x2="6.01" y2="6"></line>
                          <line x1="6" y1="18" x2="6.01" y2="18"></line>
                        </svg>
                      </div>
                    </div>
                    <div className="an-move-top-fade an-active">
                      <h3 className="font-bold text-2xl">
                        Backend Development
                      </h3>
                    </div>
                    <div className="an-move-top-fade an-active">
                      <p className="text-gray-300">
                        Modern and mobile-ready website that will help you reach
                        all of your marketing.
                      </p>
                    </div>
                  </div>
                  <div className="p-5 rounded flex justify-center items-center flex-col gap-5 text-center">
                    <div className="w-fit an-pop-up an-active">
                      <div className="border-2 border-gray-500 w-[80px] h-[80px] flex justify-center items-center rounded-full text-3xl text-primary-200">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M8 16.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path>
                          <path
                            fill-rule="evenodd"
                            d="M4 4a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4Zm4-1.5v.75c0 .414.336.75.75.75h2.5a.75.75 0 0 0 .75-.75V2.5h1A1.5 1.5 0 0 1 14.5 4v12a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 16V4A1.5 1.5 0 0 1 7 2.5h1Z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="an-move-top-fade ">
                      <h3 className="font-bold text-2xl">
                        Mobile Applications
                      </h3>
                    </div>
                    <div className="an-move-top-fade ">
                      <p className="text-gray-300">
                        Modern and mobile-ready website that will help you reach
                        all of your marketing.
                      </p>
                    </div>
                  </div>
                  <div className="p-5 rounded flex justify-center items-center flex-col gap-5 text-center">
                    <div className="w-fit an-pop-up an-active">
                      <div className="border-2 border-gray-500 w-[80px] h-[80px] flex justify-center items-center rounded-full text-3xl text-primary-200">
                        <svg
                          stroke="currentColor"
                          fill="none"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="an-move-top-fade ">
                      <h3 className="font-bold text-2xl">Database Mangement</h3>
                    </div>
                    <div className="an-move-top-fade ">
                      <p className="text-gray-300">
                        Modern and mobile-ready website that will help you reach
                        all of your marketing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </HtmlBox>

            {/* <HtmlBox data={data} setData={setData} position={[2, 0, 1]}>
              React
            </HtmlBox> */}
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <Suspense fallback={null}>
              <Model1 position={[0, 0, 0]} scale={[0.5, 0.5, 0.5]} />
            </Suspense>
            <Stars />
          </>
        )}
        <pointLight color={"#08B4AB"} position={[0, 0, 0]} />
      </Canvas>
      <div
        className={`fixed bottom-1/2 right-2 cursor-pointer -translate-y-1/2 text-white z-[9999999999] select-none ${
          !showScreen ? "hidden" : "flex flex-col"
        }`}
      >
        <span
          onClick={() => {
            setData([0, 0, 5]);
          }}
          className="rounded-full p-2 bg-gray-500"
        >
          <BiHome />
        </span>
        <span
          onClick={() => {
            setData([4, 4, -3.6]);
          }}
          className="rounded-full p-2 bg-gray-500"
        >
          <BiHome />
        </span>
        {/* <span
            onClick={() => {
              setData([2, 0, 2]);
            }}
            className="rounded-full p-2 bg-gray-500"
          >
            <BiInfoCircle />
          </span> */}
        <span
          onClick={() => {
            setData([-5.4, 0, 0]);
          }}
          className="rounded-full p-2 bg-gray-500"
        >
          <BiHome />
        </span>
      </div>
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
    camera.position.lerp(vec.set(1.3, 0, 5), 0.05);
  });
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(400), { radius: 4 })
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
          size={0.01}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default Home;

function HtmlBox({
  setData,
  data,
  position,
  children,
}: {
  data: any;
  setData: Dispatch<any>;
  position: [number, number, number];
  children?: ReactNode;
}) {
  const [vec] = useState(() => new THREE.Vector3());
  const mesh: any = useRef();
  let y: number;
  let x: number;
  onmousemove = function (e) {
    y = e.clientY;
    x = e.clientX;
  };
  const { viewport, camera } = useThree();
  const [visible, setVisible] = useState(false);
  useFrame(() => {
    // mesh.current.rotation.z += 0.001;
    // mesh.current.rotation.y += 0.001;
    // mesh.current.position.lerp(target, 0.05);
    const dist = camera.position.distanceTo(mesh.current.position);
    setVisible(dist < 30);
    data && camera.position.lerp(vec.set(data[0], data[1], data[2]), 0.05);
  });
  const [target, setTarget] = useState(
    new THREE.Vector3(position[0], position[1], position[2])
  ); // initial position
  const handleClick = () => {
    if (!mesh.current) return;

    // Calculate a point a little bit in front of the camera
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);

    // Move toward camera (1.5 units in front)
    const newPosition = camera.position
      .clone()
      .add(cameraDirection.multiplyScalar(0.2));

    setTarget(newPosition);
  };
  return (
    <mesh ref={mesh} position={position}>
      {visible && (
        <Html
          occlude
          transform
          distanceFactor={1.5}
          rotation={[0, 0, 0]}
          className="z-50"
        >
          {children}
          {/* <p
          onClick={() => {
            // setData([0.6, 0.3, 0.3]);
            handleClick();
          }}
          className="cursor-pointer select-none"
        >
          React
        </p>
        <p
          onClick={() => {
            setData([0.6, 0.5, 0.3]);
          }}
          className="cursor-pointer"
        >
          Next.js
        </p> */}
        </Html>
      )}
      {/* <Html
        transform
        distanceFactor={1}
        rotation={[0, 1, 0]}
        position={[0, 0, 0]}
        className="z-50"
      ></Html> */}

      {/* <Model1
        // scale={[0.01, 0.01, 0.01]}
        position={[0, 0.4, 0.3]}
        className="cursor-pointer"
      /> */}
    </mesh>
  );
}
