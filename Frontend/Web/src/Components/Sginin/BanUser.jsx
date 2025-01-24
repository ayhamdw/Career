import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

function BanStatus() {
  const [banUntil, setBanUntil] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchBanStatus = async () => {
      try {
        const userId = localStorage.getItem('id');
        const response = await axios.get(`http://localhost:7777/api/user/banUntil/${userId}`);

        if (response.data.success) {
          setBanUntil(response.data.bannedUntil);
        } else {
          setError('Failed to retrieve ban status');
        }
      } catch (err) {
        setError('Error fetching ban status');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanStatus();
  }, []);

  const getFormattedBanDate = (banUntilDate) => {
    if (!banUntilDate) return null;
    const date = new Date(banUntilDate);
    return date.toLocaleString();
  };

  const handleGoToSignIn = () => {
    navigate('/signin'); // Redirect to the sign-in page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg w-full sm:w-3/4 md:w-1/2">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-semibold text-red-600 mb-4">Account Banned</h2>
          <p className="text-xl text-gray-700 mb-4">
            Due to your violation of site standards, you are temporarily banned from entering the site.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-t-4 border-blue-600 rounded-full"></div>
          </div>
        ) : (
          <>
            {error && <p className="text-red-600 text-lg text-center">{error}</p>}

            {banUntil ? (
              <div className="p-6 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg shadow-md">
                <div className="flex items-center justify-center mb-4">
                  <svg
                    className="w-12 h-12 text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2c-.78 0-1.5.45-1.85 1.17L1.14 19.17A2 2 0 0 0 3 22h18a2 2 0 0 0 1.86-2.83L13.85 3.17C13.5 2.45 12.78 2 12 2zm0 5a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V8a1 1 0 0 1 1-1zm0 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="ml-3 text-xl">You are banned until:</p>
                </div>
                <p className="text-lg text-center">
                  <span className="font-semibold text-red-600">{getFormattedBanDate(banUntil)}</span>
                </p>
                <div className="text-center mt-6">
                  <p className="text-lg text-gray-700">
                    You will be able to access your account after the above date.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-center text-green-600 mb-4">
                  You are not currently banned.
                </h3>
                <div className="text-center mt-6">
                  <p className="text-lg text-gray-600">
                    You have full access to the site and your account.
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Go to Sign In Button */}
        <div className="flex justify-center mt-6">
          <button onClick={() => navigate('/signin')} className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">Go to Sign In</button>

        </div>
      </div>
    </div>
  );
}

export default BanStatus;
