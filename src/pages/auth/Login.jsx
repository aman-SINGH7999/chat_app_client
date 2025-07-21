
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../../redux/userSlice';
import { ImSpinner2 } from 'react-icons/im'; // Spinner icon

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateSignup = () => {
    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!password.trim()) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateSignup()) return;

    setLoading(true);
    try {
      const path = `${process.env.REACT_APP_API_KEY}/api/auth/login`;
      const response = await axios.post(
        path,
        { email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setAuthUser(response.data.user));
        navigate("/chat");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border border-blue-200">
        <h2 className="text-4xl font-extrabold text-center text-blue-600 mb-8">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 flex justify-center items-center gap-2 ${
              loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            } text-white rounded-xl font-semibold text-lg transition duration-200`}
          >
            {loading ? (
              <>
                <ImSpinner2 className="animate-spin text-xl" /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link to="/auth/signup" className="text-blue-700 hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
