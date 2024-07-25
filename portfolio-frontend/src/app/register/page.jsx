"use client";
import { useContext, useState } from 'react';
import { globalContext } from '../../contextApi/GlobalContext';
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';

const page = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(globalContext);
  const router = useRouter();


  const submit = async (e) => {
    e.preventDefault();

    if (username.length > 5) {
      if (name.length > 5) {
        if (password.length > 5) {
          let obj = {
            username: username,
            name: name,
            email: email,
            password: password
          };

          try {
            let res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+'/register', {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(obj)
            });
            let data = await res.json();
            if (data.login == true) {
              toast("Please login to continue");
              router.push('/');
            }
            else{
              toast("username already exists");
            }
          }
          catch (err) {
            toast("failed !!!!");
          }
        }
        else {
          toast("password should be atleast of 5 chars length");
        }
      }
      else {
        toast("name should be atleast of 5 chars length");
      }
    }
    else {
      toast("username should be atleast of 5 chars length");
    }
  }

  return (
    <>
      <div className='register'>
        <form onSubmit={submit} className='form-register'>
          <h4>Register</h4>
          <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} placeholder='username' id="" />
          <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} placeholder='name' />
          <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='email' id="" />
          <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='password' id="" />
          <input type="submit" className='login-button' value="Register" />
        </form>
      </div>
    </>

  )
}

export default page;
