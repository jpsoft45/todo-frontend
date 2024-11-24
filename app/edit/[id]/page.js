'use client';

import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import TaskForm from '../../components/TaskForm';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';

export default function EditTaskPage() {
  const [task, setTask] = useState(null);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const fetchTask = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/tasks/${id}`);
      setTask(response.data);
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:4000/tasks/${id}`, data);
      router.push('/');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="mt-4">
        <TaskForm task={task} onSubmit={handleSubmit} />
    </div>
  );
}