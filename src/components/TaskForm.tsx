import React from 'react';
import { useForm } from 'react-hook-form';
import { Task } from '../types/task';

interface TaskFormProps {
  onSubmit: (data: Partial<Task>) => void;
  initialData?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<Task>>({
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register('title', { required: 'Title is required' })}
          placeholder="Task title"
          className="w-full p-2 border rounded"
        />
        {errors.title && <span className="text-red-500">{errors.title.message}</span>}
      </div>

      <div>
        <textarea
          {...register('description')}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <select {...register('priority')} className="w-full p-2 border rounded">
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        {initialData ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskForm;
