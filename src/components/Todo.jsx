import React, { useState } from 'react';
import {
  PencilIcon,
  TrashIcon,
  ArrowUturnLeftIcon,
  CheckIcon,
} from '@heroicons/react/20/solid';

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName === '' ? props.name : newName);
    setNewName('');
    setEditing(false);
  }

  const editTemplate = (
    <form
      className="flex justify-between items-center"
      onSubmit={handleSubmit}
    >
      <label className="label cursor-pointer justify-start gap-4">
        <input
          id={props.id}
          type="text"
          placeholder={props.name}
          className="input w-full"
          value={newName}
          onChange={handleChange}
        />
      </label>
      <div className="flex gap-1">
        <button type="submit" className="btn btn-square btn-sm">
          <CheckIcon className="w-4 h-4" />
        </button>
        <button
          className="btn btn-square btn-sm"
          onClick={() => setEditing(false)}
        >
          <ArrowUturnLeftIcon className="w-4 h-4" />
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="flex justify-between items-center">
      <label className="label cursor-pointer justify-start gap-4">
        <input
          type="checkbox"
          className="checkbox checkbox-accent"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <span
          className={
            props.completed === true
              ? ' text-accent'
              : 'text-base-content'
          }
        >
          {props.name}
        </span>
      </label>
      <div className="flex gap-1">
        <button
          className="btn btn-square btn-sm"
          onClick={() => setEditing(true)}
        >
          <PencilIcon className="w-4 h-4" />
        </button>
        <button
          className="btn btn-square btn-sm"
          onClick={() => props.deleteTask(props.id)}
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
  return isEditing ? editTemplate : viewTemplate;
}
