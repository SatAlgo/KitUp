// import React from 'react';
// import Home from './home/Home';
// import Essentials from './components/courses/Essentials';
// import Mores from './content/Mores';


// import {Route, Routes} from "react-router-dom";
// import Signup from './components/Signup';
// import Assignments from './content/Assignments';
// import Notes from './content/Notes';
// import SupportUs from './content/SupportUs';
// import ToolKit from './content/ToolKit';
// import JoinUs from './content/JoinUs';
// import TT from './content/TT';
// import Games from './content/Games'
// import Profile from './components/Profile';
// import UploadItem from './components/UploadItem';

// function App() {
//   return (
//     <>

//       <div className="dark:bg-slate-900 dark:text-white">
//       <Routes>
//         <Route path="/" element={<Home/>}/>
//         <Route path="/Essentials" element={<Essentials/>}/>
//         <Route path="/Tools" element={<ToolKit/>}/>
//         <Route path="/signup" element={<Signup />}/>
//         <Route path="/Assignments" element={<Assignments/>} />
//         <Route path="/Notes" element={<Notes/>} />
//         <Route path="/mores" element={<Mores/>} />
//         <Route path="/SupportUs" element={<SupportUs />} />
//         <Route path="/JoinUs" element={<JoinUs />} />
//         {/* <Route path="/TimeTable" element={<Timetable />} /> */}
//         <Route path="/TT" element={<TT />} />
//         <Route path="/TableTT" element={<TT />} />
//         <Route path="/Games" element={<Games />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/upload-item" element={<UploadItem />} />
//       </Routes>
//       </div>
      
      
//     </>
//   );
// }

// export default App;


import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from './home/Home';
import Essentials from './components/courses/Essentials';
import Mores from './content/Mores';
import Signup from './components/Signup';
import Assignments from './content/Assignments';
import Notes from './content/Notes';
import SupportUs from './content/SupportUs';
import ToolKit from './content/ToolKit';
import JoinUs from './content/JoinUs';
import TT from './content/TT';
import Games from './content/Games';
import Profile from './components/Profile';
import UploadItem from './components/UploadItem';

function App() {
  const navigate = useNavigate();
  const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 Minutes

  useEffect(() => {
    const checkInactivity = () => {
      // Check for user in sessionStorage (linked to tab session)
      const data = sessionStorage.getItem("KitUp_User");
      if (!data) return;

      const user = JSON.parse(data);
      const currentTime = Date.now();

      // If inactive for more than 30 mins
      if (currentTime - user.lastActive > INACTIVITY_LIMIT) {
        sessionStorage.removeItem("KitUp_User");
        alert("Your session has expired due to 30 minutes of inactivity.");
        window.location.href = "/"; // Force redirect to home/login
      }
    };

    const updateActivity = () => {
      const data = sessionStorage.getItem("KitUp_User");
      if (data) {
        const user = JSON.parse(data);
        user.lastActive = Date.now(); // Update the timestamp
        sessionStorage.setItem("KitUp_User", JSON.stringify(user));
      }
    };

    // 1. Check for timeout every minute
    const interval = setInterval(checkInactivity, 60000);

    // 2. Event listeners to detect activity and reset timer
    window.addEventListener("mousemove", updateActivity);
    window.addEventListener("click", updateActivity);
    window.addEventListener("keydown", updateActivity);
    window.addEventListener("scroll", updateActivity);

    // Cleanup listeners on unmount
    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("click", updateActivity);
      window.removeEventListener("keydown", updateActivity);
      window.removeEventListener("scroll", updateActivity);
    };
  }, []);

  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white min-h-screen transition-colors duration-300">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Essentials" element={<Essentials/>}/>
          <Route path="/Tools" element={<ToolKit/>}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/Assignments" element={<Assignments/>} />
          <Route path="/Notes" element={<Notes/>} />
          <Route path="/mores" element={<Mores/>} />
          <Route path="/SupportUs" element={<SupportUs />} />
          <Route path="/JoinUs" element={<JoinUs />} />
          <Route path="/TT" element={<TT />} />
          <Route path="/TableTT" element={<TT />} />
          <Route path="/Games" element={<Games />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload-item" element={<UploadItem />} />
        </Routes>
      </div>
    </>
  );
}

export default App;