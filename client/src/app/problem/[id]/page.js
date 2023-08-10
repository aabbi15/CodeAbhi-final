'use client'
 
import { useParams } from 'next/navigation'
import { useState,useEffect } from 'react';

import Header from '../../header';
import PROBLEMS from '@/app/problems';


export default function Page(){
    const problemid = useParams().id;
    const currprob = PROBLEMS[problemid-1];

    const [currlang,langUpdate]= useState("javascript");
    const handleLanguageChange= (event) =>{
        langUpdate(event.target.value);
        
    };

    useEffect(() => {
        Setcode(boilerplatecode());
    }, [currlang]);

    const boilerplatecode = () => {
        switch (currlang) {
            case "javascript":
                return (
                    String.raw`/* Write your JavaScript code here */`);
            case "python":
                return (
                    String.raw`/* Write your Python code here */`);

            case "c++":
                return (
                    String.raw`/* Write your C++ code here */`);
        }
    };

    

    const [code,Setcode] = useState(boilerplatecode);
    

    function handlecode(event){
        Setcode(event.target.value);
        
    } 
    
    function handleSubmit(){
        fetch("http://localhost:5173/problem/"+problemid,{
            method:'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({submission:code})

        }).then(response=> response.json())
        .then(data=>
            console.log(data.msg,data.submission))
            .catch(err => console.log(err));
    }

    return (
        <div>
            <Header />
            <div className="flex bg-gray-800 h-screen">
                <div className="w-2/5 bg-gray-800 text-lg text-slate-200 border-r-2 border-blue-300">
                    <div className="h-40 bg-gray-600 border-y-2 border-blue-300 p-2"> 
                        <span className="text-xl underline">{currprob.no}. {currprob.name}</span> <br />
                        <span className="pl-4">Difficulty: {currprob.difficulty}</span> <br />
                        <span className="pl-4">Acceptance: {currprob.acceptance}</span>
                    </div>
                    <div className="h-2/6 bg-gray-700 p-2 border-b-2 border-blue-300">
                        <span className='underline'>Description:</span> <br /> 
                        <span className="pl-4">{currprob.description}</span>
                    </div>
                    <div className="h-3/6 bg-gray-800 p-2 border-b-2 border-blue-300">
                        <span className='underline'>Example:</span> <br /> 
                        <span className="pl-4">{currprob.example}</span>
                    </div>
                </div>
                <div className="w-3/5 bg-gray-800">
                    <div className="h-20 flex pl-5 items-center bg-gray-600 border-y-2 border-blue-300 ">
                        <select onChange={handleLanguageChange} className=' h-10 rounded p-2 bg-emerald-500'>
                            <option value="" disabled >Select a Language</option>
                            <option value="javascript">JavaScript</option>
                            <option value="c++">C++</option>
                            <option value="python">Python</option>
                        </select>
                    </div>
                    <div className="h-5/6 bg-gray-700 border-b-2 border-blue-300">
                        <div className="w-full h-full">
                            <textarea className="codeinput w-full h-full p-3 bg-blue-950 text-gray-200" value={code} onChange={handlecode}>

                            </textarea>
                        </div>
                    </div>
                    <div className="h-20 bg-gray-800 ">
                        <button className="m-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 border-b-4 border-emerald-700 hover:border-emerald-500 rounded">
                            Run
                        </button>
                        <button onClick={handleSubmit}className="m-2 bg-emerald-500 hover:bg-emerald-400 text-white  font-bold py-2 px-4 border-b-4 border-emerald-700 hover:border-emerald-500 rounded">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 






