import API from "../services/api";

const TaskCard = ({ task, refreshTasks, setEditingTask }) => {
  const handleDelete = async () => {
    if (window.confirm("Delete this task?")) {
      await API.delete(`/tasks/${task._id}`);
      refreshTasks();
    }
  };

  return (
    <div className={`task-card priority-${task.priority}`}>
      <div className="task-header">
        <h3>{task.title}</h3>
        <span className={`status-badge ${task.status}`}>{task.status}</span>
      </div>
      <p>{task.description}</p>
      <div className="task-footer">
        <span className="priority-label">Priority: {task.priority}</span>
        <div className="actions">
          <button onClick={() => setEditingTask(task)} className="edit-btn">Edit</button>
          <button onClick={handleDelete} className="delete-btn">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
