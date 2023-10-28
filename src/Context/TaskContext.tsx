import React, { createContext, useContext, useState } from "react";
import { Data } from "../data/tasks2.tsx";

interface TaskProviderProps {
  children: React.ReactNode;
}

export const TaskContext = createContext<any>(null);
export function copyTask(taskId: string) {
  const taskToCopy = Data.find((task) => task.id === taskId);
  if (taskToCopy) {
    const copiedTask = {
      ...taskToCopy,
      id: generateUniqueTaskId(taskToCopy.id),
    };

    return copiedTask;
  }
  return null;
}

// Function to delete a task
export function deleteTask(taskId: string) {
  const indexToDelete = Data.findIndex((task) => task.id === taskId);
  if (indexToDelete !== -1) {
    // Remove the task from the Data array directly
    Data.splice(indexToDelete, 1);
    return true;
  }
  return false;
}

function generateUniqueTaskId(taskToCopyId: string) {
  const taskIdNumber = parseInt(taskToCopyId.replace("TASK-", ""), 10);
  const newTaskIdNumber = taskIdNumber - 1;
  const newTaskId = `TASK-${newTaskIdNumber}`;
  return newTaskId;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState(Data);
  const handleCopyTask = (taskId: string) => {
    const copiedTask = copyTask(taskId);
    if (copiedTask) {
      setTasks([...tasks, copiedTask]);
    }
  };
  const handleDeleteTask = (taskId: string) => {
    const isDeleted = deleteTask(taskId);
    if (isDeleted) {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

  tasks.sort((task1, task2) => {
    const taskId1 = parseInt(task1.id.replace("TASK-", ""), 10);
    const taskId2 = parseInt(task2.id.replace("TASK-", ""), 10);
    return taskId1 - taskId2;
  });

  return (
    <TaskContext.Provider
      value={{ tasks, copyTask: handleCopyTask, deleteTask: handleDeleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};
