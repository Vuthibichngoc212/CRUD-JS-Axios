import { Route, Routes } from "react-router-dom";
import Home from "./components/Home"; 
import Form from "./components/Form";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Form mode='create' />} />
      <Route path="/update/:id" element={<Form mode = 'update' />}></Route>
    </Routes>
  );
}

export default App;