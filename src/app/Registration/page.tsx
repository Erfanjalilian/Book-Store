"use client"

// pages/registration.js
import { useState } from "react";


export default function Registration() {
 
  const [name,setname]=useState<string>('')
  const[lastName,setlastName]=useState<string>('')
  const[email,setemail]=useState<string>('')
  const[password,setpassword]=useState<string>('')
  const[phone,setphone]=useState<string>('')

  function ChangeName(e:any){
    setname(e.target.value)
  }
  function ChangeEmail(e:any){
    setemail(e.target.value)

  }
  function ChangePassword(e:any){
    setpassword(e.target.value)
  }
  function Changephone(e:any){
    setphone(e.target.value)

  }
  function ChangelastName(e:any){
    setlastName(e.target.value)

  }
  async function handeldata(){

    const result=await fetch("http://localhost:3000/users",{
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        name:name,
        lastName:lastName,
        email:email,
        password:password,
        phone:phone

      })
    })
    alert("لطفا در سایت لاگین کنید")
    window.location.href = "/Login";
   

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">ایجاد حساب کاربری</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            لطفاً فرم زیر را با دقت پر کنید
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">نام</label>
              <input
              value={name}
                type="text"
                onChange={ChangeName}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="نام"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">نام خانوادگی</label>
              <input
              value={lastName}
                type="text"
                onChange={ChangelastName}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="نام خانوادگی"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">ایمیل</label>
              <input
              value={email}
                type="email"
                onChange={ChangeEmail}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">رمز عبور</label>
              <input
              value={password}
                type="password"
                onChange={ChangePassword}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="رمز عبور قوی وارد کنید"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">شماره تماس</label>
              <input
              value={phone}
                type="number"
                onChange={Changephone}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="شماره  موبایل خود را وارد کنید"
              />
            </div>
          </div>

          <div>
            <button
            onClick={handeldata}
              type="button"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              ثبت‌نام
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
