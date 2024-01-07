import { useState } from "react";
import { controlRange, handleCopy } from "../utils";
import NormalButton from "../Components/Button";

function BorderRadiusPreviewer() {
  const [radius, setRadius] = useState("30% 70% 75% 25% / 25% 50% 75% 50%"); // preset
  const [isDraggable, setIsDraggable] = useState(false);
  const [target, setTarget] = useState();
  const direction = {
    top: "x",
    left: "y",
    right: "y",
    bottom: "x",
  };

  function handleMouseDown(event) {
    event.preventDefault();

    setIsDraggable(true);
    setTarget(event.target);
  }

  function handleMouseMove(event) {
    event.preventDefault();
    if (!isDraggable) return;

    let axis = direction[target.id];
    if (isDraggable) {
      setPosition(axis, event);
    }
  }

  function setPosition(axis, event) {
    let element = event.target.parentNode;
    let elementPosition = element.getBoundingClientRect();
    let [a, b, c, d, connect, e, f, g, h] = radius.split(" "); // https://9elements.com/blog/css-border-radius-can-do-that/
    if (axis === "x") {
      let left = controlRange(
        98,
        -2,
        ((event.clientX - elementPosition.left - 8).toFixed(0) * 100) /
          elementPosition.width
      ).toFixed(0);
      left = left;
      target.style.left = `${left}%`;

      if (target.id === "top") {
        a = `${left}%`;
        b = `${100 - left}%`;
      } else if (target.id === "bottom") {
        d = `${left}%`;
        c = `${100 - left}%`;
      }
    } else if (axis === "y") {
      let top = controlRange(
        98,
        -2,
        ((event.clientY - elementPosition.top - 8).toFixed(0) * 100) /
          elementPosition.height
      ).toFixed(0);
      target.style.top = `${top}%`;

      if (target.id === "left") {
        e = `${top}%`;
        h = `${100 - top}%`;
      } else if (target.id === "right") {
        f = `${top}%`;
        g = `${100 - top}%`;
      }
    }

    let newRadius = `${a} ${b} ${c} ${d} ${connect} ${e} ${f} ${g} ${h}`;
    setRadius(newRadius);
  }

  function handleMouseUp(event) {
    event.preventDefault();
    setIsDraggable(false);
  }

  return (
    <div
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      className="flex flex-col items-center"
    >
      <div className="border-dashed border-gray-400 border-2 w-96 h-96">
        <div
          id="target"
          className="w-96 h-96 bg-gradient-to-r from-violet-500 to-fuchsia-500 relative"
          style={{ borderRadius: radius }}
        >
          <span
            id="top"
            onMouseDown={handleMouseDown}
            className="w-4 h-4 bg-slate-100 absolute -top-2 left-32 border-gray-400 border rounded"
          />
          <span
            id="bottom"
            onMouseDown={handleMouseDown}
            className="w-4 h-4  bg-slate-100 absolute -bottom-2 left-24 border-gray-400 border rounded"
          />
          <span
            id="left"
            onMouseDown={handleMouseDown}
            className="w-4 h-4  bg-slate-100 absolute top-24 -left-2 border-gray-400 border rounded"
          />
          <span
            id="right"
            onMouseDown={handleMouseDown}
            className="w-4 h-4  bg-slate-100 absolute bottom-48 -right-2 border-gray-400 border rounded"
          />
        </div>
      </div>
      <div className="text-center  m-16 flex items-center text-gray-100 font-medium">
        <span className="m-3 text-xl text-gray-700 ">border-radius:</span>
        <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-2 rounded text-xl">
          {radius}
        </span>
        <NormalButton onClick={() => handleCopy(radius)}>Copy</NormalButton>
      </div>
    </div>
  );
}

export default BorderRadiusPreviewer;
