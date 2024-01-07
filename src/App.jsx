import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Header />
      <div className="flex h-screen w-screen pt-16">
        <Navbar />
        <div className="flex justify-center flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
