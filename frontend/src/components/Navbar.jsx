// import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import Login from "./Login";
// import pic from "../../public/kk.jpg";

// function Navbar() {

//   // added letter for login  
//   const [user, setUser] = useState(
//     JSON.parse(localStorage.getItem("KitUp_User"))
//   );

//   useEffect(() => {
//     setUser(JSON.parse(localStorage.getItem("KitUp_User")));
//   }, []);

//   const getInitials = (user) => {
// if (!user) return "??";

// // Check if firstName and lastName exist separately
// if (user.firstName && user.lastName) {
//     return (user.firstName[0] + user.lastName[0]).toUpperCase();
// }

// // If the backend sent a single "name" string (e.g., "Satyam Sharma")
// if (user.name) {
//     const nameParts = user.name.trim().split(" ");
//     if (nameParts.length >= 2) {
//     // Takes first letter of first part and first letter of second part
//     return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
//     }
//     return nameParts[0][0].toUpperCase();
// }

// return "U"; // Fallback for "User"
// };

//   // added later for login

//   const [theme, setTheme] = useState(
//     localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
//   );
//   const element = document.documentElement;
//   useEffect(() => {
//     if (theme === "dark") {
//       element.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//       document.body.classList.add("dark");
//     } else {
//       element.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//       document.body.classList.remove("dark");
//     }
//   }, [theme]);

//   const [sticky, setSticky] = useState(false);
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 0) {
//         setSticky(true);
//       } else {
//         setSticky(false);
//       }
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);
//   const navItems = (
//     <>
//       <li className="transition duration-200">
//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             isActive ? "underline text-sky-500" : "hover:underline"
//           }
//         >
//           Home
//         </NavLink>
//       </li>

//       <li className="transition duration-200">
//         <NavLink
//           to="/Essentials"
//           className={({ isActive }) =>
//             isActive ? "underline text-sky-500" : "hover:underline"
//           }
//         >
//           Essentials
//         </NavLink>
//       </li>

//       <li className="transition duration-200">
//         <NavLink
//           to="/Assignments"
//           className={({ isActive }) =>
//             isActive ? "underline text-sky-500" : "hover:underline"
//           }
//         >
//           Assignments
//         </NavLink>
//       </li>

//       <li className="transition duration-200">
//         <NavLink
//           to="/Notes"
//           className={({ isActive }) =>
//             isActive ? "underline text-sky-500" : "hover:underline"
//           }
//         >
//           Notes
//         </NavLink>
//       </li>

//       <li className="transition duration-200">
//         <NavLink
//           to="/Mores"
//           className={({ isActive }) =>
//             isActive ? "underline text-sky-500" : "hover:underline"
//           }
//         >
//           More
//         </NavLink>
//       </li>

//       <li className="transition duration-200">
//         <NavLink
//           to="/TT"
//           className={({ isActive }) =>
//             isActive ? "underline text-sky-500" : "hover:underline"
//           }
//         >
//           TT
//         </NavLink>
//       </li>

//       <li className="transition duration-200">
//         <NavLink
//           to="/Games"
//           className={({ isActive }) =>
//             isActive ? "underline text-sky-500" : "hover:underline"
//           }
//         >
//           Games
//         </NavLink>
//       </li>
//     </>
//   );
//   return (
//     <>
//       <div
//         className={`max-w-screen-2xl container mx-auto md:px-6 px-4 bg-base-200 dark:bg-slate-800 dark:text-white fixed top-0 left-0 right-0 z-50 ${
//           sticky
//             ? "sticky-navbar shadow-md bg-base-300 dark:bg-slate-700 dark:text-white duration-300 transition-all ease-in-out"
//             : ""
//         }`}
//       >
//         <div className="navbar">
//           <div className="navbar-start">
//             <div className="dropdown">
//               <div
//                 tabIndex={0}
//                 role="button"
//                 className="btn btn-ghost lg:hidden "
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M4 6h16M4 12h8m-8 6h16"
//                   />
//                 </svg>
//               </div>
//               <ul
//                 tabIndex={0}
//                 className="menu menu-md dropdown-content bg-base-100 dark:bg-slate-800 rounded-box z-[1] mt-3 w-52 p-2 shadow"
//               >
//                 {navItems}
//               </ul>
//             </div>
//             <a
//               href="https://t.me/+NKT8OoynbggwZTk1"
//               className="hidden lg:block"
//             >
//               <img
//                 src={pic}
//                 className="h-10 w-10 rounded-full cursor-pointer "
//                 alt="Profile Picture"
//               />
//             </a>

