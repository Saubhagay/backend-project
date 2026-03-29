import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(savedUser));
      fetchTasks();
    }
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <header className="dash-header">
        <h1>Task Manager</h1>
        <div className="user-info">
          <span>Welcome, {user?.name}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <main className="dash-content">
        <section className="task-input">
          <h2>{editingTask ? "Edit Task" : "Add New Task"}</h2>
          <TaskForm 
            refreshTasks={fetchTasks} 
            editingTask={editingTask} 
            setEditingTask={setEditingTask} 
          />
        </section>

        <section className="task-list">
          <h2>Your Tasks</h2>
          <div className="tasks-grid">
            {tasks.map((task) => (
              <TaskCard 
                key={task._id} 
                task={task} 
                refreshTasks={fetchTasks} 
                setEditingTask={setEditingTask} 
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
