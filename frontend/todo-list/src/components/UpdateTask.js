import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateTask = () => {
    const { id } = useParams(); // Step 1: get task ID from url
    const navigate = useNavigate(); // For redirecting after successful update

    const [task, setTask] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [loading, setLoading] = useState(true);

    const api_url = process.env.REACT_APP_API_URL;

    // Step 2: Fetch task details
    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await fetch(`${api_url}/${id}`);
                if (!response.ok) throw new Error("Failed to fetch task.");
                const data = await response.json();
                setTask(data.task);
                setIsCompleted(data.isCompleted);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching task:", error);
            }
        };
        fetchTask();
    }, [id])

    const handleUpdateTask = async (e) => {
        e.preventDefault(); // Prevent form reload
        try {
            const payload = {
                task,
                isCompleted: isCompleted === "on", // Convert 'on' to true
            }

            const response = await fetch(`${api_url}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error("Failed to update task");

            // Navigate to task list
            navigate("/tasks");
        } catch (error) {
            console.error("Error updating tasks:", error);
        }
    };

    if (loading) {
        return (
            <p>Loading task details...</p>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6">Update Task</h2>

                <form onSubmit={handleUpdateTask}>
                    <div className="mb-4">
                        <label
                            htmlFor="task"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Task:
                        </label>
                        <input
                            type="text"
                            id="task"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            required
                            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-between mt-6">
                        <button
                            type="submit"
                            className="w-1/2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/tasks")}
                            className="w-1/2 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default UpdateTask;