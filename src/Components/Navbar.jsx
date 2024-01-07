import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  // 文件名
  let name = [
    "Border Radius Previewer",
    "Bin to Dec",
    "Calculator",
    "Countdown Timer",
    "JSON to CSV",
    "Dynamic CSS Var",
  ];

  // 路由名
  let routeName = [
    "border-radius-previewer",
    "bin-to-dec",
    "calculator",
    "countdown-timer",
    "json-to-csv",
    "dynamic-css-var",
  ];

  const [activeName, setActiveName] = useState("");

  const navigate = useNavigate();

  const list = name.map((item, index) => {
    return {
      routeName: routeName[index],
      diaplayName: item,
    };
  });

  const handleRoute = (routeName) => {
    setActiveName(routeName);
    navigate(`/${routeName}`);
  };

  return (
    <div className="pl-32 pr-16 text-sm text-gray-600">
      {list.map((item, index) => (
        <div
          key={index}
          onClick={() => handleRoute(item.routeName)}
          className={`h-6 leading-6 border-l ${
            item.routeName === activeName
              ? "border-l-gray-400 text-blue-700"
              : "border-l-gray-200"
          } cursor-pointer pl-4 hover:border-l-gray-400 hover:text-blue-700`}
        >
          {item.diaplayName}
        </div>
      ))}
    </div>
  );
}

export default Navbar;
