import React from 'react';
import {Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/signup';

export default function Pages(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' exact element={<Login />} />
                <Route path='/login'  element={<Login />} />
                <Route path='/signup' element={<SignUp />}/>
            </Routes> 
        </BrowserRouter>
    )
}