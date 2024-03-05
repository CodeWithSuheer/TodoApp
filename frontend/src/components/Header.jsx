import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserAsync, reset } from '../features/authSlice';
import { Button } from "@nextui-org/react";

const Header = ({ handleThemeChange, theme }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [state, setState] = useState(false)
    const { user, isLoading } = useSelector((state) => state.auth);

    const handleLogout = async () => {
        if (user && user.token) {
            dispatch(logoutUserAsync())
            dispatch(reset())
            navigate('/login')
        } else {
            navigate('/login')
        }
    }


    // Replace javascript:void(0) paths with your paths
    const navigation = [
        { title: "Features", path: "javascript:void(0)" },
        { title: "Integrations", path: "javascript:void(0)" },
    ]


    return (
        <nav className="bg-white dark:bg-gray-800 border-b w-full md:text-sm md:border-none fixed top-0">
            <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                <div className="flex items-center justify-between md:block">
                    <Link className='cursor-pointer' onClick={() => navigate("/")}>
                        <h2 className='text-2xl py-4 text-gray-600 dark:text-gray-200' style={{ fontFamily: "Mochiy Pop One" }}>Todo App</h2>
                    </Link>
                    <div className="md:hidden">
                        <button className="text-gray-500 hover:text-gray-800"
                            onClick={() => setState(!state)}
                        >
                            {
                                state ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                </div>
                <div className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
                    <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                        <div className='space-y-3 items-center gap-x-3 md:flex md:space-y-0'>
                            {user ? (
                                <li className='flex items-center'>

                                    <button onClick={handleThemeChange} className="theme_icon mr-4 cursor-pointer">
                                        {theme === "light" ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
                                        )}

                                    </button>
                                    <Button onClick={handleLogout} color="primary">
                                        Log out
                                    </Button>
                                </li>
                            ) : (
                                <>
                                    {/* <li>
                                        <button onClick={handleThemeChange} className="theme_icon mr-4 cursor-pointer">
                                            {theme === "light" ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
                                            )}
                                        </button>
                                    </li> */}
                                    <li>
                                        <Button onClick={() => navigate("/login")} color="primary" variant="bordered">
                                            Login
                                        </Button>
                                    </li>
                                    <li>
                                        <Button onClick={() => navigate("/signup")} color="primary">
                                            Signup
                                        </Button>
                                    </li>
                                </>
                            )}
                        </div>
                    </ul>
                </div>
            </div>
        </nav >
    )
}




export default Header
