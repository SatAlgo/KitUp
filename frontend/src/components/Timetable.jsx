import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Timetable() {
  const [division, setDivision] = useState('');
  const [batch, setBatch] = useState('');
  const [currentLecture, setCurrentLecture] = useState(null);
  const [nextLecture, setNextLecture] = useState(null);

  // Sample timetable data
  const timetableData = {
    A: {
      4: {
        Monday: [
          { time: '08:30 AM - 10:20 AM', subject: 'EAD(Adv JAVA) Lab', teacher: 'Vinodini Gupta', location: 'H207B' },
          { time: '10:30 AM - 12:20 PM', subject: 'EVS Theory', teacher: 'NVB', location: 'H202' },
          { time: '01:15 PM - 03:05 PM', subject: 'DBMS Lab', teacher: 'MNV', location: 'H306C' },

        ],
        Tuesday: [
          { time: '08:30 AM - 10:20 AM', subject: 'EAD(Adv JAVA) Lab', teacher: 'Vinodini Gupta', location: 'H207B' },
          { time: '10:30 AM - 12:20 PM', subject: 'EI Lab', teacher: 'Pramode Ganjewar', location: 'H204B' },
          { time: '01:15 PM - 02:10 PM', subject: 'DBMS Theory', teacher: 'MNV', location: 'H309' },
          { time: '02:11 PM - 03:05 PM', subject: 'TOC', teacher: 'SBK', location: 'H309' },
        ],
        Wednesday: [
          { time: '08:30 AM - 10:20 AM', subject: 'Proto(Soft) Lab', teacher: 'Manish Giri', location: 'H310' },
          { time: '10:30 AM - 12:20 PM', subject: 'Proto(Che) Lab', teacher: 'MDS', location: 'B003' },
          { time: '01:15 PM - 02:10 PM', subject: 'TOC', teacher: 'SBK', location: 'H309' },
          { time: '02:11 PM - 03:05 PM', subject: 'ADS', teacher: 'BA', location: 'H309' },
        ],
        Thursday: [
          { time: '08:30 AM - 09:25 AM', subject: 'EI Theory', teacher: 'PDG', location: 'H309' },
          { time: '09:26 AM - 10:20 AM', subject: 'DBMS Theory', teacher: 'MNV', location: 'H309' },
          { time: '10:30 AM - 12:20 PM', subject: 'ADS Lab', teacher: 'BA', location: 'H207B' },
        ],
        Friday: [
          { time: '08:30 AM - 09:25 AM', subject: 'TOC Theory', teacher: 'SBK', location: 'H309' },
          { time: '09:26 AM - 10:20 AM', subject: 'DBMS Theory', teacher: 'MNV', location: 'H309' },
          { time: '10:30 AM - 11:25 AM', subject: 'EI Theory', teacher: 'PDG', location: 'H309' },
          { time: '11:26 AM - 12:20 PM', subject: 'ADS Theory', teacher: 'BA', location: 'H309' },
        ],
        // Saturday: [
        //   { time: '12:30 AM - 01:25 AM', subject: 'TOC Theory', teacher: 'SBK', location: 'H309' },
        //   { time: '01:26 AM - 02:20 AM', subject: 'DBMS Theory', teacher: 'MNV', location: 'H309' },

        // ],
        // Sunday: [
        //   { time: '12:00 PM - 01:25 PM', subject: 'TOC Theory', teacher: 'SBK', location: 'H309' },
        //   { time: '01:26 PM - 02:20 PM', subject: 'DBMS Theory', teacher: 'MNV', location: 'H09' },
        //   { time: '11:26 PM - 12:20 AM', subject: 'DBMS Theory', teacher: 'BKT', location: '420' },

        // ],

      },
      2: {
        Monday: [
          { time: '11:00 AM - 12:00 PM', subject: 'Math', teacher: 'Dr. Smith', location: 'Room 101' },
          { time: '02:00 PM - 03:00 PM', subject: 'Physics', teacher: 'Prof. Johnson', location: 'Room 102' },
        ],
        Tuesday: [
          { time: '12:00 PM - 01:00 PM', subject: 'Chemistry', teacher: 'Dr. White', location: 'Room 103' },
          { time: '02:00 PM - 03:00 PM', subject: 'Biology', teacher: 'Prof. Green', location: 'Room 104' },
          { time: '04:00 PM - 08:00 PM', subject: 'Physics', teacher: 'Prof. Johnson', location: 'Room 102' },
        ],
        // Add other days (Wednesday, Thursday, Friday) here...
      },
    },
  };

  const handleDivisionChange = (e) => {
    setDivision(e.target.value);
    setBatch('');
    setCurrentLecture(null);
    setNextLecture(null);
  };

  const handleBatchChange = (e) => {
    setBatch(e.target.value);
    updateLectures(e.target.value);
  };

  const updateLectures = (batch) => {
    if (division && batch) {
      const timetable = timetableData[division][batch];
      const currentTime = new Date();
      const currentDay = currentTime.toLocaleString('en-US', { weekday: 'long' });
      const currentTimeInMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

      // Find the current and next lecture based on time
      const [current, next] = getCurrentAndNextLectures(timetable[currentDay], currentTimeInMinutes);
      setCurrentLecture(current);
      setNextLecture(next);
    }
  };




  const getCurrentAndNextLectures = (dayTimetable, currentTimeInMinutes) => {
    let current = null;
    let next = null;

    dayTimetable.forEach((lecture, index) => {
      const [startTime, endTime] = lecture.time.split(' - ');
      const start = convertToMinutes(startTime);
      const end = convertToMinutes(endTime);

      // Check if the current time falls within the lecture time
      if (currentTimeInMinutes >= start && currentTimeInMinutes < end) {
        current = lecture;
      }

      // Find the next lecture that starts after the current time
      if (currentTimeInMinutes < start && !next) {
        next = lecture;
      }
    });

    // If no next lecture for the current day, check for the first lecture of the next day
    if (!next && !current) {
      next = getNextLectureForNextDay();
    }

    return [current, next];
  };


  const convertToMinutes = (time) => {
    const [hour, minute] = time.split(':');
    const amPm = time.split(' ')[1];
    let hourIn24 = parseInt(hour);

    if (amPm === 'PM' && hourIn24 !== 12) {
      hourIn24 += 12; // Convert PM to 24-hour format
    } else if (amPm === 'AM' && hourIn24 === 12) {
      hourIn24 = 0; // Convert 12 AM to 00:00
    }

    return hourIn24 * 60 + parseInt(minute); // Convert time to minutes
  };

  const getNextLectureForNextDay = () => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const currentDayIndex = daysOfWeek.indexOf(new Date().toLocaleString('en-US', { weekday: 'long' }));

    for (let i = 1; i < daysOfWeek.length; i++) {
      const nextDayIndex = (currentDayIndex + i) % daysOfWeek.length;
      const nextDay = daysOfWeek[nextDayIndex];

      if (timetableData[division] && timetableData[division][batch][nextDay]) {
        return timetableData[division][batch][nextDay][0]; // First lecture of the next available day
      }
    }

    return null; // No next lecture found in the upcoming week
  };




  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 dark:text-white px-4">
      <h1 className="mt-[64px] text-3xl font-bold mb-4 text-teal-400">Class Timetable SY</h1>

      <div className="mb-5">
        <label htmlFor="division" className="mr-3">Select Division:</label>
        <select
          id="division"
          value={division}
          onChange={handleDivisionChange}
          className="px-4 py-2 rounded-md bg-slate-700 text-white dark:bg-gray-300 dark:text-black"
        >
          <option value="">Select Division</option>
          <option value="A">A</option>
          {/* <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option> */}
          {/* Add other divisions here */}
        </select>
      </div>

      <div className="mb-5">
        <label htmlFor="batch" className="mr-3">Select Batch:</label>
        <select
          id="batch"
          value={batch}
          onChange={handleBatchChange}
          className="px-4 py-2 rounded-md bg-slate-700 text-white dark:bg-gray-300 dark:text-black"
        >
          <option value="">Select Batch</option>
          {/* <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option> */}
          <option value="4">4</option>
          {/* Add other batches here */}
        </select>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Timetable for <span className="text-blue-600">{division}</span> - <span className="text-blue-600">{batch}</span> Batch</h2>


        <div className="mb-5">
          <p className="font-semibold text-red-500 text-lg mb-2">Current Lecture:</p>
          {currentLecture ? (
            <div className="space-y-2">
              <div className="flex">
                <p className="font-bold w-28">Subject:</p>
                <p>{currentLecture.subject}</p>
              </div>
              <div className="flex">
                <p className="font-bold w-28">Teacher:</p>
                <p>{currentLecture.teacher}</p>
              </div>
              <div className="flex">
                <p className="font-bold w-28">Time:</p>
                <p>{currentLecture.time}</p>
              </div>
              <div className="flex">
                <p className="font-bold w-28">Location:</p>
                <p>{currentLecture.location}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 dark:text-gray-100">No lecture is currently scheduled.</p>
          )}
        </div>

        <div className="mb-5">
          <p className="font-semibold text-green-500 text-lg mb-2">Next Lecture:</p>
          {nextLecture ? (
            <div className="space-y-2">
              <div className="flex">
                <p className="font-bold w-28">Subject:</p>
                <p>{nextLecture.subject}</p>
              </div>
              <div className="flex">
                <p className="font-bold w-28">Teacher:</p>
                <p>{nextLecture.teacher}</p>
              </div>
              <div className="flex">
                <p className="font-bold w-28">Time:</p>
                <p>{nextLecture.time}</p>
              </div>
              <div className="flex">
                <p className="font-bold w-28">Location:</p>
                <p>{nextLecture.location}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 dark:text-gray-100">No more lectures are scheduled for today.</p>
          )}
        </div>


        <div className="mt-5">
          {/* <p className="text-sm text-gray-500">{new Date().toLocaleString()} <br />MM/DD/YYYY</p> */}
          {/* <p className="text-sm text-gray-500">{new Date().toLocaleString('en-GB')}</p> */}
          <p className="text-sm text-gray-500">
            {new Date().toLocaleString('en-GB', {
              month: 'numeric',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',

              hour12: true
            })}
          </p>


        </div>



      </div>

      <p className='text-sm text-center text-gray-500 max-w-screen-2xl container mt-7 mx-auto md:px-20 px-4 items-center md:items-center'>
      The timetable is currently available only for the A4 batch(SY). If you'd like a timetable for your batch, feel free to 
        <a
          href="https://www.linkedin.com/in/satyam-gaikwad-27a7a724b/"
          className="inline ml-1 md:px-1 text-indigo-500 hover:text-blue-700"
        >
          contact me!
        </a>

      </p>

      <Link to="/" className="mt-5 text-blue-500 hover:text-blue-700">Back to Home</Link>

    </div>

  );
}

export default Timetable;
