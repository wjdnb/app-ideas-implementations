import { useState, useEffect } from "react";
import { UpTwo, DownTwo, RightTwo, LeftTwo } from "@icon-park/react";
import NormalButton from "../components/Button";

function FlipImage() {
  const [address, setAddress] = useState(
    "https://images.pexels.com/photos/2335126/pexels-photo-2335126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  );

  const [inputValue, setInputValue] = useState(
    "https://images.pexels.com/photos/2335126/pexels-photo-2335126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  );

  useEffect(() => {
    let image = document.getElementById("image");
    image.addEventListener("error", function () {
      alert("链接错误");
    });
  }, []);

  const handleSrc = () => {
    setAddress(inputValue);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const extractRotateValues = (transformString) => {
    const rotateXMatch = transformString.match(/rotateX\((-?\d+\.?\d*)deg\)/);
    const rotateYMatch = transformString.match(/rotateY\((-?\d+\.?\d*)deg\)/);

    const rotateX = rotateXMatch ? parseFloat(rotateXMatch[1]) : 0;
    const rotateY = rotateYMatch ? parseFloat(rotateYMatch[1]) : 0;

    return { rotateX, rotateY };
  };

  const clickUp = () => {
    const element = document.getElementById("rotate");
    let transform = element.style.transform;

    let { rotateX, rotateY } = extractRotateValues(transform);

    element.style.transform = `rotateX(${
      rotateX + 180
    }deg) rotateY(${rotateY}deg)`;
  };

  const clickDown = () => {
    const element = document.getElementById("rotate");
    let transform = element.style.transform;

    let { rotateX, rotateY } = extractRotateValues(transform);

    element.style.transform = `rotateX(${
      rotateX - 180
    }deg) rotateY(${rotateY}deg)`;
  };

  const clickLeft = () => {
    const element = document.getElementById("rotate");
    let transform = element.style.transform;

    let { rotateX, rotateY } = extractRotateValues(transform);

    element.style.transform = `rotateX(${rotateX}deg) rotateY(${
      rotateY - 180
    }deg)`;
  };

  const clickRight = () => {
    const element = document.getElementById("rotate");
    let transform = element.style.transform;

    let { rotateX, rotateY } = extractRotateValues(transform);

    element.style.transform = `rotateX(${rotateX}deg) rotateY(${
      rotateY + 180
    }deg)`;
  };

  return (
    <div className="mt-10">
      <div className="w-96 h-96 relative select-none">
        <div
          onClick={clickUp}
          className="absolute left-44 -top-12 cursor-pointer"
        >
          <UpTwo
            theme="filled"
            size="32"
            fill="#8b5cf6"
            strokeWidth={3}
            strokeLinecap="square"
          />
        </div>
        <div
          onClick={clickLeft}
          className="absolute top-44 -left-12 cursor-pointer"
        >
          <LeftTwo
            theme="filled"
            size="32"
            fill="#8b5cf6"
            strokeWidth={3}
            strokeLinecap="square"
          />
        </div>
        <div
          onClick={clickRight}
          className="absolute top-44 -right-12 cursor-pointer"
        >
          <RightTwo
            theme="filled"
            size="32"
            fill="#8b5cf6"
            strokeWidth={3}
            strokeLinecap="square"
          />
        </div>
        <div
          onClick={clickDown}
          className="absolute -bottom-12 left-44 cursor-pointer"
        >
          <DownTwo
            theme="filled"
            size="32"
            fill="#8b5cf6"
            strokeWidth={3}
            strokeLinecap="square"
          />
        </div>
        {/* perspective 指定了观察者与 z=0 平面的距离，也就是透视关系 */}
        <div className="perspective-medium">
          <div
            id="rotate"
            className="relative preserve-3d transition duration-700 w-96 h-96 accelerate-3d"
          >
            <div className="w-96 h-96 absolute backface-hidden z-10 rotate-y-0">
              <img
                src={address}
                id="image"
                alt="图片加载失败"
                className="w-96 h-96"
              />
            </div>
            <div className="w-96 h-96 absolute backface-hidden rotate-y-180 text-3xl bg-violet-500 text-white flex justify-center items-center">
              <span>BackGround</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center mt-20">
        <input
          type="text"
          className="outline-none h-11 w-80 text-xl border border-solid rounded"
          value={inputValue}
          onChange={handleChange}
        />
        <NormalButton onClick={handleSrc}>替换</NormalButton>
      </div>
    </div>
  );
}

export default FlipImage;
