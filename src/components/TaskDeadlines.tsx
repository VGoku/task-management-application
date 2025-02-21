import React from 'react';
import { Task } from '../types/task';
import { CalendarIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';

interface TaskDeadlinesProps {
  tasks: Task[];
}

const TaskDeadlines: React.FC<TaskDeadlinesProps> = ({ tasks }) => {
  const upcomingDeadlines = tasks
    .filter(task => task.dueDate && task.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    .slice(0, 3);

  return (
    <div className="glass-effect rounded-xl p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <CalendarIcon className="h-5 w-5 text-primary-500" />
        Upcoming Deadlines
      </h3>
      <div className="space-y-3">
        {upcomingDeadlines.map(task => {
          const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();
          return (
            <div 
              key={task.id}
              className="flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-dark-hover"
            >
              <div className="flex items-center gap-3">
                {isOverdue && (
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                )}
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {task.title}
                </span>
              </div>
              <span className={`text-sm ${isOverdue ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                {formatDistanceToNow(new Date(task.dueDate!), { addSuffix: true })}
              </span>
            </div>
          );
        })}
        {upcomingDeadlines.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-center py-2">
            No upcoming deadlines
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskDeadlines; 