"use client";

import React from "react";

export default function TaskCard({ task, onDelete, onEdit, onToggleComplete }) {
  return (
    <li
      className={`list-group-item d-flex align-items-center justify-content-between bg-transparent ${
        task.completed ? "completed" : ""
      }`}
    >
      <div className="d-flex align-items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id, task)}
          className="form-check-input"
        />
        <span
          className={`task-text text-white ${
            task.completed ? "text-muted text-decoration-line-through" : ""
          }`}
          onClick={()=> onEdit(task.id)}
        >
          {task.title}
        </span>
        
      </div>
      <button
        className="btn btn-link text-white p-0"
        onClick={(e) => {e.preventDefault();e.stopPropagation(); onDelete(task.id)}}
      >
        <i className="bi bi-trash"></i>
      </button>
    </li>
  );
}
