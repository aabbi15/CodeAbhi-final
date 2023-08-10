"use client"
import { useState } from 'react';

import Header from '../header';

import '../globals.css'



export default  function Page(){
    const [name,Setname] = useState('');
    const [email,Setemail] = useState('');
    const [password,Setpassword] = useState('');

    async function handleSignup(){
      const user = {
        name:name,
        email:email,
        password:password
      }
       
      fetch ("http://localhost:5173/signup", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
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
          }
        ).catch(
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
                  Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                      <label  className="input-label">Your name</label>
                      <input  value={name} onChange={(e) => Setname(e.target.value)} type="name" name="name" id="name" className="input-box" placeholder="Full Name" required=""/>
                  </div>
                  <div>
                      <label  className="input-label">Your email</label>
                      <input value={email} onChange={(e) => Setemail(e.target.value)} type="email" name="email" id="email" className="input-box" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label  className="input-label">Password</label>
                      <input value={password} onChange={(e) => Setpassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="input-box" required=""/>
                  </div>
                  <div>
                      <label  className="input-label">Confirm password</label>
                      <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="input-box" required=""/>
                  </div>
                  <button type="button" onClick={handleSignup} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p>
              </form>
          </div>
        </div>
        </div>
        </div>

        </>

    );
};