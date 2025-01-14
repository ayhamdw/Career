import React from 'react';
import { Bar, Line, Pie, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale, // Register the RadialLinearScale for Radar charts
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styles from './Statistics.module.css'; // Import the CSS module

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale, // Add this to support Radar charts
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = () => {

  // Sample data for statistics
  const serviceProviderData = 150; // Placeholder
  const topCareerCategory = "Software Development"; // Placeholder
  const messagesPerDay = [10, 20, 15, 25, 30, 35]; // Sample data for messages per day
  const totalProjects = 250; // Placeholder for total projects
  const requestsPerDay = [5, 10, 7, 8, 12, 15]; // Sample data for requests per day
  const careerCategories = 10; // Placeholder for number of career categories

  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Messages per Day',
        data: messagesPerDay,
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Users Registered',
        data: [50, 80, 60, 90, 120, 150], // Sample data
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ['Electronics', 'Clothing', 'Furniture', 'Toys'],
    datasets: [
      {
        data: [300, 50, 100, 75], // Sample data
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverOffset: 4,
      },
    ],
  };

  const radarChartData = {
    labels: ['JavaScript', 'Python', 'C#', 'Java', 'Go'],
    datasets: [
      {
        label: 'Skill Level',
        data: [90, 85, 70, 60, 80],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.topContainer}>
      <h1>Statistics Dashboard</h1>

      <div className={styles.statisticsContainer}>

        {/* Pie Chart */}
        <div className={styles.chartContainer}>
          <h2>Sales Distribution (Pie Chart)</h2>
          <Pie data={pieChartData} />
        </div>

        <div className={styles.statItem}>
          <h2>Messages per Day</h2>
          <Line data={lineChartData} />
        </div>

                {/* Bar Chart */}
                <div className={styles.chartContainer}>
          <h2>Users Registered (Bar Chart)</h2>
          <Bar data={barChartData} />
        </div>

        <div className={styles.statItem}>
          <h2>Total Projects</h2>
          <p>{totalProjects}</p>
        </div>

        <div className={styles.statItem}>
          <h2>Requests per Day</h2>
          <Line data={{ labels: ['January', 'February', 'March', 'April', 'May', 'June'], datasets: [{ label: 'Requests per Day', data: requestsPerDay, borderColor: 'rgb(255, 159, 64)', backgroundColor: 'rgba(255, 159, 64, 0.2)', fill: true, tension: 0.4 }] }} />
        </div>

        <div className={styles.statItem}>
          <h2>Number of Careers</h2>
          <p>{careerCategories}</p>
        </div>



        

        {/* Radar Chart */}
        <div className={styles.chartContainer}>
          <h2>Skill Level (Radar Chart)</h2>
          <Radar data={radarChartData} />
        </div>

        <div className={styles.statItem}>
          <h2>Number of Service Providers</h2>
          <p>{serviceProviderData}</p>
        </div>

        <div className={styles.statItem}>
          <h2>Top Career Category</h2>
          <p>{topCareerCategory}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
