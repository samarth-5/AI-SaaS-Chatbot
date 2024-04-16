import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './Components/Header.jsx';
import Login from './Pages/Login.jsx';
import SignUp from './Pages/SignUp.jsx';
import Chat from './Pages/Chat.jsx';
import Home from './Pages/Home.jsx';
import NotFound from './Pages/NotFound.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />          
          <Route path='/signup' element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path='/chat' element={<Chat />} />
          </Route>
          <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
