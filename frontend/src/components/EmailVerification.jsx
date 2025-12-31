import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link');
        return;
      }

      try {
        await authService.verifyEmail(token);
        setStatus('success');
        setMessage('Email verified successfully! You can now login.');
        setTimeout(() => navigate('/'), 3000);
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.message || 'Verification failed');
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <div className="text-center">
          {status === 'verifying' && (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold mb-2">Verifying Email...</h2>
            </>
          )}
          
          {status === 'success' && (
            <>
              <div className="text-green-500 text-5xl mb-4">✓</div>
              <h2 className="text-xl font-semibold text-green-600 mb-2">Success!</h2>
            </>
          )}
          
          {status === 'error' && (
            <>
              <div className="text-red-500 text-5xl mb-4">✗</div>
              <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
            </>
          )}
          
          <p className="text-gray-600 dark:text-gray-300">{message}</p>
          
          {status === 'success' && (
            <p className="text-sm text-gray-500 mt-2">Redirecting to login...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;