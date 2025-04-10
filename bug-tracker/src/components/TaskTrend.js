import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const TaskTrendChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem('tasks');
      const tasks = storedTasks ? JSON.parse(storedTasks) : [];

      if (!Array.isArray(tasks)) {
        console.warn('Tasks in localStorage is not an array:', tasks);
        return;
      }

      const countByDate = tasks.reduce((acc, task) => {
        if (task.date) {
          acc[task.date] = (acc[task.date] || 0) + 1;
        }
        return acc;
      }, {});

      const labels = Object.keys(countByDate).sort();
      const data = labels.map(date => countByDate[date]);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Tasks per Day',
            data,
            fill: false,
            borderColor: '#36a2eb',
            tension: 0.2
          }
        ]
      });
    } catch (err) {
      console.error('Error parsing tasks:', err);
    }
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto' }}>
      <h3>📈 Tasks Trend</h3>
      {chartData ? <Line data={chartData} /> : <p>No task data available</p>}
    </div>
  );
};

export default TaskTrendChart;
