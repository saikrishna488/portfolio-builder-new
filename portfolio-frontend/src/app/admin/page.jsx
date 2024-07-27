"use client"
import { useContext, useEffect, useState } from "react";
import { globalContext } from '../../contextApi/GlobalContext';
import { toast } from "react-toastify";

const Admin = () => {
    const [key, setKey] = useState("");
    const { adminKey, setAdminKey } = useContext(globalContext);
    const [users, setUsers] = useState([]);
    const [responses, setResponses] = useState([]);
    const [currentUser, setCurrentUser] = useState('');

    useEffect(() => {
        if (adminKey) {
            const fetchUsers = async () => {
                const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/users?key=' + adminKey, {
                    method: 'GET',
                });

                const data = await res.json();

                if (data.message === true) {
                    setUsers(data.users);
                } else {
                    toast("Error occurred");
                }
            };

            fetchUsers();
        }
    }, [adminKey]);

    const onFormSubmit = (e) => {
        e.preventDefault();

        const fetchAdmin = async () => {
            const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/admin?key=' + key, {
                method: 'GET',
            });

            const data = await res.json();

            if (data.message === true) {
                setAdminKey(key);
                toast("Verified, welcome");
            } else {
                toast("Invalid key");
            }
        };

        fetchAdmin();
        setKey("");
    };

    //fetching users responses
    const fetchUserResponses = () => {
        const fetching = async () => {
            const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/result?key=' + adminKey + "&email=" + currentUser, {
                method: 'GET',
            });

            const data = await res.json();
            console.log(data)
            if (data.message === true) {
                if(data.responses.length < 1){
                    toast("No responses received")
                }
                setResponses(data.responses)
            } else {
                toast("Invalid key");
            }
        }
        fetching()
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                {adminKey ? (
                    <>
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Admin Panel</h2>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Select a user:</label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    name=""
                                    id=""
                                    value={currentUser}
                                    onChange={(e) => setCurrentUser(e.target.value)}
                                >
                                    <option value="">Select a user</option>
                                    {users.map((user, i) => (
                                        <option key={i} value={user}>{user}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                onClick={fetchUserResponses}
                                className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
                            >
                                Fetch User Responses
                            </button>
                        </div>
                        {responses.length > 0 && (
                            <div className="mt-4">
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">User Responses:</h3>
                                <div className="space-y-4">
                                    {responses.map((response, i) => (
                                        <div key={i} className="p-4 border border-gray-300 rounded-lg bg-gray-100">
                                            <p className="font-bold text-gray-800">{i + 1}. {response.question}</p>
                                            <p className="text-gray-700">{response.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Admin Login</h2>
                        <form onSubmit={onFormSubmit}>
                            <div className="mb-4">
                                <input
                                    value={key}
                                    onChange={(e) => setKey(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    type="text"
                                    placeholder="Admin key"
                                />
                            </div>
                            <div>
                                <input
                                    type="submit"
                                    value="Submit"
                                    className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 cursor-pointer"
                                />
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
