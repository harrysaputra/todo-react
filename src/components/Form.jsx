import React, { useState } from 'react';

export default function Form(props) {
  const [name, setName] = useState('');

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.addTask(name);
    setName('');
    e.target.reset();
  }

  return (
    <form className="form-control" onSubmit={handleSubmit}>
      <div className="input-group mx-auto">
        <input
          type="text"
          placeholder="Add a to-do"
          className="input input-bordered"
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-accent">
          Add +
        </button>
      </div>
    </form>
  );
}
