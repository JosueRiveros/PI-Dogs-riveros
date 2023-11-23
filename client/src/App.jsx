import { Route, Routes, useLocation } from "react-router-dom";

import Detail from "./vistas/detail/detail";
import Form from "./vistas/form/form";
import Home from "./vistas/home/home";
import LandingPage from "./vistas/landingPage/landingPage";
import Nav from "./components/Nav/nav";


import "./App.css";

function App() {
  const location = useLocation();
  return (
    <div>
      
      {location.pathname !== "/" && <Nav />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<Form />} /> 
      </Routes>
    </div>
  );
}

export default App;

