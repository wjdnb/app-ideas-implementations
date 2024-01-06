import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";

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
