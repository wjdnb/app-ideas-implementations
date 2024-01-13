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
import { generateUUID, shuffle } from "../utils";
import { useState, useEffect } from "react";

function MemoryGame() {
  const [pendingCard, setPendingCard] = useState({});
  const [matchedCard, setMatchedCard] = useState([]);
  const [timer, setTimer] = useState("");
  const [cardRotateState, setCardRotateState] = useState({});
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

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    const rotateState = initCardList();
    initCardRotateState(rotateState);
  };

  const initCardList = () => {
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

    const defaultIcon = (
      <Press
        theme="outline"
        size="96"
        fill="#333"
        strokeWidth={2}
        strokeLinecap="square"
      />
    );

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

    return initialRandomCard;
  };

  const initCardRotateState = (rotateList) => {
    const rotateState = {};
    rotateList.forEach((item) => {
      rotateState[item.id] = { rotateX: 0, rotateY: 0 };
    });
    setCardRotateState(rotateState);
  };

  useEffect(() => {
    if (
      cardList.length &&
      matchedCard.length &&
      matchedCard.length === cardList.length
    ) {
      const timer = setTimeout(() => {
        alert("bingo");

        initCardRotateState(cardList); // 旋转回到正面

        let resetTimer = setTimeout(() => {
          init();
          setMatchedCard([]);
          clearTimeout(resetTimer);
        }, 1000);
        clearTimeout(timer);
      }, 1000);
    }
  }, [matchedCard]);

  const handleClick = (cardName, id) => {
    if (timer) return; // 如果正在定时器执行时间内，不能点击

    if (matchedCard.includes(id)) return; // 如果已经匹配成功则不能旋转

    if (pendingCard.id === id) return; // 点击的对象是自己不能旋转

    rorateCard(id);

    // 检查匹配栈
    if (!Object.keys(pendingCard).length) {
      setPendingCard({
        id,
        cardName,
      });
    } else if (pendingCard.cardName === cardName) {
      setMatchedCard([...matchedCard, pendingCard.id, id]);
      setPendingCard({});
    } else {
      setPendingCard({});

      const timer = setTimeout(() => {
        rorateCard(id);
        rorateCard(pendingCard.id);
        clearTimeout(timer);
        setTimer("");
      }, 1000);

      setTimer(timer);
    }
  };

  function rorateCard(id) {
    setCardRotateState((prev) => {
      return {
        ...prev,
        [id]: { ...prev[id], rotateY: prev[id].rotateY - 180 },
      };
    });
  }

  return (
    <div className="grid grid-cols-4 grid-rows-4 gap-4 perspective-medium">
      {cardList.map((item) => (
        <div
          key={item.id}
          onClick={() => handleClick(item.cardName, item.id)}
          className="w-36 h-40 border relative preserve-3d transition duration-700 accelerate-3d select-none"
          style={{
            transform: `rotateX(${
              cardRotateState[item.id]?.rotateX || 0
            }deg) rotateY(${cardRotateState[item.id]?.rotateY || 0}deg)`,
          }}
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
