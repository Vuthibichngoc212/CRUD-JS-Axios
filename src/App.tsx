import { Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import { Home } from "./components/Home";

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
