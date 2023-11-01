function Footer() {
  return (
    <div className="bg-black text-white px-5 py-10 flex flex-col">
      <div className=" flex flex-col md:flex-row justify-around">
        <div className="flex flex-col font-bold cursor-default max-w-xs break-normal my-auto">
          <img
            className="mx-auto w-20"
            src="https://gujhome.gujarat.gov.in/portal/images/Home/gujaratpolice.png"
            alt=""
          />

          <h1 className="my-auto text-2xl">Gujrat Police</h1>
        </div>

        <div className="text-sm py-5">
          <div className="capitalize">
            <div className="my-2 mx-3 hover:text-gray-400">Home</div>
            <div className="my-2 mx-3 hover:text-gray-400">about</div>
            <div className="my-2 mx-3 hover:text-gray-400">contact us</div>
            <div className="my-2 mx-3 hover:text-gray-400">Dashboard</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col text-center mt-10">
        <p>made with ❤️ by devloper for devlopers.</p>
        <p className="md:text-right"> © 2023 All Rights Reserved </p>
      </div>
    </div>
  );
}

export default Footer;
