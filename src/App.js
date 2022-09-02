import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./utils/Home";
import Todo from "./utils/Todo";
import Films from "./utils/Films";
import NavBar from "./components/UI/Navbar/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/todo' element={<Todo />} />
        <Route path='/films' element={<Films />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
