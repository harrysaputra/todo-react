import React, { useState } from 'react';
import Todo from './components/Todo';
import Form from './components/Form';
import { useLocalStorage } from './hooks';
import { nanoid } from 'nanoid';

function App(props) {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [filter, setFilter] = useState('All');

  const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
  };

  const FILTER_NAMES = Object.keys(FILTER_MAP);

  const filterList = FILTER_NAMES.map((name) => (
    <a
      key={name}
      name={name}
      className={`tab tab-bordered ${
        filter === name ? 'tab-active' : ''
      } w-1/3`}
      onClick={() => setFilter(name)}
    >
      {name}
    </a>
  ));

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks?.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
        {...task}
      />
    ));

  function addTask(name) {
    const newTask = {
      id: `todo-${nanoid()}`,
      name,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  }

  const activeList = tasks.filter((task) => !task.completed);
  const completedList = tasks.filter((task) => task.completed);

  const tasksNoun = activeList.length !== 1 ? 'tasks' : 'task';
  const tasksCompletedNoun =
    completedList.length !== 1 ? 'tasks' : 'task';
  const statusText = `${activeList.length} ${tasksNoun} remaining, ${completedList.length} ${tasksCompletedNoun} completed.`;

  return (
    <div className=" w-full max-w-md mx-auto">
      <div className="min-h-screen bg-base-200 place-content-start">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-3xl font-bold mt-6">To-do Apps</h1>
            <p className="py-6">What needs to be done?</p>
            <Form addTask={addTask} />
          </div>
        </div>
        <div className="w-full mx-auto max-w-sm text-center p-6">
          <p className="text-sm">{statusText}</p>
          <div className="tabs mt-4">{filterList}</div>
          <div className="form-control mt-4">{taskList}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
