"use client";
import { useContext, useEffect } from 'react';
import { globalContext } from '../contextApi/GlobalContext';
import { toast } from 'react-toastify';

const Render = () => {
  const { user, setUser, setData, refresh, setRefresh } = useContext(globalContext);

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
    }

    const loadAll = async () => {
      if (user.name) {
        try {
          let res2 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/userdata/${user.username}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          let data2 = await res2.json();

          if (data2.name) {
            setData(data2);
          } else {
            toast("Visit profile section and fill the user data");
          }
        } catch (err) {
          console.log(err);
        }
      } else {
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

            if (data.login === true) {
              let res2 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/userdata/${data.username}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });

              let data2 = await res2.json();

              setUser(data);
              if (data2.name) {
                setData(data2);
              } else {
                toast("Visit profile section and fill the user data");
              }
            } else {
              toast("Please login to get full access");
            }
          } else {
            toast("Please login to get full access");
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

    loadAll();
  }, [refresh]);

  return <></>;
};

export default Render;
