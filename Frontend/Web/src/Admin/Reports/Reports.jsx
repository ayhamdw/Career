import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [banDurations, setBanDurations] = useState({});

  // Fetch reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:7777/api/Complaint/reports');
        setReports(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch reports.');
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Handle banning the user
  const handleBanUser = async (userId, banDuration, complaintId) => {
    try {
      const response = await axios.post(`http://localhost:7777/api/user/ban-user/${userId}`, {
        banDuration: banDuration,
      });
      alert(response.data.message);
      
      // After banning, mark the complaint as resolved
      const updateComplaintResponse = await axios.post(`http://localhost:7777/api/Complaint/resolve/${complaintId}`);
      if (updateComplaintResponse.data.success) {
        alert('Complaint resolved successfully');
        // Refresh the list after resolving
        const updatedReports = reports.filter((report) => report._id !== complaintId);
        setReports(updatedReports);
      } else {
        alert('Failed to resolve complaint');
      }
    } catch (error) {
      alert('Error banning user or resolving complaint');
    }
  };

  // Handle the ban duration change
  const handleBanDurationChange = (userId, value) => {
    setBanDurations((prevState) => ({
      ...prevState,
      [userId]: value,
    }));
  };

  if (loading) {
    return <div className="text-center text-xl text-gray-500">Loading reports...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
        <span className="text-teal-500">Reports</span>
      </h1>
      {reports.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No reports found.</p>
      ) : (
        <div className="flex flex-wrap gap-8 justify-center">
          {reports.map((report) => (
            <div
              key={report._id}
              className={`bg-white shadow-md rounded-lg overflow-hidden flex flex-col w-[350px] transition-transform transform ${report.isResolved ? 'opacity-50' : ''}`}
            >
              <div className="p-6 flex-grow">
                <h2 className="text-2xl font-semibold text-gray-800">{report.reportedUser.username}</h2>
                <p className="text-sm text-gray-500">{report.reportedUser.email}</p>
                <p className="mt-2 text-gray-700">{report.reportText}</p>
                <a
                  href={report.documentationImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-teal-600 hover:text-teal-700 inline-flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  View Image
                </a>
                <div className="mt-3 text-sm text-gray-500">
                  <strong>Reported By:</strong> {report.user.username} ({report.user.email})
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  <strong>Created:</strong> {new Date(report.createdAt).toLocaleString()}
                </div>
              </div>

              {/* Ban Duration Input */}
              {!report.isResolved && (
                <div className="p-6 border-t border-gray-200">
                  <div className="mb-4">
                    <label
                      className="block text-gray-600 text-sm font-semibold"
                      htmlFor="ban-duration"
                    >
                      Ban Duration (days):
                    </label>
                    <input
                      type="number"
                      id="ban-duration"
                      className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                      value={banDurations[report.reportedUser._id] || ''}
                      onChange={(e) =>
                        handleBanDurationChange(report.reportedUser._id, e.target.value)
                      }
                      placeholder="Enter number of days"
                    />
                  </div>
                </div>
              )}

              {/* Footer: Buttons */}
              <div className="border-t border-gray-200 bg-gray-50 px-6 py-3 flex justify-between items-center mt-auto">
                <button
                  onClick={() =>
                    handleBanUser(
                      report.reportedUser._id,
                      banDurations[report.reportedUser._id],
                      report._id
                    )
                  }
                  className="bg-teal-600 text-white text-sm py-2 px-4 rounded-md hover:bg-teal-700"
                >
                  Ban User
                </button>
                <button
                  onClick={async () => {
                    try {
                      const response = await axios.post(`http://localhost:7777/api/Complaint/resolve/${report._id}`);
                      if (response.data.success) {
                        alert('Complaint dismissed');
                        const updatedReports = reports.filter((r) => r._id !== report._id);
                        setReports(updatedReports);
                      }
                    } catch (err) {
                      alert('Error dismissing complaint');
                    }
                  }}
                  className="bg-red-600 text-white text-sm py-2 px-4 rounded-md hover:bg-red-700"
                >
                  Dismiss
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Reports;
