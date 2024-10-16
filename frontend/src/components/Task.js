import React, { useEffect, useState, useContext } from 'react';
import '../index.css';
import { UserContext } from '../context/user';

const TaskList = () => {
  const { username1 } = useContext(UserContext); 
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`/api/task/user/${username1}`); 
        const data = await response.json();
        if (response.ok) {
          setTasks(data.tasks);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Error fetching tasks: ' + error.message);
      }
    };

    if (username1) { 
      fetchTasks();
    }
  }, [username1]); 

  return (
    <div className="task-list-container">
      <h2>All Tasks</h2>
      {error && <p className="error-message">{error}</p>}
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <h3>{task.taskTitle}</h3>
            <p>{task.taskDetails}</p>
            <p>
              {task.assignedUsers.map(user => user.userId.username).join(', ')}
            </p>
            <p>Deadline: {new Date(task.taskDeadline).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
