import React from 'react';
import Home from './home/Home';
import Essentials from './components/courses/Essentials';
import Mores from './content/Mores';
import EmailVerification from './components/EmailVerification';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ProtectedRoute from './components/common/ProtectedRoute';

import {Route, Routes} from "react-router-dom";
import Signup from './components/Signup';
import Assignments from './content/Assignments';
import Notes from './content/Notes';
import SupportUs from './content/SupportUs';
import ToolKit from './content/ToolKit';
import JoinUs from './content/JoinUs';
import TT from './content/TT';
import Games from './content/Games'

function App() {
  return (
    <div className="dark:bg-slate-900 dark:text-white">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/verify-email/:token" element={<EmailVerification />}/>
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/reset-password" element={<ResetPassword />}/>
        <Route path="/Essentials" element={<Essentials/>}/>
        <Route path="/Tools" element={<ToolKit/>}/>
        <Route path="/Assignments" element={<Assignments/>} />
        <Route path="/Notes" element={<Notes/>} />
        <Route path="/mores" element={<Mores/>} />
        <Route path="/SupportUs" element={<SupportUs />} />
        <Route path="/JoinUs" element={<JoinUs />} />
        <Route path="/TT" element={<TT />} />
        <Route path="/TableTT" element={<TT />} />
        <Route path="/Games" element={<Games />} />
      </Routes>
    </div>
  );
}

export default App;
