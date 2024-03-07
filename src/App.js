import { Route, Routes } from "react-router-dom";
import Home from "./components/Home"; 
import Add from "./components/Add";
import Edit from "./components/Edit";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Add />} />
      <Route path="/update/:id" element={<Edit />}></Route>
    </Routes>
  );
}

export default App;