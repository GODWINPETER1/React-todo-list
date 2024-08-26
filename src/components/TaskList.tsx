import React from 'react';
import Task from './Task';
import { Task as TaskType } from '../types';

interface TaskListProps {
  tasks: TaskType[];
  completeTask: (taskId: number) => void;
  deleteTask: (taskId: number) => void;
  editTask: (taskId: number, newTitle: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, completeTask, deleteTask, editTask }) => {
  return (
    <div className="task-list">
      {/* Render tasks */}
      {tasks.map((task, index) => (
        <Task
          key={task.id}
          task={task}
          index={index + 1}
          onComplete={completeTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
