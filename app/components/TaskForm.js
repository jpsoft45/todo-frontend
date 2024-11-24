"use client";

import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useRouter } from 'next/navigation'
const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink",
  "brown",
];

export default function TaskForm({ task, onSubmit }) {
  const [title, setTitle] = useState(task ? task.title : "");
  const [color, setColor] = useState(task ? task.color : "blue");
  const router = useRouter();
  useEffect(() => {
    if (task) {
      console.log(task);
      
      setTitle(task.title);
      setColor(task.color);
    } 
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, color });
  };

  return (
    <div className="mt-6">
      <button className="btn btn-link text-light p-0 mb-5" onClick={()=>{
        router.push('/');
      }}>
          <i className="bi bi-arrow-left"></i>
      </button>
    <Form onSubmit={handleSubmit} className="pt-2">
      <Form.Group controlId="formTitle" className="mb-3">
        <Form.Label className="form-label primary-text">Title</Form.Label>
        <input
          type="text"
          className="form-control bg-dark text-light border-input"
          placeholder="Ex. Brush you teeth"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <div className="mb-3">
        <Form.Label className="form-label primary-text">Color</Form.Label>
        <div className="d-flex gap-2">
          {colors.map((c) => (
            <div
              key={c}
              type="button"
              style={{ backgroundColor: c }}
              className={`color-circle ${
                c === color ? "border border-3 border-light" : ""
              }`}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
      </div>
      <Button className="w-100 py-1 bg-primary mt-4" variant="primary" type="submit">
        {task ? <span>Save ✅</span> : <span>Add Task <i className="ml-1 bi bi-plus-circle"></i></span>}
      </Button>
    </Form>
    </div>
  );
}
