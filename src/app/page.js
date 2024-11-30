"use client";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/navbar";
import Registration from "./components/registration";

export default function Home() {
  return (
    <Router>
      <Navbar/>
      <div className='content' >
        <Routes>
          <Route path="/registration" element={<Registration/>} />
        </Routes>
      </div>
    </Router>
  );
}
