import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@nextui-org/react';
import { loginUserAsync, reset } from '../features/authSlice';
import toast from 'react-hot-toast';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, dispatch, navigate])


    // HANDLE SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUserAsync(formData));
    }

    return (
        <>
            <section className='flex justify-center bg-teal-400 items-center' style={{ minHeight: '100vh' }}>
                <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <div className="px-6 py-4">
                        <div className="flex justify-center mx-auto">
                        </div>
                        <h3 className="mt-3 mb-3 text-2xl md:text-3xl font-medium text-center text-gray-600 dark:text-gray-200">
                            Welcome Back
                        </h3>
                        <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
                            Login to your account
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="w-full mt-4">
                                <input
                                    aria-label="Email Address"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="Email Address"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="w-full mt-4">
                                <input
                                    aria-label="Password"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="Password"
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-center mt-2">
                                <Button isLoading={isLoading} className='mt-2 px-8' type='submit' color="primary">Login</Button>
                            </div>
                        </form>
                    </div>
                    <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                        <span className="text-sm text-gray-600 dark:text-gray-200">
                            Don't have an account?{' '}
                        </span>
                        <Link to="/signup"
                            className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login