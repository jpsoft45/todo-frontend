'use client';

import React from 'react';
import TaskForm from '../components/TaskForm';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function CreateTaskPage() {
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      await axios.post('http://localhost:4000/tasks', data);
      router.push('/');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="mt-4">
      <TaskForm onSubmit={handleSubmit} />
    </div>
  );
}