import React, { useState, useEffect } from 'react';

function Timetable() {
  const [division, setDivision] = useState('A');
  const [batch, setBatch] = useState('4');
  const [day, setDay] = useState(new Date().toLocaleString('en-US', { weekday: 'long' }));

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
  };

  const handleBatchChange = (e) => {
    setBatch(e.target.value);
  };

  const handleDayChange = (e) => {
    setDay(e.target.value);
  };

  const timetable = division && batch ? timetableData[division]?.[batch]?.[day] : [];

  return (
    <div className="mb-16 flex flex-col items-center justify-center  bg-gray-100 dark:bg-gray-900 dark:text-white px-4">
        <h1 className="text-xl font-bold mb-4 text-rose-400">Complete Daywise Timetable</h1>
      <div className="mb-5 flex flex-wrap md:space-x-4 space-y-3 md:space-y-0">
        <div className="w-full md:w-auto">
          <label htmlFor="division" className="block mb-2 font-medium">Select Division:</label>
          <select
            id="division"
            value={division}
            onChange={handleDivisionChange}
            className="px-2 py-2 w-full rounded-md bg-white text-black dark:bg-gray-800 dark:text-white"
          >
            <option value="">Select Division</option>
            <option value="A">A</option>
          </select>
        </div>

        <div className="w-full md:w-auto">
          <label htmlFor="batch" className="block mb-2 font-medium">Select Batch:</label>
          <select
            id="batch"
            value={batch}
            onChange={handleBatchChange}
            className="px-2 py-2 w-full rounded-md bg-white text-black dark:bg-gray-800 dark:text-white"
          >
            <option value="">Select Batch</option>
            <option value="4">4</option>
          </select>
        </div>

        <div className="w-full md:w-auto">
          <label htmlFor="day" className="block mb-2 font-medium">Select Day:</label>
          <select
            id="day"
            value={day}
            onChange={handleDayChange}
            className="px-2 py-2 w-full rounded-md bg-white text-black dark:bg-gray-800 dark:text-white"
          >
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 md:p-6 w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4 text-blue-500">Timetable for {division} - {batch} on {day}</h2>

        {timetable && timetable.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-900 text-black dark:text-teal-500">
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Time</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Subject</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Teacher</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Location</th>
                </tr>
              </thead>
              <tbody>
                {timetable.map((lecture, index) => (
                  <tr key={index} className="text-center odd:bg-gray-100 dark:odd:bg-gray-700">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{lecture.time}</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{lecture.subject}</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{lecture.teacher}</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{lecture.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No lectures available for the selected day, division, and batch.</p>
        )}
      </div>
    </div>
  );
}

export default Timetable;
