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
  const [pendingCard, setPendingCard] = useState({});
  const [matchedCard, setMatchedCard] = useState([]);
  const [timer, setTimer] = useState("");
  const [cardList, setCardList] = useState([]);

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
      // "Ghost",
      // "Game",
      // "Apple",
      // "WatermelonOne",
      // "Skull",
      // "Music",
    ];

    const shuffleArr = [...shuffle(iconName), ...shuffle(iconName)];

    const initialRandomCard = shuffleArr.map((item) => {
      const Component = componentsMap[item]; // 这里需要的是一个组件而不是字符串，可以先用一个 map 映射一下
      const ComponentInstance = (
        <Component
          theme="outline"
          size="96"
          fill="#333"
          strokeWidth={2}
          strokeLinecap="square"
        />
      );

      const id = generateUUID();
      return {
        id,
        cardName: item,
        front: ComponentInstance,
        back: defaultIcon,
      };
    });

    setCardList(initialRandomCard);
  }, []);

  useEffect(() => {
    if (cardList.length && matchedCard.length === cardList.length) {
      setTimeout(() => {
        alert("bingo");
      }, 1000);
    }
  }, [matchedCard]);

  const handleClick = (event, cardName, id) => {
    event.preventDefault();

    let currentTarget = event.currentTarget; // 需要使用 currentTarget, 确保事件是在绑定了事件的元素触发

    if (timer) return; // 如果正在定时器执行时间内，不能点击

    if (matchedCard.includes(id)) return; // 如果已经匹配成功则不能旋转

    if (pendingCard.target === currentTarget) return; // 点击的对象是自己不能旋转

    rorateCard(currentTarget);

    // 检查匹配栈
    if (!Object.keys(pendingCard).length) {
      setPendingCard({
        id,
        cardName,
        target: currentTarget,
      });
    } else {
      if (pendingCard.cardName === cardName) {
        setMatchedCard([...matchedCard, pendingCard.id, id]);
        setPendingCard({});
      } else {
        setPendingCard({});

        const timer = setTimeout(() => {
          rorateCard(currentTarget);
          rorateCard(pendingCard.target);
          clearTimeout(timer);
          setTimer("");
        }, 1000);

        setTimer(timer);
      }
    }
  };

  function rorateCard(currentTarget) {
    let transform = currentTarget.style.transform;
    let { rotateX, rotateY } = extractRotateValues(transform);

    currentTarget.style.transform = `rotateX(${rotateX}deg) rotateY(${
      rotateY - 180
    }deg)`;
  }

  return (
    <div className="grid grid-cols-4 grid-rows-4 gap-4 perspective-medium">
      {cardList.map((item) => (
        <div
          key={item.id}
          onClick={(event) => handleClick(event, item.cardName, item.id)}
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
