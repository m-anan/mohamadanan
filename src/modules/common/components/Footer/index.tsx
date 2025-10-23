const Footer = () => {
  return (
    <section
      className="flex lg:flex-row flex-col justify-between items-center lg:mx-20 my-10 xs:hidden"
      style={{ zIndex: "9999" }}
    >
      <div className="lg:text-left text-center lg:max-w-xs lg:w-2/4 w-3/4 max-w-[15rem]">
        <p>Reinventing digital. Shaping lives. Evoking Oneness.</p>
      </div>
      <div className="lg:w-auto w-full flex lg:flex-col flex-col-reverse lg:border-l border-0 border-solid border-slate-400 px-6 pt-10 lg:pt-0">
        <div className="flex w-full lg:justify-start justify-end items-center mb-3 "></div>
        <div className="lg:border-0 border-b">
          <p className=" mb-3 text-slate-400">mohmad2000.an@gmail.com</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
