import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Document from "./pages/Document";

function App() {
  return (
    <div className="">

      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/document" element={<Document/>} />
      </Routes>
  
    </div>
  );
}

export default App;
