import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import SearchBar from './components/SearchBar';
import TaskStats from './components/TaskStats';
import NotFound from './components/NotFound';
import { useTaskStore } from './lib/store';
import { Task, TaskFormData } from './types/task';
import ThemeToggle from './components/ThemeToggle';
import TaskMetrics from './components/TaskMetrics';
import TaskProgress from './components/TaskProgress';
import TaskDeadlines from './components/TaskDeadlines';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const setTaskStatus = useTaskStore((state) => state.setTaskStatus);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateTask = (data: TaskFormData) => {
    const newTask: Task = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date(),
      status: 'todo',
      tags: typeof data.tags === 'string' ? 
            data.tags.split(',').map((tag: string) => tag.trim()) : 
            Array.isArray(data.tags) ? data.tags : [],
    };
    addTask(newTask);
  };

  const handleUpdateTask = (data: TaskFormData) => {
    if (editingTask) {
      updateTask(editingTask.id, {
        ...data,
        tags: typeof data.tags === 'string' ? 
              data.tags.split(',').map((tag: string) => tag.trim()) :
              Array.isArray(data.tags) ? data.tags : [],
      });
      setEditingTask(null);
    }
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleStatusChange = (id: string, status: Task['status']) => {
    setTaskStatus(id, status);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={
              <>
                <header className="mb-8 text-center">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-200 bg-clip-text text-transparent mb-2">
                    Task Management
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Organize and track your tasks efficiently
                  </p>
                </header>

                <TaskMetrics tasks={tasks} />
                <TaskProgress tasks={tasks} />
                <TaskDeadlines tasks={tasks} />
                
                <TaskStats tasks={tasks} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6">
                    <h2 className="text-2xl font-semibold text-primary-700 dark:text-primary-400 mb-4">
                      {editingTask ? 'Edit Task' : 'Create New Task'}
                    </h2>
                    <TaskForm
                      onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                      initialData={editingTask ?? undefined}
                    />
                  </div>
                  
                  <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6">
                    <h2 className="text-2xl font-semibold text-primary-700 dark:text-primary-400 mb-4">
                      Tasks
                    </h2>
                    <SearchBar
                      onSearch={setSearchQuery}
                      onFilterChange={setStatusFilter}
                    />
                    <TaskList
                      tasks={filteredTasks}
                      onDelete={handleDeleteTask}
                      onEdit={handleEditTask}
                      onStatusChange={handleStatusChange}
                    />
                  </div>
                </div>
              </>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <ThemeToggle />
      </div>
    </BrowserRouter>
  );
}

export default App;