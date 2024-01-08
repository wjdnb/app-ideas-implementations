import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { navbar as data } from "./utils/data";

function App() {
  return (
    <div>
      <Header />
      <div className="flex h-screen w-screen pt-16">
        <Navbar nav={data} />
        <div className="flex justify-center flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
