import React, { useState } from 'react'
import loginGif from "../assets/login-animation.gif";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi"
import { Link,useNavigate } from "react-router-dom"
import{imageToBase64} from "../Utility/ImageToBase64"
import axios from "axios";
import {toast} from "react-hot-toast"
// import api from '../utils/api';




const SignUp = () => {

    const [showPass, setShowPass] = useState(true);
    const [showConfirmPass, setConfirmPass] = useState(true);
    const navigate = useNavigate()

    const [info, setInfo] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        image:""

    })

    // console.log(info);
    const handleShowFunc = () => {
        setShowPass(prev => !prev);
    }
    const handleConfirmShowFunc = () => {
        setConfirmPass(prev => !prev)
    }
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInfo((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleUploadProfileImage = async(e)=>{
        
        const data1 = await imageToBase64(e.target.files[0])
        // console.log(data1);
        
         setInfo((preve=>{
            return{
                ...preve,
                image : data1,
            }
         }))
    }
    const handleSubmit = async (e) => {
        const { first_name,last_name, email, password, confirmPassword,image } = info;
        e.preventDefault();
        if (first_name && email && password && confirmPassword) {
            if (password === confirmPassword) 
        {
        try{
        const response = await axios.post(`http://localhost:5000/api/auth/createuser`, 
        JSON.stringify({first_name,last_name, email, password,image}), {
        headers: {
          Accept: '*/*',
          "Content-Type": "application/json; charset=UTF-8",
          
        },
       
      });
                const authtoken = response.data.authtoken
                localStorage.setItem('token',authtoken)
                toast("Successfull")
               
                navigate("/Login")
            }catch (error) {
                if (error.response && error.response.status === 400 && error.response.data.code === "EMAIL_EXISTS") {
                    toast(error.response.data.error);
                } 
                
              }
        }else {
            toast("password and confirm password must be same")
        }
    }
}
    
    return (
        <div className='p-3 md:p-5'>
            <div className='bg-white flex flex-col item items-center p-4 '>
                <div className='w-24 h-24 overflow-hidden rounded-full drop-shadow-lg shadow-lg relative ' >
                    <img src={ info.image ? info.image :loginGif} className='w-full h-full' alt=" login logo" />
                    <label htmlFor="profileImage">
                    <div className='absolute  bottom-0 h-1/3 w-full bg-slate-300 bg-opacity-50 text-center cursor-pointer '>
                     <p className='text-sm p-1  '>upload</p>
                    </div>
                    <input type={"file"}  id='profileImage' accept='images/*' className='hidden' required onChange={handleUploadProfileImage} />
                    </label>
                </div>
                
                {/* form */}
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900">
                                    First Name
                                </label>
                                <div className="mt-2">
                                    <input id="first_name" name="first_name" value={info.first_name} required type="text" onChange={handleOnChange} 
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last Name
                                </label>
                                <div className="mt-2">
                                    <input id="last_name" name="last_name" value={info.last_name} type="text" onChange={handleOnChange} required
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input id="email" name="email" value={info.email} type="email" onChange={handleOnChange} autoComplete="email" required
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2  flex w-full justify-between items-center rounded-md border-gray-200  border-2  shadow-sm py-1 outline-gray-200 outline-[0.5px] outline focus-within:outline-indigo-700 focus-within:outline-2  sm:text-sm sm:leading-6">
                                    <input id="password" name="password" value={info.password} type={showPass ? "password" : "text"} onChange={handleOnChange} autoComplete="current-password" required
                                        className=" block text-gray-900 px-2 border-none outline-none placeholder:text-gray-400  "
                                    />
                                    <div className='flex flex-col mr-1 cursor-pointer' onClick={handleShowFunc}>
                                        {showPass ? <BiSolidShow /> : <BiSolidHide />}
                                    </div>
                                </div>
                                <div className='mt-2'>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                        Confirm Password
                                    </label>
                                </div>
                                <div className="mt-2  flex w-full justify-between items-center rounded-md border-gray-200  border-2  shadow-sm py-1 outline-gray-200 outline-[0.5px] outline focus-within:outline-indigo-700 focus-within:outline-2  sm:text-sm sm:leading-6">
                                    <input id="confirmPassword" name="confirmPassword" value={info.confirmPassword} type={showConfirmPass ? "password" : "text"} onChange={handleOnChange} autoComplete="current-password" required
                                        className=" block text-gray-900 px-2 border-none outline-none placeholder:text-gray-400  "
                                    />
                                    <div className='flex flex-col mr-1 cursor-pointer' onClick={handleConfirmShowFunc}>
                                        {showConfirmPass ? <BiSolidShow /> : <BiSolidHide />}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Sign in
                                </button>
                            </div>
                            <p>already have a account ? <Link to="/Login" className="text-blue-600 hover:underline">login</Link></p>
                        </form>
                    </div>
                </div>




            </div>
        </div >
    )
}

export default SignUp  
