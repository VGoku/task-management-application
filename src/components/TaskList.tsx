import React from 'react';
import { Task } from '../types/task';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit, onStatusChange }) => {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div 
          key={task.id}
          className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <span className={`px-2 py-1 rounded text-sm ${
              task.priority === 'high' ? 'bg-red-100 text-red-800' :
              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {task.priority}
            </span>
          </div>
          
          <p className="mt-2 text-gray-600">{task.description}</p>
          
          <div className="mt-4 flex items-center justify-between">
            <select
              value={task.status}
              onChange={(e) => onStatusChange(task.id, e.target.value as Task['status'])}
              className="p-1 border rounded"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            
            <div className="space-x-2">
              <button
                onClick={() => onEdit(task)}
                className="px-3 py-1 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
