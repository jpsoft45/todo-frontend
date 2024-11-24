"use client";

import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import TaskCard from "./components/TaskCard";
import axios from "axios";
import { useRouter } from "next/navigation";
// import axios from '../app/api/axios';

export default function HomePage() {
  const [tasks, setTasks] = useState([
    // { id: 1, text: 'Integer urna interdum massa libero auctor neque turpis semper Integer urna interdum massa libero auctor neque turpis semper.', completed: false },
    // { id: 2, text: 'Duis vel sed fames integer.', completed: false },
    // { id: 3, text: 'Lorem ipsum dolor sit amet consectetur.', completed: false },
    // { id: 4, text: 'Etiam tristique sapien eu.', completed: true },
    // { id: 5, text: 'Curabitur gravida arcu.', completed: true },
  ]);
  const router = useRouter();

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleToggleComplete = async (id, task) => {
    try {
      const {title} = task;
      const completed = !task.completed;
      await axios.put(`http://localhost:4000/tasks/${id}`, { title,completed });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`http://localhost:4000/tasks/${id}`);
        fetchTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const handleEdit = (id) => {
    router.push(`/edit/${id}`);
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="">
      <div className="d-flex justify-content-between align-items-center mb-3 home-create">
        <Button className="w-100" onClick={() => router.push("/create")}>Create Task <i className="ml-1 bi bi-plus-circle"></i></Button>
      </div>
      <main className="tasks-container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="primary-text">
            Tasks <span className="ronded-count">{totalTasks}</span>
          </h5>
          <h5 className="sec-text">
            Completed{" "}
            <span className="ronded-count ">
              {completedTasks} / {totalTasks}
            </span>
          </h5>
        </div>
        {tasks.length> 0 ?<ul className="list-group bg-dark border-0">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </ul>: 
        <div className="empty-task w-100">
          <div className="empty-task-icon"><i class="bi bi-card-checklist"></i></div>
          <div className="empty-task-message">You don't have any tasks registered yet.</div>
          <div className="empty-task-sub-message">Create task and organaze your to-do items</div>
        </div>
        }
      </main>
    </div>
  );
}
