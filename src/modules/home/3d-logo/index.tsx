import * as THREE from "three";
import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
//@ts-ignore
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
//@ts-ignore
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
//@ts-ignore
import { DDSLoader } from "three/examples/jsm/loaders/DDSLoader";

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

export function Model1(props: any) {
  const materials = useLoader(MTLLoader, "/Moon.mtl");
  const obj = useLoader(OBJLoader, "/Moon.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });
  // Load your textures manually
  const colorMap = useLoader(THREE.TextureLoader, "/Diffuse_2K.png"); // your color texture
  const normalMap = useLoader(THREE.TextureLoader, "/Bump_2K.png"); // your normal/bump texture

  // Apply the textures to all meshes in the model
  obj.traverse((child: any) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        map: colorMap,
        normalMap: normalMap,
      });
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  const mesh: any = useRef();
  useFrame(() => {
    mesh.current.rotation.y += 0.0005;
    mesh.current.rotation.x += 0.0005;
  });
  return <primitive ref={mesh} object={obj} args={[1, 1, 1]} {...props} />;
}

export function Model(props: any) {
  const materials = useLoader(MTLLoader, "/A_logo_02.obj");
  const obj = useLoader(OBJLoader, "/A_logo_02.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });
  const mesh: any = useRef();

  let y: number;
  let x: number;
  onmousemove = function (e) {
    y = e.clientY;
    x = e.clientX;
  };
  console.log(mesh);
  useFrame(() => {
    mesh.current.rotation.y += 0.05;
    // if (y) {
    //     mesh.current.position.x = (x * viewport.width) / 50000;
    //     mesh.current.position.y = (y * viewport.height) / 500000;
    // }
  });
  return (
    <mesh ref={mesh}>
      <primitive object={obj} args={[1, 1, 1]} {...props} />
    </mesh>
  );
}

const ThreedSection = () => {
  return (
    <section
      className="h-screen text-center md:text-7xl p-10 md:p-52 flex place-items-center sm:text-sm text-black"
      style={{ backgroundColor: "#fff", zIndex: 9999999 }}
    >
      <div style={{ position: "absolute", zIndex: "9999" }}>
        <p>
          As a digital platform, we chose to make an impact where it matters: a
          transformed digital journey, an enhanced user experience and a revived
          marketing reality.
        </p>
      </div>
      <Canvas
        camera={{ position: [180, 0, 1] }}
        style={{ width: "100vw", height: "100vh", background: "#fff" }}
      >
        <ambientLight color={"#74B4AF"} intensity={0.1} />
        <pointLight position={[100, 100, 50]} color={"#74B4AF"} />
        <Suspense fallback={null}>
          <Model rotation={[0, 0, 0]} />
        </Suspense>
      </Canvas>
    </section>
  );
};
export default ThreedSection;
