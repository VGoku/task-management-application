import React from 'react';
import { Task } from '../types/task';
import { 
  ChartBarIcon, 
  ClockIcon, 
  CheckCircleIcon,
  FireIcon 
} from '@heroicons/react/24/outline';

interface TaskMetricsProps {
  tasks: Task[];
}

const TaskMetrics: React.FC<TaskMetricsProps> = ({ tasks }) => {
  const completionRate = tasks.length > 0
    ? ((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100).toFixed(1)
    : 0;

  const highPriorityTasks = tasks.filter(t => t.priority === 'high').length;
  const avgTasksPerDay = (tasks.length / 7).toFixed(1); // Assuming weekly view

  const metrics = [
    {
      label: 'Completion Rate',
      value: `${completionRate}%`,
      icon: ChartBarIcon,
      color: 'text-blue-500'
    },
    {
      label: 'High Priority',
      value: highPriorityTasks,
      icon: FireIcon,
      color: 'text-red-500'
    },
    {
      label: 'Daily Average',
      value: avgTasksPerDay,
      icon: ClockIcon,
      color: 'text-yellow-500'
    },
    {
      label: 'Total Completed',
      value: tasks.filter(t => t.status === 'completed').length,
      icon: CheckCircleIcon,
      color: 'text-green-500'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {metrics.map((metric, index) => (
        <div key={index} className="glass-effect rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3">
            <metric.icon className={`h-8 w-8 ${metric.color}`} />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{metric.label}</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{metric.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskMetrics; 