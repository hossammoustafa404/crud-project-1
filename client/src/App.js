import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import NewUser from "./pages/new-user/NewUser";
import Header from "./components/header/Header";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element=<Home /> />
        <Route path="/newuser/:userId?" element=<NewUser /> />
      </Routes>
    </>
  );
};

export default App;
