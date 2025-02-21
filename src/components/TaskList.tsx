import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Task } from '../types/task';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit, onStatusChange }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 dark:bg-dark-card rounded-lg">
        <p className="text-gray-500 dark:text-dark-text text-lg">
          No tasks found. Create a new task to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div 
          key={task.id}
          className="bg-white dark:bg-dark-card p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-in"
        >
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-heading">
              {task.title}
            </h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              task.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
              'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            }`}>
              {task.priority}
            </span>
          </div>
          
          <p className="mt-2 text-gray-600 dark:text-dark-text">{task.description}</p>
          
          <div className="mt-4 flex items-center justify-between">
            <select
              value={task.status}
              onChange={(e) => onStatusChange(task.id, e.target.value as Task['status'])}
              className="input py-1 px-2"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            
            <div className="space-x-2">
              <button
                onClick={() => onEdit(task)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                title="Edit task"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                title="Delete task"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
