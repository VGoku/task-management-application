import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import NotFound from './components/NotFound';
import { Task } from './types/task';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleCreateTask = (data: Partial<Task>) => {
    const newTask: Task = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date(),
      status: 'todo',
      tags: [],
    } as Task;

    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = (data: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === editingTask?.id ? { ...task, ...data } : task
    ));
    setEditingTask(null);
  };

  const handleStatusChange = (id: string, status: Task['status']) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status } : task
    ));
  };

  return (
    <BrowserRouter>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Task Management</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {editingTask ? 'Edit Task' : 'Create New Task'}
            </h2>
            <TaskForm
              onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
              initialData={editingTask ?? undefined}
            />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Tasks</h2>
            <TaskList
              tasks={tasks}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>

        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
