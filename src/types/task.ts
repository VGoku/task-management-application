export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  tags: string[];
  createdAt: Date;
  dueDate?: Date;
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status?: 'todo' | 'in-progress' | 'completed';
  tags?: string | string[];
  dueDate?: Date;
}
