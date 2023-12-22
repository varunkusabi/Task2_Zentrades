import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import DisplayData from './components/displayData';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/display' element={<DisplayData/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
