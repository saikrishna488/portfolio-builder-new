"use client";
import React, { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { globalContext } from '../../contextApi/GlobalContext';
import { useRouter } from 'next/navigation';
import Render from '../../components/Render';

const page = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [skills, setSkills] = useState("");
    const [certifications, setCertifications] = useState("");
    const [projects, setProjects] = useState("");
    const [college, setCollege] = useState("");
    const [field, setField] = useState("");
    const [role, setRole] = useState("");
    const { user, data, setData , refresh, setRefresh} = useContext(globalContext);

    const router = useRouter();

    useEffect(() => {
        if (data.name) {
            setName(data.name);
            setDescription(data.description);
            setSkills(data.skills);
            setCertifications(data.certifications);
            setProjects(data.projects);
            setCollege(data.college);
            setField(data.field);
            setRole(data.role);
        }
    },[])

    const submit = (e) => {
        e.preventDefault();
        if (name.length > 1 && description.length > 1 && skills.length > 1 && certifications.length > 1 && projects.length > 1) {
            let obj = {
                name,
                description,
                skills,
                certifications,
                projects,
                college,
                field,
                role,
                id: user.username
            }

            console.log(obj);
            try {
                if (!user.username) {
                    throw new Error("not logged in");
                }
                fetch(process.env.NEXT_PUBLIC_BACKEND_URL+'/userdata', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                }).then((res) => {
                    return res.json();
                }).then((data) => {
                    if (data.successful == true) {
                        setData(data);
                        toast("Data updated now you can create portfolio/resume");
                        setRefresh(true);
                        router.push('/');
                    }
                    else {
                        toast("Please login to continue");
                        throw new Error("err");
                    }
                })
            }
            catch (err) {
                toast("Please login to continue");
            }
        }
        else {
            toast("Please fill all the fields");
        }
    }

    return (
        <div className='userdata'>
            {refresh ? <Render/> : null}
            <form className='userdata-form' onSubmit={submit}>
                <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} id="" placeholder='name (eg:harry)' required={true} />

                <input type="text" name="field" value={field} onChange={e => setField(e.target.value)} id="" placeholder='Field (eg:computer science)' required={true} />

                <input type="text" name="role" value={role} onChange={e => setRole(e.target.value)} id="" placeholder='Role (eg:Designing)' required={true} />

                <input type="text" name="description" value={description}  onChange={e => setDescription(e.target.value)} id="" placeholder='description' required={true} />

                <input type="text" name="skills" value={skills}  onChange={e => setSkills(e.target.value)} id="" placeholder='Skills - eg:(1,2,3)' required={true} />

                <input type="text" name="certifications" value={certifications}  onChange={e => setCertifications(e.target.value)} id="" placeholder='Certifications - eg:(1,2,3)' required={true} />

                <input type="text" name="projects" value={projects} onChange={e => setProjects(e.target.value)} id="" placeholder='Projects - eg:(1,2,3)' required={true} />

                <input type="text" name="college" value={college} onChange={e => setCollege(e.target.value)} id="" placeholder='college' required={true} />

                <button className='button'>Submit</button>
            </form>
        </div>
    )
}

export default page;
