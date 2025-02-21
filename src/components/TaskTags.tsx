import React from 'react';
import { Task } from '../types/task';
import { TagIcon } from '@heroicons/react/24/outline';

interface TaskTagsProps {
  tasks: Task[];
}

const TaskTags: React.FC<TaskTagsProps> = ({ tasks }) => {
  const allTags = tasks.flatMap(task => task.tags);
  const tagCount = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="glass-effect rounded-xl p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <TagIcon className="h-5 w-5 text-primary-500" />
        Task Categories
      </h3>
      <div className="flex flex-wrap gap-2">
        {Object.entries(tagCount).map(([tag, count]) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
          >
            {tag} ({count})
          </span>
        ))}
      </div>
    </div>
  );
};

export default TaskTags; 