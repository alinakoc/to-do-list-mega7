
import React, { useState, useEffect } from 'react';
import './App.css';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');



  const [taskChangeCount, setTaskChangeCount] = useState(0);

  useEffect(() => {
    if (taskChangeCount > 0)
       {
             localStorage.setItem(' tasks', JSON.stringify(tasks))
    
       }
  }, [taskChangeCount])


  useEffect(() => { 
    const localStorageTasks = JSON.parse(localStorage.getItem(' tasks'))
    setTasks(localStorageTasks?? []);

  },[])



  //useEffect(() => {
    //const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    //setTasks(savedTasks);
 // }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    setTaskChangeCount(prev=>prev+1)
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const completeTask = (taskId) => {
    setTaskChangeCount(prev=>prev+1)
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (taskId) => {
    const isConfirmed = window.confirm('Görevi silmek ister misin?');
    setTaskChangeCount(prev=>prev+1)
    if (isConfirmed) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    }
  };

  const handlePageReload = () => {

    const isConfirmed = window.confirm('ASayfayı yenilemek istediğinden emin misin? değişiklikler silinecek.');
    setTaskChangeCount(prev=>prev+1)
    if (isConfirmed) {
      window.location.reload();
    }
  };

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Yeni görev girin"
        />
        <button onClick={addTask}>Görev ekle</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => completeTask(task.id)}
            />
            <span>{task.text}</span>
            <button onClick={() => removeTask(task.id)}>sil</button>
          </li>
        ))}
      </ul>
      <button onClick={handlePageReload} className="reload-button">sayfayı yenile</button>
    </div>
  );
};

export default TodoApp;