import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import Primary from './Components/Primary/Primary';
import Second from './Components/Second/Second';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/Primary' element={<Primary/>} />
        <Route path='/Second' element={<Second/>} />
      </Routes>
    </Router> 
  )
}

export default App
