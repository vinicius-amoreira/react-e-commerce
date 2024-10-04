import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex justify-center">
      <div className="w-[1024px] space-y-4">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
