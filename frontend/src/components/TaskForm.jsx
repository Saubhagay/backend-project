import { useState, useEffect } from "react";
import API from "../services/api";

const TaskForm = ({ refreshTasks, editingTask, setEditingTask }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
  });

  useEffect(() => {
    if (editingTask) {
      setFormData(editingTask);
    } else {
      setFormData({ title: "", description: "", status: "todo", priority: "medium" });
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await API.put(`/tasks/${editingTask._id}`, formData);
        setEditingTask(null);
      } else {
        await API.post("/tasks", formData);
      }
      setFormData({ title: "", description: "", status: "todo", priority: "medium" });
      refreshTasks();
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task Title"
        required
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      <div className="selectors">
        <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <select value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="submit">{editingTask ? "Update" : "Create"} Task</button>
        {editingTask && <button type="button" onClick={() => setEditingTask(null)} className="cancel-btn">Cancel</button>}
      </div>
    </form>
  );
};

export default TaskForm;
