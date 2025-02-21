import React from 'react';
import { Task } from '../types/task';

interface TaskStatsProps {
  tasks: Task[];
}

const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const todoTasks = tasks.filter(task => task.status === 'todo').length;

  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      <div className="card p-6 hover:scale-105 transition-transform duration-200">
        <h4 className="text-sm font-medium text-gray-500 mb-1">Total Tasks</h4>
        <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          {totalTasks}
        </p>
      </div>
      <div className="card p-6 hover:scale-105 transition-transform duration-200">
        <h4 className="text-sm font-medium text-gray-500 mb-1">To Do</h4>
        <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
          {todoTasks}
        </p>
      </div>
      <div className="card p-6 hover:scale-105 transition-transform duration-200">
        <h4 className="text-sm font-medium text-gray-500 mb-1">In Progress</h4>
        <p className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-700 bg-clip-text text-transparent">
          {inProgressTasks}
        </p>
      </div>
      <div className="card p-6 hover:scale-105 transition-transform duration-200">
        <h4 className="text-sm font-medium text-gray-500 mb-1">Completed</h4>
        <p className="text-3xl font-bold bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
          {completedTasks}
        </p>
      </div>
    </div>
  );
};

export default TaskStats;
