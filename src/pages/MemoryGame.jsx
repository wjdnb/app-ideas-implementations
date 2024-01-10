import {
  Poker,
  NintendoSwitch,
  Ghost,
  Game,
  Apple,
  WatermelonOne,
  Skull,
  Music,
  Press,
} from "@icon-park/react";
import { extractRotateValues, generateUUID, shuffle } from "../utils";
import { useState, useEffect } from "react";

function MemoryGame() {
  const [matchStack, setMatchStack] = useState([]);
  const [flipImage, setFlipImage] = useState([]);
  const [completedStack, setCompletedStack] = useState([]);
  const [timer, setTimer] = useState("");
  const [randomElement, setRandomElement] = useState([]);

  const componentsMap = {
    Poker: Poker,
    NintendoSwitch: NintendoSwitch,
    Ghost: Ghost,
    Game: Game,
    Apple: Apple,
    WatermelonOne: WatermelonOne,
    Skull: Skull,
    Music: Music,
    Press: Press,
  };

  const defaultIcon = (
    <Press
      theme="outline"
      size="96"
      fill="#333"
      strokeWidth={2}
      strokeLinecap="square"
    />
  );

  useEffect(() => {
    const iconName = [
      "Poker",
      "NintendoSwitch",
      "Ghost",
      "Game",
      "Apple",
      "WatermelonOne",
      // "Skull",
      // "Music",
    ];

    const shuffleArr = [...shuffle(iconName), ...shuffle(iconName)];

    const initialRandomElement = shuffleArr.map((item) => {
      // 这里需要的是一个组件而不是字符串，可以先用一个 map 映射一下

      const Component = componentsMap[item];
      const ComponentInstance = (
        <Component
          theme="outline"
          size="96"
          fill="#333"
          strokeWidth={2}
          strokeLinecap="square"
        />
      );
      return {
        id: generateUUID(),
        frontName: item,
        front: ComponentInstance,
        back: defaultIcon,
      };
    });

    setRandomElement(initialRandomElement);
  }, []);

  useEffect(() => {
    if (
      randomElement.length &&
      completedStack.length === randomElement.length
    ) {
      alert("bingo");
    }
  }, [completedStack]);

  const handleClick = (event, frontName, id) => {
    // 需要使用 currentTarget, 确保事件是在绑定了事件的元素触发
    let currentTarget = event.currentTarget;
    event.preventDefault();

    // 如果正在定时器事件内，不能点击
    if (timer) return;

    // 如果已经匹配成功则不能反转
    if (completedStack.includes(id)) return;

    rotateElement(currentTarget);

    // 检查匹配栈
    if (matchStack.length === 0) {
      let newElement = {
        target: currentTarget,
        frontName,
        id,
      };
      setMatchStack([newElement]);
    } else if (matchStack.length === 1) {
      let tempStack = [...matchStack];
      let matchElement = tempStack.pop();
      if (matchElement.frontName === frontName) {
        setCompletedStack([...completedStack, matchElement.id, id]);
        setMatchStack([]);
      } else {
        setMatchStack([]);

        const timer = setTimeout(() => {
          rotateElement(currentTarget);
          rotateElement(matchElement.target);
          clearTimeout(timer);
          setTimer("");
        }, 1000);

        setTimer(timer);
      }
    }
  };

  function rotateElement(currentTarget) {
    let transform = currentTarget.style.transform;

    let { rotateX, rotateY } = extractRotateValues(transform);
    currentTarget.style.transform = `rotateX(${rotateX}deg) rotateY(${
      rotateY - 180
    }deg)`;
  }

  return (
    <div className="grid grid-cols-4 grid-rows-4 gap-4 perspective-medium">
      {randomElement.map((item) => (
        <div
          key={item.id}
          onClick={(event) => handleClick(event, item.frontName, item.id)}
          className="w-36 h-40 border relative preserve-3d transition duration-700 accelerate-3d select-none"
        >
          <div className="w-36 h-40 flex justify-center items-center absolute backface-hidden z-10 rotate-y-0">
            {item.back}
          </div>
          <div className="w-36 h-40 flex justify-center items-center absolute backface-hidden rotate-y-180 text-3xl">
            {item.front}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MemoryGame;
