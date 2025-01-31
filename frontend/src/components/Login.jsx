import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        // Login logic
        const res = await axios.post(BASE_URL + '/login', {
          emailId: email,
          password: password
        }, { withCredentials: true });
        dispatch(addUser(res.data));
        navigate('/');
      } else {
        // Signup logic
      const res =  await axios.post(BASE_URL + '/signup', {
          firstName,
          lastName,
          emailId: email,
          password: password
        }, { withCredentials: true });
        dispatch(addUser(res.data));
        navigate('/'); // Clear any previous errors
        
      }
    } catch (error) {
      setError(error.response?.data || (isLogin ? "Invalid Credentials" : "Signup Failed"));
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-md p-8 space-y-6 rounded-xl shadow-xl bg-base-300">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            {isLogin ? 'Login' : 'Create Account'}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {isLogin ? 'Welcome back!' : 'Get started with your account'}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleAuth}>
          {!isLogin && (
            <div className="flex gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>
          )}

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered"
              required
              minLength="6"
            />
          </div>

          {error && (
            <div className="alert alert-error">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <button type="submit" className="btn btn-primary w-full">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="link link-primary hover:link-secondary"
            >
              {isLogin ? 'Create account' : 'Login here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;