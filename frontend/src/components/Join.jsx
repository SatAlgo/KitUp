import React, { useState } from 'react';
import qrCodeImage from '../../public/QRmgb.jpg'; // Replace with the actual path to your QR code image
import { Link } from "react-router-dom";

function Support() {
    const [password, setPassword] = useState('');
    const [accessGranted, setAccessGranted] = useState(false);

    const correctPassword = "Password"; // Replace with the desired password

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password === correctPassword) {
            setAccessGranted(true);
        } else {
            alert("Incorrect password! Please try again.");
        }
    };

    return (
        <div className="mb-3 mt-[64px] md:mt-6 flex flex-col items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 dark:text-white px-4">
            {!accessGranted ? (
                <form
                    onSubmit={handlePasswordSubmit}
                    className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 flex flex-col items-center"
                >
                    <h1 className="text-xl font-bold mb-4 text-teal-400">Enter Password</h1>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        className="mb-4 px-3 py-1 rounded-md border dark:bg-slate-700 dark:text-white"
                    />
                    <button
                        type="submit"
                        className="bg-pink-500 text-white px-3 py-1 rounded-md hover:bg-pink-700 duration-300"
                    >
                        Submit
                    </button>
                </form>
            ) : (
                <>
                    <h1 className="text-3xl font-bold mb-4 text-teal-400">Support Us</h1>
                    <p className="text-center max-w-md mb-3">
                        Your support helps us continue creating valuable resources and improving our platform.
                        If you like our work, consider supporting us with a small contribution.
                        <br />
                        Thank you 😊!
                    </p>

                    <Link to="/">
                        <button className="mb-5 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
                            Go Back
                        </button>
                    </Link>
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 flex flex-col items-center">
                        <img
                            src={qrCodeImage}
                            alt="UPI QR Code"
                            className="w-64 h-64 object-cover mb-4"
                        />
                        <p className="text-lg font-semibold">Scan the QR code to make a contribution.</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default Support;
