import React from 'react';
import { Task } from '../types/task';

interface TaskProgressProps {
  tasks: Task[];
}

const TaskProgress: React.FC<TaskProgressProps> = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const todo = tasks.filter(t => t.status === 'todo').length;

  const completedPercent = (completed / total) * 100 || 0;
  const inProgressPercent = (inProgress / total) * 100 || 0;
  const todoPercent = (todo / total) * 100 || 0;

  return (
    <div className="glass-effect rounded-xl p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4">Progress Overview</h3>
      <div className="space-y-4">
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full flex">
            <div 
              style={{ width: `${completedPercent}%` }}
              className="bg-green-500 transition-all duration-500"
            />
            <div 
              style={{ width: `${inProgressPercent}%` }}
              className="bg-yellow-500 transition-all duration-500"
            />
            <div 
              style={{ width: `${todoPercent}%` }}
              className="bg-blue-500 transition-all duration-500"
            />
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-gray-600 dark:text-gray-300">Completed ({completed})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span className="text-gray-600 dark:text-gray-300">In Progress ({inProgress})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span className="text-gray-600 dark:text-gray-300">To Do ({todo})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskProgress; 