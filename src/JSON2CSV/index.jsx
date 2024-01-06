// 1. 实现转换按钮，将 JSON 转换为 CSV
// 2. 实现清除按钮，一键清除文本框内的内容

// 3. 实现保存按钮，将 csv 文件保存到本地文件系统
// 4. 用户可以输入保存 csv 文件的路径
// 5. 实现打开按钮，可以读取 csv 文件并加载到文本框
// 6. 可以将 csv 数据转化为 JSON

import NormalButton from "../Components/Button";
import { useState } from "react";

function JSON2CSV() {
  const [originalData, setOriginalData] = useState("");
  const [transformData, setTransformData] = useState("");

  // 判断数据类型
  const getDataType = (str) => {
    if (isCSV(str)) return "CSV";
    if (isJSON(str)) return "JSON";

    return "error";
  };

  const isCSV = (str) => {
    let rows = str.split("\n");
    if (!rows.length) return;

    let commas = rows[0].split(",")?.length;
    if (!commas) return;

    for (let i = 1; i < rows.length; i++) {
      if (rows[i].split(",").length !== commas) {
        return false;
      }
    }

    return true;
  };

  const isJSON = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  function handleCSV2JSON() {
    let str = originalData;

    if (!isCSV(str)) alert("数据格式错误，检查数据格式");

    let arr = str.split("\n").filter((item) => item);
    if (!arr.length) return;

    let property = arr[0];

    let newArr = [];

    for (let i = 1; i < arr.length; i++) {
      let obj = {};

      for (let j = 0; j < property.length; j++) {
        if (property[j] && property[j] !== ",") {
          obj[property[j]] = arr[i][j];
        }
      }

      newArr.push(obj);
    }

    console.log(newArr);
  }

  function handleJSON2CSV() {
    let str = originalData;

    if (!isJSON(str)) alert("数据格式错误，检查数据格式");

    const obj = JSON.parse(str);

    let arr = [];
    let key = [];

    for (let [id, value] of Object.entries(obj)) {
      arr.push(value);

      if (!key.length) {
        key = Object.keys(value);
      }
    }

    console.log(key);
    let CSV = `${key.join(",")}\n`;
    console.log(CSV);
    arr.forEach((item) => {
      CSV += `${Object.values(item).join(",")}\n`;
    });
  }

  function handleClick(type) {
    if (type === "CSV") {
      handleCSV2JSON();
    } else if (type === "JSON") {
      handleJSON2CSV();
    }
  }

  const handleChange = (e) => {
    setOriginalData(e.target.value);
  };

  return (
    <div>
      <div className="flex items-center text-gray-600">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          className="outline-none border border-solid border-gray-400 rounded"
          placeholder="输入 JSON 或 CSV"
          value={originalData}
          onChange={handleChange}
        ></textarea>
        <div className="p-8 flex flex-col">
          <NormalButton onClick={() => handleClick("CSV")}>
            CSV to JSON -&gt;
          </NormalButton>
          <NormalButton onClick={() => handleClick("JSON")}>
            JSON to CSV -&gt;
          </NormalButton>
        </div>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          className="outline-none border border-solid border-gray-400 rounded"
          value={transformData}
          readOnly
        ></textarea>
      </div>
      <NormalButton>清除</NormalButton>
      <NormalButton>复制</NormalButton>
      <NormalButton>读取文件</NormalButton>
      <NormalButton>保存到本地</NormalButton>
    </div>
  );
}

export default JSON2CSV;
