import { useState } from "react";
import { UpTwo, DownTwo, RightTwo, LeftTwo } from "@icon-park/react";
import NormalButton from "../components/Button";

function FlipImage() {
  const [address, serAddress] = useState(
    "https://images.pexels.com/photos/2335126/pexels-photo-2335126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  );

  return (
    <div className="mt-10">
      <div className="w-96 h-96 relative select-none">
        <div className="absolute left-44 -top-12 cursor-pointer">
          <UpTwo
            theme="filled"
            size="32"
            fill="#8b5cf6"
            strokeWidth={3}
            strokeLinecap="square"
          />
        </div>
        <div className="absolute top-44 -left-12 cursor-pointer">
          <LeftTwo
            theme="filled"
            size="32"
            fill="#8b5cf6"
            strokeWidth={3}
            strokeLinecap="square"
          />
        </div>
        <div className="absolute top-44 -right-12 cursor-pointer">
          <RightTwo
            theme="filled"
            size="32"
            fill="#8b5cf6"
            strokeWidth={3}
            strokeLinecap="square"
          />
        </div>
        <div className="absolute -bottom-12 left-44 cursor-pointer">
          <DownTwo
            theme="filled"
            size="32"
            fill="#8b5cf6"
            strokeWidth={3}
            strokeLinecap="square"
          />
        </div>
        <img src={address} alt="" className="w-96 h-96" />
      </div>
      <div className="flex items-center mt-20">
        <input
          type="text"
          className="outline-none h-11 w-80 text-xl border border-solid rounded"
        />
        <NormalButton>替换</NormalButton>
      </div>
    </div>
  );
}

export default FlipImage;
