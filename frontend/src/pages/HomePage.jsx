import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createTaskAsync, deleteTasksAsync, getAllTasksAsync, updateTasksAsync } from '../features/taskSlice';
import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import toast from 'react-hot-toast';
import './Pages.css'

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const user = useSelector((state) => state.auth.user);
    const loading = useSelector((state) => state.task.loading);
    const allTasks = useSelector((state) => state.task.tasks);

    const unCompleteTask = allTasks?.filter((data) => data.isCompleted === false).reverse();
    const completeTask = allTasks?.filter((data) => data.isCompleted === true).reverse();


    useEffect(() => {
        if (user) {
            dispatch(getAllTasksAsync())
        }
        else {
            navigate('/login');
        }
    }, [user]);

    const handleAddTask = async (e) => {
        e.preventDefault();

        // Check if title or description is empty
        if (!title.trim() || !description.trim()) {
            toast.error('Please fill in both title and description');
            return;
        }

        try {
            await dispatch(createTaskAsync({ title, description }))
            dispatch(getAllTasksAsync());
            setTitle("");
            setDescription("");
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateTask = async (id) => {
        console.log(id);
        try {
            await dispatch(updateTasksAsync(id))
            dispatch(getAllTasksAsync());
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteTasksAsync(id))
            dispatch(getAllTasksAsync());
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <section className='home_banner px-4 lg:px-20 pt-5'>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="add_task mt-0">
                        <h2 className='text-2xl sm:text-3xl mb-5 font-semibold sm:font-medium tracking-wide text-gray-700'>Todo Lists</h2>

                        <div className="">
                            <div>
                                <input
                                    type="email"
                                    id="UserEmail"
                                    placeholder="Add Title"
                                    className="mt-1 p-3 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className='mt-6 mb-4'>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Description" className="block  mt-2 w-full  placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"></textarea>
                            </div>

                            <Button isLoading={loading} onClick={handleAddTask} color="primary" variant="flat" style={{ outline: 'none' }}>
                                Add Task
                            </Button>
                        </div>
                    </div>

                    <div className="list_task mt-5 lg:mt-0">
                        <h2 className='text-2xl sm:text-3xl mb-5 font-semibold sm:font-medium tracking-wide text-gray-700'>Task Lists</h2>


                        {loading ? (
                            <div className="spinner flex justify-center items-center">
                                <div className="animate-spin inline-block size-7 border-[3px] border-current border-t-transparent text-red-600 rounded-full dark:text-white" role="status" aria-label="loading">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="todo_mapping mb-5">
                                    {allTasks?.length === 0 ? <p>No tasks found.</p> :
                                        (<>
                                            {unCompleteTask.map((data) => (
                                                <div key={data._id} className="tood my-3 p-3 flex justify-between items-center w-full bg-white rounded-md border-gray-200 shadow-sm sm:text-sm">
                                                    <div className="flex items-center">
                                                        <div className="checkbox mr-4">
                                                            <input className='cursor-pointer rounded-lg h-5 w-5' onChange={() => handleUpdateTask(data._id)} type="checkbox" checked={data.isCompleted} />
                                                        </div>
                                                        <div className="data_text">
                                                            <h2 className='text-md md:text-lg font-medium'>{data.title}</h2>
                                                            <p className='text-sm md:text-md'>{data.description}</p>
                                                        </div>
                                                    </div>
                                                    <div className="delete_button">
                                                        <Button onClick={() => handleDelete(data._id)} className='bg-red-500 text-white px-2 md:px-4 py-1 rounded-lg' variant="flat" style={{ outline: 'none' }}>
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </>)
                                    }
                                </div>
                                <hr />
                                <div className="todo_mapping mb-5">
                                    <h2 className='text-lg sm:text-lg mb-1 mt-4 font-semibold sm:font-medium tracking-wide text-gray-700'>Completed Task</h2>

                                    {allTasks?.length === 0 ? <p>No tasks found.</p> :
                                        (<>
                                            {completeTask.map((data) => (
                                                <div key={data._id} className="tood my-3 p-3 flex justify-between items-center w-full bg-white rounded-md border-gray-200 shadow-sm sm:text-sm">
                                                    <div className="flex items-center">
                                                        <div className="checkbox mr-4">
                                                            <input className='cursor-pointer rounded-lg h-5 w-5 text-sm' onChange={() => handleUpdateTask(data._id)} type="checkbox" checked={data.isCompleted} />
                                                        </div>
                                                        <div className="data_text">
                                                            <h2 className='text-md md:text-lg font-medium'>{data.title}</h2>
                                                            <p className='text-sm md:text-md'>{data.description}</p>
                                                        </div>
                                                    </div>
                                                    <div className="delete_button">
                                                        <Button onClick={() => handleDelete(data._id)} className='bg-red-500 text-white px-2 md:px-4 py-1 rounded-lg' variant="flat" style={{ outline: 'none' }}>
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </>)
                                    }
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomePage;
