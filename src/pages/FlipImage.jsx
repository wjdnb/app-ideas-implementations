import { useState, useEffect } from "react";
import { UpTwo, DownTwo, RightTwo, LeftTwo } from "@icon-park/react";
import NormalButton from "../Components/Button";

function FlipImage() {
  const [address, setAddress] = useState(
    "https://images.pexels.com/photos/2335126/pexels-photo-2335126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  );

  const [inputValue, setInputValue] = useState(
    "https://images.pexels.com/photos/2335126/pexels-photo-2335126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  );

  const [isRotating, setIsRotating] = useState(false); // 控制在旋转过程中不能重复点击

  const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });

  useEffect(() => {
    let image = document.getElementById("image");

    const handleError = () => alert("链接错误");

    image.addEventListener("error", handleError);

    return () => {
      image.removeEventListener("error", handleError);
    };
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleRotate = (axis, degrees) => {
    if (!isRotating) {
      setIsRotating(true);
      setRotation((prevRotation) => {
        const newRotation = {
          rotateX: prevRotation.rotateX,
          rotateY: prevRotation.rotateY,
        };

        if (axis === "x") {
          newRotation.rotateX += degrees;
        } else {
          newRotation.rotateY += degrees;
        }

        return newRotation;
      });
    }
  };

  const handleTransitionEnd = () => {
    setIsRotating(false);
  };

  const clickUp = () => handleRotate("x", 180);

  const clickDown = () => handleRotate("x", -180);

  const clickLeft = () => handleRotate("y", -180);

  const clickRight = () => handleRotate("y", 180);

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
            style={{
              transform: `rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg)`,
            }}
            onTransitionEnd={handleTransitionEnd}
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
        <NormalButton onClick={() => setAddress(inputValue)}>替换</NormalButton>
      </div>
    </div>
  );
}

export default FlipImage;
