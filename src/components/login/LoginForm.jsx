import { useState } from "react";
import axios from 'axios'


function LoginForm(){
  const [name, setName] = useState('');
  const [password, setPassword] = useState('')
  const [isloggedin,setIsloggedin] = useState(false)

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8080/login', { username, password })

      // Store the token in localStorage or sessionStorage
      localStorage.setItem('token', response.data.token)

      console.log(response.data)
      console.log('Token:', response.data.token)
      setIsloggedin(true)
    } catch (error) {
      console.error('Error:', error.response ? error.response.data.message : error.message)
      setIsloggedin(false)
    }
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(name , password);
    login(name,password)



  }

  return(
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="bg-slate-200 p-5 rounded-md" >
          
         <h1 className="text-3xl font-semibold p-2">Login</h1>
         <h2 className="p-2">Sign In to your account</h2>
         <form onSubmit={handleSubmit}>
           <div className="">
            <label htmlFor="name" 
                   className="text-2xl bold my-2 mx-2 p-1">User :
            </label>
            <input type="text"
             className="w-72 h-10  p-4  m-1 rounded-md"
             name="name" 
             placeholder="Username"
             value={name}
             onChange={(e)=>setName(e.target.value)}
             id="name" />
           </div>
           <div>
            <label htmlFor="password"
                   className="text-2xl bold m-1 p-1 mx-2 my-2  rounded-xl ">
                    Pass :
            </label>
            <input type="password" 
                   className="w-72 h-10   p-4  m-1 rounded-md"
                   name="password" 
                   placeholder="Password"
                   value={password}
                   onChange={(e)=>setPassword(e.target.value)}
                   id="Password" />
           </div>
           <div>
             <button type="submit" 
                     className="w-40 h-10 rounded-xl bg-violet-600 mx-4 my-4
                                text-white font-2xl font-medium">
                Login  
             </button>
             <span className="my-2 mx-12 text-violet-700 ">
               {(isloggedin) ? <>You are loggedin</> : <a href="" className="underline">Forgot Password</a>}
             </span>
           </div>
         </form>
       </div>
      </div>
    </>
  )

}

export default LoginForm;