// 改变 Dom 位置

import { useEffect } from "react";
import ReactDOM from "react-dom";
const Portal = ({ children }) => {
  const el = document.createElement("div");

  useEffect(() => {
    document.body.appendChild(el);

    return () => {
      document.body.removeChild(el);
    };
  }, [el]);

  // 这里不能用 el.appendChild(children) 这个方法是操作dom，不是 jsx
  return ReactDOM.createPortal(children, el); // 把元素插入到指定节点内
};

export default Portal;
