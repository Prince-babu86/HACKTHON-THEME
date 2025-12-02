import React from "react";
import Login from "./pages/auth/Login";
import SignUpPage from "./pages/auth/Signup";
import MainRoute from "./routes/MainRoute";
import ChatNavbar from "./components/Navbar";
import Menubar from "./components/Menubar";
import Navbar from "./components/Navbar";
import UsersList from "./components/Users";

const App = () => {
  return (
    <div className="min-h-screen w-full  ">
      <div className="">
        {/* <Navbar/> */}
        <Menubar />
      </div>
      <div className="flex   ml-20 ">
        <MainRoute />
      </div>
    </div>
  );
};

export default App;
