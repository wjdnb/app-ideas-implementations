import { Pencil, Erase, Download, FontSize, Clear } from "@icon-park/react";
import { useState, useRef, useEffect } from "react";

function Draw() {
  const [iconKit] = useState({
    Pencil: Pencil,
    Erase: Erase,
    Clear: Clear,
    FontSize: FontSize,
    Download: Download,
  });

  const canvasRef = useRef(null);
  const ctxRef = useRef(null); // 用于存储 canvas 上下文
  const [selectedIndex, setselectedIndex] = useState(-1);
  const [isPainting, setIsPainting] = useState(false);
  const [earsing, setEarsing] = useState(false);
  const [type, setType] = useState();

  const [lineStyle, setLineStyle] = useState({
    lineCap: "round", // 线条端点样式
    strokeStyle: "white", // 线条颜色
    lineWidth: 3, // 线条宽度
  });

  useEffect(() => {
    ctxRef.current = canvasRef.current.getContext("2d");
  }, []);

  useEffect(() => {
    const ctx = ctxRef.current;
    ctx.lineCap = lineStyle.lineCap;
    ctx.strokeStyle = lineStyle.strokeStyle;
    ctx.lineWidth = lineStyle.lineWidth;
  }, [lineStyle]);

  const handleClick = (name, index) => {
    setselectedIndex(index);
    setType(name);

    const ctx = ctxRef.current;

    if (name === "Pencil") {
      setLineStyle({
        ...lineStyle,
        strokeStyle: "black",
        lineWidth: 3,
      });
    } else if (name === "Erase") {
      setLineStyle({
        ...lineStyle,
        strokeStyle: "white",
        lineWidth: 20,
      });
    } else if (name === "FontSize") {
    } else if (name === "Clear") {
      ctx.reset();
    } else if (name === "Download") {
      const image = canvasRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "canvas-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleMouseUp = () => {
    setIsPainting(false);
    setEarsing(false);

    const ctx = ctxRef.current;
    ctx.beginPath(); // 重置路径，并移动到鼠标点击的位置
  };

  const handleMouseDown = () => {
    if (type === "Pencil") {
      setIsPainting(true);
    } else if (type === "Erase") {
      setEarsing(true);
    }
  };

  const handleMouseMove = (e) => {
    if (type === "Pencil") {
      if (!isPainting) return;

      const ctx = ctxRef.current;
      const x = e.clientX - canvasRef.current.offsetLeft;
      const y = e.clientY - canvasRef.current.offsetTop;

      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (type === "Erase") {
      if (!earsing) return;

      const ctx = ctxRef.current;
      const x = e.clientX - canvasRef.current.offsetLeft;
      const y = e.clientY - canvasRef.current.offsetTop;

      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const handleMouseLeave = () => {
    const ctx = ctxRef.current;
    ctx.beginPath(); // 重置路径，并移动到鼠标点击的位置

    setIsPainting(false);
    setEarsing(false);
  };

  return (
    <div className="grid justify-items-center">
      <div className="grid grid-cols-5 justify-items-center w-96 mb-4">
        {Object.keys(iconKit).map((name, index) => {
          const Icon = iconKit[name];

          return (
            <div
              className={`cursor-pointer flex justify-center items-center w-10 h-10 relative rounded ${
                index === selectedIndex ? "bg-slate-200" : "hover:bg-slate-200"
              }`}
              key={name}
              onClick={() => handleClick(name, index)}
            >
              <Icon
                theme="outline"
                size="24"
                fill="#333"
                strokeWidth={3}
                strokeLinecap="square"
              />
            </div>
          );
        })}
      </div>

      <div>
        <canvas
          ref={canvasRef}
          width="1000"
          height="600"
          className="border border-slate-600"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        ></canvas>
      </div>
    </div>
  );
}

export default Draw;
