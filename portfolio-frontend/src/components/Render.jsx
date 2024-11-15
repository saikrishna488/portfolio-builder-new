"use client";
import { useContext, useEffect } from 'react';
import { globalContext } from '../contextApi/GlobalContext';
import { toast } from 'react-toastify';

const Render = () => {
  const { user, setUser,} = useContext(globalContext);

  useEffect(() => {


    const loadAll = async () => {

      try {
        const cookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('token='));

        if (cookie) {
          const token = cookie.split('=')[1];

          let res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/jwt`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });

          let data = await res.json();

          if (data.res) {
            setUser(data.user);
          }
          else {

          }

        }



      } catch (err) {
        // console.log(err);
      }
    };
    loadAll();
  }, []);

  return <></>;
};

export default Render;
