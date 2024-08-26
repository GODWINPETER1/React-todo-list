import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import { Task } from './types';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [completionRate, setCompletionRate] = useState<number>(0);


  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => {
        // Limit data to first 10 todos for demonstration purposes
        setTasks(data.slice(0, 10));
        console.log(data)
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  }, []);

  useEffect(() => {
    // Calculate completion rate
    const completedTasks = tasks.filter(task => task.completed);
    const rate = (completedTasks.length / tasks.length) * 100;
    setCompletionRate(Number(rate.toFixed(2))); // Convert the string to a number
  }, [tasks]);
  

  // Function to add a new task
  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      const newTask: Task = {
        id: Date.now(),
        title: newTaskTitle,
        completed: false
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    }
  };

  // Function to mark a task as completed
  const completeTask = (taskId: number) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
  };

  // Function to delete a task
  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Function to edit a task
  const editTask = (taskId: number, newTitle: string) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, title: newTitle } : task));
  };

  return (
    <div className="app">
      <div className="card">
        <h1>Todo App</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter task"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <button className='button-1' onClick={addTask}>Add Task</button>
        </div>
        <TaskList
          tasks={tasks}
          completeTask={completeTask}
          deleteTask={deleteTask}
          editTask={editTask}
        />
        <div className="insights">
          <p>Completion Rate: {completionRate}%</p>
          {completionRate > 0 ? (
            <p>Overall Productivity: {completionRate >= 70 ? 'High' : completionRate >= 50 ? 'Moderate' : 'Low'}</p>
          ) : (
            <p>No tasks completed yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
