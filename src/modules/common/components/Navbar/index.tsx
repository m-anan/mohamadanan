import React from "react";

const Navbar = () => {
  return (
    <header className="flex justify-between  items-center w-full lg:absolute lg:px-20 md:py-20 px-4 z-[999]">
      <div className="lg:w-2/4 md:w-3/4 ">
        <h1 className="xs:text-xs"> Mohamad Anan</h1>
        <p className="lg:text-xl lg:block hidden " style={{ color: "#b1b1b1" }}>
          Web Developer
        </p>
      </div>
      <div>
        <p className="lg:text-3xl lg:text-left xs:text-xs text-center lg:pt-0 pt-2 text-base font-light">
          {" "}
          The <b className="font-semibold">oneness </b> solution for
          <br /> the digital sphere
        </p>
      </div>
    </header>
  );
};
export default Navbar;
