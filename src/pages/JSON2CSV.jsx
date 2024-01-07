// 1. 实现转换按钮，将 JSON 转换为 CSV
// 2. 实现清除按钮，一键清除文本框内的内容

// 3. 实现保存按钮，将 csv 文件保存到本地文件系统
// 4. 用户可以输入保存 csv 文件的路径
// 5. 实现打开按钮，可以读取 csv 文件并加载到文本框
// 6. 可以将 csv 数据转化为 JSON

import NormalButton from "../Components/Button";
import { useState, useEffect } from "react";
import { handleCopy } from "../utils";

function JSON2CSV() {
  const [originalData, setOriginalData] = useState("");
  const [transformData, setTransformData] = useState("");

  useEffect(() => {
    document
      .getElementById("file")
      .addEventListener("change", function (event) {
        let files = event.target.files;
        if (files.length === 0) {
          console.log("No file is selected");
          return;
        }

        let file = files[0];
        let reader = new FileReader();

        reader.onload = function (fileLoadEvent) {
          let content = fileLoadEvent.target.result;
          setOriginalData(content); // 假设你想将读取的内容设置为 originalData
        };

        reader.onerror = function (error) {
          console.log("Error reading file:", error);
        };

        reader.readAsText(file);
      });
  }, []);

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

    setTransformData(JSON.stringify(newArr));
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

    let CSV = `${key.join(",")}\n`;

    arr.forEach((item) => {
      CSV += `${Object.values(item).join(",")}\n`;
    });

    setTransformData(CSV);
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

  const clearData = () => {
    setOriginalData("");
    setTransformData("");
  };

  const handleReadFile = () => {
    document.getElementById("file").click();
  };

  const handleSaveFile = () => {
    let fileName = "store.txt";
    let fileContent = transformData;
    if (!transformData) {
      alert("没有保存内容");
      return;
    }

    let blob = new Blob([fileContent], { type: "text/plain" });
    let fileUrl = URL.createObjectURL(blob);

    let tempLink = document.createElement("a");
    tempLink.href = fileUrl;
    tempLink.download = fileName;
    document.body.appendChild(tempLink);
    tempLink.click();

    // 移除临时链接，并释放 blob URL
    document.body.removeChild(tempLink);
    URL.revokeObjectURL(fileUrl);
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
      <div className="flex justify-between">
        <div>
          <NormalButton onClick={clearData}>清除</NormalButton>
          <NormalButton onClick={handleReadFile}>读取文件</NormalButton>
          <input type="file" id="file" className="invisible" />
        </div>
        <div>
          <NormalButton onClick={() => handleCopy(transformData)}>
            复制
          </NormalButton>
          <NormalButton onClick={handleSaveFile}>保存到本地</NormalButton>
        </div>
      </div>
    </div>
  );
}

export default JSON2CSV;
