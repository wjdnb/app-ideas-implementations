import { Outlet } from "react-router-dom";
import Title from "./components/title";
import Navbar from "./components/Navbar";
import { navbar as data } from "./utils/data";

function App() {
  return (
    <div className="relative">
      <Title />
      <div className="flex pt-32">
        <Navbar nav={data} />
        <div className="flex justify-center flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
