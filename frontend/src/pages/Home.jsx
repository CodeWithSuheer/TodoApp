import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Spinner } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { createGoalAsync, deleteGoalsAsync, getGoalsAsync, resetGoals, updateGoalsAsync } from '../features/goalSlice';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [text, setText] = useState('')
    const [updateId, setUpdateId] = useState('')
    const [updatedText, setUpdatedText] = useState('')
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { user } = useSelector((state) => state.auth);
    const { goals, isError, isSuccess, isLoading, message } = useSelector((state) => state.goal);

    const updateGoal = goals.filter((goal) => goal._id === updateId);


    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!user || !user.token) {
            navigate('/login');
            return;
        }

        dispatch(getGoalsAsync());

        return () => {
            dispatch(resetGoals());
        }
    }, [user, navigate, isError, message, dispatch])


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createGoalAsync({ text }))
        setText('');
    }

    const handleDelete = (id) => {
        dispatch(deleteGoalsAsync(id));
    }

    const handleUpdate = (goalId, text, onClose) => {
        const formData = { goalId, text }
        dispatch(updateGoalsAsync(formData))
            .then(() => {
                dispatch(getGoalsAsync());
                setUpdatedText('')
                onClose();
            });
    }

    const handleUpdateIdSend = (id) => {
        setUpdateId(id);
    }

    const handleInputChange = (text) => {
        setUpdatedText(text)
    }

    return (
        <>
            <section className='pt-14 h-screen bg-gray-100 dark:bg-gray-900'>
                <h2 className='mx-3 md:mx-10 pt-10 pb-5 text-2xl md:text-3xl text-gray-600 dark:text-gray-200 font-semibold capitalize'>Welcome {user?.name}</h2>
                <div className="all_goals">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mx-3 md:mx-10">
                        <form onSubmit={handleSubmit} className="add_goals h-[16rem] bg-white dark:bg-gray-800 py-7 md:py-10 px-3 md:px-6 rounded-xl">
                            <h2 className='text-xl md:text-2xl tracking-wide text-gray-600 dark:text-gray-100 font-semibold'>Add a new Goal</h2>

                            <div className="mt-4 flex w-full flex-wrap md:flex-nowrap gap-4">
                                <input
                                    type="text"
                                    placeholder='Add Your Goals'
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    className='h-14 w-full px-3 rounded-xl bg-gray-100 dark:bg-gray-900 focus:outline-none'
                                />
                            </div>

                            <Button type='submit' isLoading={isLoading} className='mt-4' color="primary">Add Goal</Button>
                        </form>

                        <div className="add_goals bg-white dark:bg-gray-800 py-7 md:py-10 px-3 md:px-6 rounded-xl">
                            <h2 className='text-xl md:text-2xl tracking-wide text-gray-600 dark:text-gray-100 font-semibold'>Goals Lists</h2>
                            {isLoading ? (
                                <>
                                    <div className='flex justify-center h-[8rem] items-center'>
                                        <Spinner size="xl" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="goals_list mt-4">
                                        {goals.length > 0 ? (
                                            <>
                                                {goals.map((data) => (
                                                    <div key={data._id} className="my-2 flex justify-between items-center bg-gray-100 dark:bg-gray-900 w-full py-4 px-4 rounded-xl text-md">
                                                        <span>{data.text}</span>

                                                        <div className="controls flex items-center gap-2">
                                                            <span className="cursor-pointer" onClick={() => { onOpen(); handleUpdateIdSend(data._id) }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                            </svg>
                                                            </span>
                                                            <span onClick={() => handleDelete(data._id)} className="cursor-pointer text-red-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg></span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        ) : (
                                            <h3>You have not set any goals</h3>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section >

            {updateGoal.map((data) => (
                <Modal
                    key={data._id}
                    backdrop="blur"
                    isOpen={isOpen}
                    onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}
                    className='bg-gray-200 dark:bg-gray-800'
                // classNames={{
                //     backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                // }}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Update Goals</ModalHeader>
                                <ModalBody>
                                    <div className=" flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <input
                                            type="text"
                                            value={updatedText || data.text}
                                            onChange={(e) => handleInputChange(e.target.value)}
                                            className='h-14 w-full px-3 rounded-xl bg-gray-100 dark:bg-gray-900 focus:outline-none' />
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onClick={() => handleUpdate(data._id, updatedText, onClose)} >
                                        Update
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal >
            ))}

        </>
    )
}

export default Home
