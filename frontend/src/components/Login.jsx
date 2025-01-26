import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const dispatch = useDispatch();
const navigate  = useNavigate();

const handleLogin = async() => {
   try {
    const res = await axios.post(BASE_URL+'/login',{
      emailId: email,
      password: password
    },{withCredentials: true});
    console.log(res.data);
    dispatch(addUser(res.data));
    return navigate('/');
   } catch (error) {
    console.log(error);
   }
  
}
  
  return (
    <div className="flex justify-center mt-10">
      <div className="flex shadow-xl card bg-base-300 w-96">
        <div className="card-body">
          <h2 className="flex justify-center card-title">Login</h2>
          <div >
            <label className="w-full max-w-xs my-2 form-control ">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input type="text" placeholder="Enter Your Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="w-full max-w-xs input input-bordered" />
            </label>
            <label className="w-full max-w-xs my-2 form-control">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input type="password" placeholder="Enter Your Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="w-full max-w-xs input input-bordered" />
            </label>
          </div>
          <div className="flex justify-center mt-2 card-actions">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Login