//             <a
//               href="https://t.me/+NKT8OoynbggwZTk1"
//               className=" px-3 text-lime-400 text-3xl font-bold cursor-pointer"
//             >
//               KitUp
//             </a>
//           </div>
//           <div className="navbar-end space-x-3">
//             <div className="navbar-center hidden lg:flex">
//               <ul className="menu menu-horizontal px-1">{navItems}</ul>
//             </div>
//             {/* <div className="hidden md:block">
//                             <label className="px-3 py-2 border rounded-md flex items-center gap-2 ">
//                                 <input type="text" className="grow outline-none dark:bg-slate-800 dark:text-white" placeholder="Search" />
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 16 16"
//                                     fill="currentColor"
//                                     className="h-4 w-4 opacity-70">
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
//                                         clipRule="evenodd" />
//                                 </svg>
//                             </label>
//                         </div> */}
//             <div>
//               <label className="swap swap-rotate">
//                 {/* this hidden checkbox controls the state */}
//                 <input
//                   type="checkbox"
//                   className="theme-controller"
//                   value="synthwave"
//                 />

//                 {/* sun icon */}
//                 <svg
//                   className="swap-off h-7 w-7 fill-current"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   onClick={() => setTheme(theme === "light" ? "dark" : "light")}
//                 >
//                   <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
//                 </svg>

//                 {/* moon icon */}
//                 <svg
//                   className="swap-on h-7 w-7 fill-current"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//                 >
//                   <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
//                 </svg>
//               </label>
//             </div>
//             <div>
//               {/* <a className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
//                     onClick={() =>
//                         document.getElementById("my_modal_3").showModal()
//                     }
//                 >Login</a>
//                 <Login/> */}

//                 <div className="relative">
//                 {!user ? (
//                     <>
//                     <button
//                         className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300"
//                         onClick={() =>
//                         document.getElementById("my_modal_3").showModal()
//                         }
//                     >
//                         Login
//                     </button>
//                     <Login />
//                     </>
//                 ) : (
//                     <div className="dropdown dropdown-end">
//                     <label tabIndex={0} className="cursor-pointer">
//                         <div className="w-10 h-10 rounded-full bg-green-400 text-black flex items-center justify-center font-bold uppercase">
//                         {getInitials(user)}
//                         </div>
//                     </label>

//                     <ul
//                         tabIndex={0}
//                         className="dropdown-content menu p-2 shadow bg-base-100 dark:bg-slate-800 rounded-box w-36"
//                     >
//                         <li className="text-sm px-2 py-1 font-semibold">
//                         {user.firstName}
//                         </li>
//                         <li>
//                         <button
//                             className="text-red-500"
//                             onClick={() => {
//                             localStorage.removeItem("KitUp_User");
//                             localStorage.removeItem("token");
//                             setUser(null);
//                             window.location.reload();
//                             }}
//                         >
//                             Logout
//                         </button>
//                         </li>
//                     </ul>
//                     </div>
//                 )}
//                 </div>


//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Navbar;


import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom"; // Added Link import
import Login from "./Login";
import pic from "../../public/kk.jpg";

