import './App.css';
import {  Routes, Route } from "react-router-dom";
import Homepage from './UI/Homepage';
import Sidebar from './UI/Sidebar';
import Attendance from './employee/Attendance';
import ManagerDashboard from './manager/ManagerDashboard';
import ShowAttendance from './manager/ShowAttendance';
import EmployeeDashboard from './employee/EmployeeDashboard';

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");

  return (
    <div>
       {isLoggedIn === "true" && <Sidebar/> }
      <Routes>
      <Route path="/home" element={<Homepage />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/mdashboard" element={<ManagerDashboard />} />
      <Route path="/show-attendance" element={<ShowAttendance />} />
      <Route path="/emp-dashboard" element={<EmployeeDashboard />} />


      </Routes>
    </div>
  
  );
}

export default App;
