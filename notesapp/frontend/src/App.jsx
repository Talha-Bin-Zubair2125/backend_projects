import { useState } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import  Login  from './pages/Login';
import Register  from './pages/Register';
import User_profile from './pages/user_profile';
import Updateprofile from './pages/updateprofile';
import Addnotes from './pages/addnotes';
import Getnotes from './pages/getnotes';
import Updatenotes from './pages/updatenotes';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/profile' element={<User_profile />} />
          <Route path='/updateprofile' element={<Updateprofile />} />
          <Route path='/addnotes' element={<Addnotes />} />
          <Route path='/getnotes' element={<Getnotes />} />
          <Route path='/updatenotes/:id' element={<Updatenotes />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