function Navbar() {
  // 1. User State
  const [user, setUser] = useState(() => {
    const data = localStorage.getItem("KitUp_User");
    return data && data !== "undefined" ? JSON.parse(data) : null;
  });

  useEffect(() => {
    const data = localStorage.getItem("KitUp_User");
    if (data) setUser(JSON.parse(data));
  }, []);

  // 2. Initials Logic
  const getInitials = (user) => {
    if (!user) return "??";
    const name = user.name || `${user.firstName || ""} ${user.lastName || ""}`;
    const nameParts = name.trim().split(" ");
    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
    }
    return (nameParts[0][0] || "U").toUpperCase();
  };

  // 3. Theme Logic (Fixed)
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  useEffect(() => {
    const element = document.documentElement;
    if (theme === "dark") {
      element.classList.add("dark");
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  // 4. Sticky Logic
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = (
    <>
      <li><NavLink to="/" className={({ isActive }) => isActive ? "underline text-sky-500" : "hover:underline"}>Home</NavLink></li>
      <li><NavLink to="/Essentials" className={({ isActive }) => isActive ? "underline text-sky-500" : "hover:underline"}>Essentials</NavLink></li>
      {/* <li><NavLink to="/Assignments" className={({ isActive }) => isActive ? "underline text-sky-500" : "hover:underline"}>Assignments</NavLink></li>
      <li><NavLink to="/Notes" className={({ isActive }) => isActive ? "underline text-sky-500" : "hover:underline"}>Notes</NavLink></li>
      <li><NavLink to="/Mores" className={({ isActive }) => isActive ? "underline text-sky-500" : "hover:underline"}>More</NavLink></li>
      <li><NavLink to="/TT" className={({ isActive }) => isActive ? "underline text-sky-500" : "hover:underline"}>TT</NavLink></li>
      <li><NavLink to="/Games" className={({ isActive }) => isActive ? "underline text-sky-500" : "hover:underline"}>Games</NavLink></li> */}
    </>
  );

  return (
    <div className={`max-w-screen-2xl container mx-auto md:px-6 px-4 bg-base-200 dark:bg-slate-800 dark:text-white fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      sticky ? "shadow-md bg-base-300 dark:bg-slate-700" : ""
    }`}>
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-md dropdown-content bg-base-100 dark:bg-slate-800 rounded-box z-[1] mt-3 w-52 p-2 shadow">{navItems}</ul>
          </div>
          <Link to="/" className="hidden lg:block">
            <img src={pic} className="h-10 w-10 rounded-full cursor-pointer" alt="Logo" />
          </Link>
          <Link to="/" className="px-3 text-lime-400 text-3xl font-bold">KitUp</Link>
        </div>

        <div className="navbar-end space-x-3">
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navItems}</ul>
          </div>

          {/* Theme Toggle (Ensure Checkbox syncs with State) */}
          <label className="swap swap-rotate">
            <input 
              type="checkbox" 
              className="theme-controller" 
              checked={theme === "dark"} 
              onChange={() => setTheme(theme === "light" ? "dark" : "light")} 
            />
            <svg className="swap-off h-7 w-7 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
            <svg className="swap-on h-7 w-7 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
          </label>

          {/* User Section */}
          <div className="relative">
            {!user ? (
              <>
                <button className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300" onClick={() => document.getElementById("my_modal_3").showModal()}>Login</button>
                <Login />
              </>
            ) : (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-lime-400 text-black flex items-center justify-center font-bold uppercase border-2 border-white hover:scale-105 transition-all">
                    {getInitials(user)}
                  </div>
                </label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 dark:bg-slate-800 rounded-box w-52 mt-2">
                  <li className="px-4 py-2 font-bold text-gray-700 dark:text-gray-200 border-b dark:border-gray-700 mb-1">
                    {user.name || "User"}
                  </li>
                  <li><Link to="/profile">My Profile</Link></li>
                  <li>
                    <button className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={() => { localStorage.clear(); window.location.href = "/"; }}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;