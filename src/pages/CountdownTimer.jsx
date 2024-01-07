import { useState, useEffect } from "react";
import NormalButton from "../Components/Button";
// 1. 实现1个表单，包括事件名，日期，具体时间，开始按钮
// 2. 验证输入项，如果事件名称为空，输入日期错误，时间错误会警告
// 3. 点击开始开始倒计时
// 4. 倒计时时间到后可获得提示
// 5. 可以同时开始多个倒计时

function CountdownTimer() {
  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    time: "",
  });
  const [list, setList] = useState([]);

  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / 1000 / 3600) % 24);
    const days = Math.floor(time / 1000 / 3600 / 24);
    return `${days} 天 ${hours} 时 ${minutes} 分 ${seconds} 秒`;
  };

  const updateCountdowns = () => {
    const updatedList = list.map((item) => {
      const currentTime = new Date().getTime();
      const remainingTime = item.eventTime - currentTime;
      const displayTime =
        remainingTime > 0 ? formatTime(remainingTime) : "时间到!";
      return { ...item, displayTime };
    });
    setList(updatedList);
  };
  useEffect(() => {
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, [list]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const { eventName, date, time } = formData;

    if (!eventName || !date || !time) {
      alert("填写所有字段");
      return;
    }

    const eventTime = new Date(`${date}T${time}`).getTime();
    const currentTime = new Date().getTime();
    const remainingTime = currentTime - eventName;
    if (remainingTime < 0) {
      alert("请选择一个未来的时间");
      return;
    }

    let newList = [];

    const displayTime = formatTime(remainingTime);

    if (!list.length) {
      newList.push({
        id: Date.now(),
        eventName,
        eventTime,
        displayTime,
      });
    } else {
      newList = [...list].map((item) => {
        if (item.eventName === eventName) {
          return { ...item, eventName, eventTime, displayTime };
        } else {
          return { eventName, eventTime, displayTime };
        }
      });
    }

    setFormData({ eventName: "", date: "", time: "" }); // 重置表单
    setList(newList);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <form
        className="grid grid-cols-2 place-items-center text-xl gap-6"
        onSubmit={handleSubmit}
      >
        <div>事件名</div>
        <input
          type="text"
          autoFocus
          className="outline-none border border-gray-400"
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
        />
        <div>日期</div>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <div>时间</div>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
        <NormalButton type="submit">开始</NormalButton>
      </form>

      <div>
        {list.map((item) => {
          return (
            <div className="flex justify-around pt-10" key={item.id}>
              <div className="flex items-center">
                <div className="text-5xl pr-8">{item.eventName}</div>
                <div className="text-6xl p-1">{item.displayTime}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CountdownTimer;
