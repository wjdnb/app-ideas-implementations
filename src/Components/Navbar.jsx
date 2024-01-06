import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  // 文件名
  let name = [
    "BorderRadiusPreviewer",
    "Bin2Dec",
    "Calculator",
    "CountdownTimer",
    "JSON2CSV",
  ];

  // 路由名
  let routeName = [
    "border-radius-previewer",
    "bin-to-dec",
    "calculator",
    "countdown-timer",
    "json-to-csv",
  ];

  const [activeName, setActiveName] = useState("");

  const navigate = useNavigate();

  const transformDisplayName = (str) => {
    // Replace camel case with space and '2' with ' To '
    return str.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/2/g, " to ");
  };

  const list = name.map((item, index) => {
    return {
      routeName: routeName[index],
      diaplayName: transformDisplayName(item),
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
