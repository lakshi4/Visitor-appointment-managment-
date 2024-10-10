// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './App.css';

import Navbar from './component/navbar';
import AddAppointment from './component/AddAppointment';
import AllAppointment from './component/AllAppointment';
import EditAppointment from './component/EditAppointment';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
 

  return (
    <Router>
      <div>
        <Navbar /> 

        <Routes>
          <Route path="/add" element={<AddAppointment />} />
          <Route path="/update/:appointmentID" element={<EditAppointment />} />
          <Route path="/" element={<AllAppointment />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
