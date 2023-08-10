"use client"
import { useState } from 'react';
import Header from '../header';


import '../globals.css'



export default  function Page(){
    
    const [email,Setemail] = useState('');
    const [password,Setpassword] = useState('');

    async function handleLogin(){
      const user = {
        
        email:email,
        password:password
      }
       
      fetch ("http://localhost:5173/login", {
        
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(user),
        withCredentials: true,
        credentials: 'include',
      }).then(
        (response) => {
         console.log("fetched");
         return response.json();
        
        }).then(data => {
          
           if(data.url) {
            console.log(data.url);
            window.location.replace(data.url);
           }
           else console.log(data);
          })
        .catch(
        err=>{
          console.log(err.msg);
        }
      )
    }
    return (
        <>
        <Header/>

        <div className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                
                  <div>
                      <label  className="input-label">Your email</label>
                      <input value={email} onChange={(e) => Setemail(e.target.value)} type="email" name="email" id="email" className="input-box" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label  className="input-label" >Password</label>
                      <input value={password} onChange={(e) => Setpassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="input-box" required=""/>
                  </div>
                  
                  <button  type ="button" onClick={handleLogin} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ">Login Now</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      New to CodeAbhi? <a href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Create an account here</a>
                  </p>
              </form>
          </div>
        </div>
        </div>
        </div>

        </>

    );
};