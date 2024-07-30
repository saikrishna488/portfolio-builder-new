"use client";
import { useContext, useEffect, useState } from "react";
import { globalContext } from '../../contextApi/GlobalContext';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Admin = () => {
  const router = useRouter();
  const [key, setKey] = useState("");
  const { adminKey, setAdminKey } = useContext(globalContext);
  const [users, setUsers] = useState([]);
  const [responses, setResponses] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [role, setRole] = useState("");
  const [question, setQuestion] = useState("");

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

  const fetchUserResponses = () => {
    if (!currentUser) {
      return null;
    }
    const fetching = async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/result?key=' + adminKey + "&email=" + currentUser, {
        method: 'GET',
      });
      const data = await res.json();
      if (data.message === true) {
        if (data.responses.length < 1) {
          toast("No responses received");
        }
        setResponses(data.responses);
      } else {
        toast("Invalid key");
      }
    };
    fetching();
  };

  const onQuestionSubmit = (e) => {
    e.preventDefault();
    if (!role || !question) {
      return null;
    }
    const fetching = async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/question', {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({ role, question })
      });
      const data = await res.json();
      if (data.message === true) {
        toast("Question Added");
      } else {
        toast("Invalid key");
      }
    };
    fetching();
    setQuestion("");
  };

  const deleteQuestion = () => {
    const fetching = async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/question', {
        method: 'DELETE',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({ role, question })
      });
      const data = await res.json();
      if (data.message === true) {
        toast("Question Deleted");
      } else {
        toast("Question Not found");
      }
    };
    fetching();
    setQuestion("");
  };

  const deleteResponse = (answer) => {
    const fetching = async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/result', {
        method: 'DELETE',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({ answer })
      });
      const data = await res.json();
      if (data.message === true) {
        toast("Response Deleted");
      } else {
        toast("Response Not found");
      }
    };
    fetching();
    setResponses((prevResponses) => prevResponses.filter((res) => res.answer !== answer));
  };

  return (
    <div className="flex items-center justify-center p-6 sm:p-12">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        {adminKey ? (
          <>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Panel</h2>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Select a user:</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg"
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
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 mb-6"
            >
              Fetch User Responses
            </button>
            {responses.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">User Responses:</h3>
                <div className="space-y-4">
                  {responses.map((response, i) => (
                    <div key={i} className="p-4 border border-gray-300 rounded-lg bg-gray-100">
                      <p className="font-bold text-gray-800">{i + 1}. {response.question}</p>
                      <p className="text-gray-700">{response.answer}</p>
                      <button
                        onClick={() => deleteResponse(response.answer)}
                        className="mt-2 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
                      >
                        Delete Response
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-8">
              <h4 className="text-xl font-semibold mb-4 text-gray-800">Add Mock Interview Questions</h4>
              <form onSubmit={onQuestionSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Role:</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select a Role</option>
                    <option value="databaseengineer">Database Engineer</option>
                    <option value="fullstack">Full Stack Developer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Question:</label>
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Enter question"
                  />
                </div>
                <div className="flex space-x-4">
                  <input
                    type="submit"
                    value="Add Question"
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={deleteQuestion}
                    className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
                  >
                    Delete Question
                  </button>
                </div>
                <button onClick={() => router.push('/admin/assessment')} className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-700 transition-colors duration-300 mt-4">Visit Assessment Panel</button>
              </form>
            </div>
          </>
        ) : (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Login</h2>
            <form onSubmit={onFormSubmit}>
              <div className="mb-4">
                <input
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  type="text"
                  placeholder="Admin key"
                />
              </div>
              <div>
                <input
                  type="submit"
                  value="Submit"
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
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
