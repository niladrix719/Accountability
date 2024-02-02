import logo from './logo.svg';
import Home from './pages/Home';
import './App.css';
import '@ionic/react/css/core.css';
import { setupIonicReact } from '@ionic/react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Team from './pages/Team';
import Register from './pages/Register';
import Navbar from './pages/Navbar';
import Project from './pages/Project';
import Profile from './pages/Profile';
import Footer from './pages/Footer';
import Assignment from './pages/Assignment';
import Progress from './pages/Progress';
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/login" element={<Login />}/>
          <Route path ="/signup" element={<Signup />}/>
          <Route path='/team' element={<Team/>}/>
          <Route path ='/register' element={<Register/>}/>
          <Route path='/project' element={<Project/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/assignment' element={<Assignment/>}/>
          <Route path='/progress' element={<Progress/>}/>
        </Routes>
      </Router>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
