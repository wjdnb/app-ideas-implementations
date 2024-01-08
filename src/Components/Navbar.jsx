import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Navbar({ nav }) {
  // 文件名

  const [activeName, setActiveName] = useState("");

  const navigate = useNavigate();

  const handleRoute = (routeName) => {
    setActiveName(routeName);
    navigate(`/${routeName}`);
  };

  return (
    <div className="pl-32 pr-16 text-sm text-gray-600">
      {nav.map((item, index) => (
        <div
          key={index}
          onClick={() => handleRoute(item.routeName)}
          className={`h-6 leading-6 border-l ${
            item.routeName === activeName
              ? "border-l-gray-400 text-blue-700"
              : "border-l-gray-200"
          } cursor-pointer pl-4 hover:border-l-gray-400 hover:text-blue-700`}
        >
          {item.navName}
        </div>
      ))}
    </div>
  );
}

export default Navbar;
