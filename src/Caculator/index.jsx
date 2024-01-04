// 1. 用户可以看到显示屏显示当前输入的数字或上次操作的结果
// 2. 用户可以看到一个输入板，其中包含数字 0-9 的按钮、操作 -“+”、“-”、“/”和“=”、“C”按钮（用于清除）和“AC”按钮（清除所有）。
// 3. 用户可以通过单击输入键盘中​​的数字来输入最多 8 位数字的序列。输入任何超过 8 位的数字将被忽略。
// 4. 可以用 C 键清除最后一个操作，用 AC 清空所有操作
// 5. 若超过 8位数，提示 ERR
// 6. 专门有一个按钮更改当前数字的正负
// 7. 包含小数点，可以进行小数运算

import { useState, useEffect } from "react";
import { isNumber } from "../utils";

function Calculator() {
  let arr = [
    ["AC", "C", "+/-", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  let [result, setResult] = useState(0);
  let [display, setDisplay] = useState("");
  let [inputStack, setInputStack] = useState([]);
  let [clearResult, setClearResult] = useState(false);
  let [currentSymbol, setCurrentSymbol] = useState(null);
  useEffect(() => {
    if (!inputStack.length) {
      setDisplay("");
    } else {
      let str = [...inputStack].join("");
      setDisplay(str);
    }

    if (currentSymbol !== null) {
      processSymbol(currentSymbol);
      setCurrentSymbol(null);
    }
  }, [inputStack, currentSymbol]);

  function isOperator(operator) {
    let set = new Set(["+", "-", "*", "/"]);
    return set.has(operator);
  }

  function handleClick(symbol) {
    addSymbol(symbol);
  }

  function calculate() {
    let stack = [...inputStack].filter((item) => item !== "");
    let newStack = [];
    let str = "";
    for (let symbol of stack) {
      if (isNumber(symbol)) {
        str += symbol;
      } else if (isOperator(symbol)) {
        newStack.push(str, symbol);
        str = "";
      }
    }

    if (str.length) newStack.push(str);

    // 转换中序表达式为逆波兰表达式
    let RPNStack = transformRPN(newStack);
    // 使用逆波兰表达式求值
    let value = calculateRPN(RPNStack);

    setResult(value);
    setClearResult(true);
  }

  // 没有涉及到括号运算
  function transformRPN(arr) {
    let stack = [];
    let operatorStack = [];

    let priority = {
      "+": 1,
      "-": 1,
      "*": 2,
      "/": 2,
    };

    for (let symbol of arr) {
      if (isNumber(symbol)) {
        stack.push(symbol);
      } else if (isOperator(symbol)) {
        while (
          operatorStack.length > 0 &&
          priority[operatorStack[operatorStack.length - 1]] >= priority[symbol]
        ) {
          stack.push(operatorStack.pop());
        }
        operatorStack.push(symbol);
      }
    }

    while (operatorStack.length) {
      stack.push(operatorStack.pop());
    }

    return stack;
  }

  function calculateRPN(arr) {
    let stack = [];

    let operator = {
      "+": (num1, num2) => num1 + num2,
      "-": (num1, num2) => num1 - num2,
      "*": (num1, num2) => num1 * num2,
      "/": (num1, num2) => num1 / num2,
    };

    for (const item of arr) {
      if (isNumber(item)) {
        stack.push(item);
      } else if (isOperator(item)) {
        let num1 = Number(stack.pop());
        let num2 = Number(stack.pop());
        if (operator[item]) {
          let result = operator[item](num2, num1);
          stack.push(result);
        }
      }
    }

    return stack[0];
  }

  function reset() {
    setInputStack([]);
    setResult(0);
  }

  function addSymbol(symbol) {
    if (clearResult) {
      setClearResult(false);
      if (isNumber(symbol)) {
        reset();
      } else {
        let newStack = result.toString().split("");
        setResult(0);
        setInputStack(newStack);
        setCurrentSymbol(symbol);
      }
    } else {
      setCurrentSymbol(symbol);
    }
  }

  function processSymbol(symbol = "") {
    if (!symbol) return;

    let newArr = [...inputStack];
    symbol = symbol.toLowerCase();
    let lastSymbol = newArr.pop() || "";

    if (isOperator(symbol)) {
      if (isOperator(lastSymbol)) {
        setInputStack([...newArr, symbol]);
      } else {
        setInputStack([...newArr, lastSymbol, symbol]);
      }
    } else if (symbol === "ac") {
      reset();
    } else if (symbol === "c") {
      setInputStack(newArr);
    } else if (isNumber(symbol)) {
      setInputStack([...newArr, lastSymbol, symbol]);
    } else if (symbol === "=") {
      calculate();
    }
  }

  return (
    <div className="w-96">
      <div className="text-right mb-6 text-6xl overflow-x-scroll whitespace-nowrap h-16">
        {display}
      </div>
      <div className="text-right mb-6 text-6xl h-16">{result}</div>
      <div className="grid grid-cols-4 gap-4 place-items-center grid-flow-row text-3xl">
        {arr.map((row) =>
          row.map((symbol) => {
            if (symbol === "0") {
              return (
                <div
                  key={symbol}
                  className="h-20 col-span-2 w-full bg-slate-200 hover:bg-slate-300 active:scale-95 flex justify-center items-center rounded-xl cursor-pointer select-none"
                  onClick={() => handleClick(symbol)}
                >
                  {symbol}
                </div>
              );
            } else {
              return (
                <div
                  key={symbol}
                  className="w-full h-20 bg-slate-200 hover:bg-slate-300 active:scale-95 flex justify-center items-center rounded-xl cursor-pointer select-none"
                  onClick={() => handleClick(symbol)}
                >
                  {symbol}
                </div>
              );
            }
          })
        )}
      </div>
    </div>
  );
}

export default Calculator;
