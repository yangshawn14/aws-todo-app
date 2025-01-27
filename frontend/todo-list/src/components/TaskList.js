import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegTrashCan } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";



export default function TaskList() {
    // Create a state to store tasks
    const [tasks, setTasks] = useState([]);
    // Create a state to store new tasks
    const [newTask, setNewTask] = useState('');
    // Initialize useNavigate hook
    const navigate = useNavigate();
    // Set api url
    const api_url = process.env.REACT_APP_API_URL;

    // Fetch tasks from the API when the component mounts
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`${api_url}`);
                const data = await response.json();
                setTasks(data); // Update state with fetched tasks
            } catch (error) {
                console.error('Error fetching tasks:', error);

            }
        };

        fetchTasks();
    }, []); // Empty dependency array ensures this only runs once

    // Handle adding new task
    const handleAddTask = async (event) => {
        // Prevent default form submission
        event.preventDefault();
        // Prevent empty task submissions
        if (!newTask.trim()) {
            alert("Task description cannot be empty!");
            return;
        }

        const taskToAdd = {
            task: newTask,
            isCompleted: false,
        };

        try {
            const response = await fetch(`${api_url}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskToAdd),
            });

            if (!response.ok) {
                throw new Error('Failed to create task.');
            }

            const createdTask = await response.json();

            // Update task list with the new task
            setTasks((prevTasks) => [...prevTasks, createdTask]);

            // Clear input field
            setNewTask('');
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    // Handle isComplete toggle
    const HandleToggleCompletion = async (id, currentState) => {
        try {
            const updatedTask = {
                isCompleted: !currentState, // Toggle the current status
            };

            const response = await fetch(`${api_url}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTask),
            });
            if (!response.ok) {
                throw new Error('Failed to update task.');
            }

            const updatedTaskData = await response.json();

            // Update task list in state
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === id
                        ? { ...task, ...updatedTaskData }
                        : task
                )
            );
        } catch (error) {
            console.error("Error updating task: ", error);
        }
    }

    // Handle navigation to update task page
    const handleTaskClick = (id) => {
        // Navigate to update task page
        navigate(`/updateTask/${id}`);
    }

    // Handle deleting tasks
    const handleDeleteTask = async (id) => {
        try {
            const response = await fetch(`${api_url}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete task.')
            }
            // Remove the task from the state after deletion
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error('Error deleting task: ', error);
        }
    };

    // Render the task list dynamically
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
                {/* Heading */}
                <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Task List</h2>

                {/* Form */}
                <form
                    onSubmit={handleAddTask}
                    className="flex w-full mb-8"
                >
                    <input
                        type="text"
                        placeholder="Add a new task"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)} // Update newTask state
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        Add
                    </button>
                </form>

                {/* Task List */}
                <ul className="space-y-4">
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <li
                                key={task.id}
                                className="bg-gray-50 p-4 rounded-lg shadow flex justify-between items-center"
                            >
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="checkbox"
                                        checked={task.isCompleted}
                                        onChange={() => HandleToggleCompletion(task.id, task.isCompleted)}
                                        className="w-5 h-5 text-blue-500 focus:ring-blue-300"
                                    />
                                    <strong
                                        className={`text-lg ${task.isCompleted ? 'line-through text-gray-500' : 'text-gray-800'
                                            }`}
                                    >
                                        {task.task}
                                    </strong>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDeleteTask(task.id)}
                                        className="text-red-500 hover:text-red-600 focus:outline-none"
                                    >
                                        <FaRegTrashCan className="w-5 h-5" />
                                    </button>
                                    {/* Edit Button */}
                                    <button
                                        onClick={() => handleTaskClick(task.id)}
                                        className="text-blue-500 hover:text-blue-600 focus:outline-none"
                                    >
                                        <FaPen className="w-5 h-5" />
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No tasks found.</p>
                    )}
                </ul>
            </div>
        </div>

    );
};