import React, { useEffect } from 'react'
import { BrowserRouter,Routes, Route, Navigate  } from 'react-router-dom'

import Login from './components/Login'
import Gallery from './components/Gallery';
import './App.css';
import userpool from './userpool';
import UserGallery from './components/UserGallery';




function App() {

  useEffect(()=>{
    let user=userpool.getCurrentUser();
      if(user){
        <Navigate to="/adminview" replace />
      }
  },[]);

  return (

   
    <BrowserRouter>
      <Routes>
       
        <Route path='/' element={<Login />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/gallery' element={<Gallery/>}/>
        <Route path='/usergallery' element={<UserGallery/>}/>
      </Routes>
    </BrowserRouter>

    
  );
}

export default App;