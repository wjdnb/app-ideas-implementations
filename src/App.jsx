// 1. 不能使用数组存储输入的二进制数
// 2. 如果输入错误给出错误提示
import { useState } from "react";
import { binaryValidate, bin2Dec } from "./utils";

function App() {
  const errorMap = new Map([["inputError", "Only 0 or 1 can be entered"]]);

  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);
  const [decimal, setDecimal] = useState();

  const handleInput = (event) => {
    event.preventDefault();

    let value = event.target.value;

    if (!value) {
      setDecimal("");
      setIsErrorMessageVisible(false);
      return;
    }

    let validate = binaryValidate(value);

    if (!validate) {
      setDecimal("");
      setErrorMessage(errorMap.get("inputError"));
      setIsErrorMessageVisible(true);
      return;
    }

    setIsErrorMessageVisible(false);

    setDecimal(bin2Dec(value));
  };

  return (
    <div className="text-center">
      <div className="text-4xl mt-64 font-mono tracking-tight">
        Binary to Decimal Converter
      </div>
      <div className="text-lg mt-3">Enter a binary number</div>
      <div className="text-base mb-3 text-red-600 h-6">
        {isErrorMessageVisible ? errorMessage : ""}
      </div>
      <input
        className="w-1/4 h-12 border rounded border-solid border-gray-400 outline-none text-3xl indent-1 round-md"
        type="text"
        onInput={handleInput}
        autoFocus
      />
      <div className="text-4xl m-8">{decimal}</div>
    </div>
  );
}

export default App;
