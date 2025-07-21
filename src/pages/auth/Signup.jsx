import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';
import { ImSpinner2 } from 'react-icons/im';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // 👈 added loading state
  const navigate = useNavigate();

  const validateSignup = () => {
    if (!email.length) {
      toast.error("Email is Required");
      return false;
    }
    if (!password.length) {
      toast.error("Password is Required");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password Should be Same");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateSignup()) {
      setLoading(true); // 👈 start loading
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_KEY}/api/auth/signup`,
          { email, password },
          { withCredentials: true }
        );
        if (response.status === 201) {
          navigate('/auth/login');
        }
      } catch (err) {
        toast.error(err?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false); // 👈 stop loading
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 px-4">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md border border-blue-200">
        <h2 className="text-4xl font-extrabold text-center text-blue-600 mb-8">
          Create Account
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
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-lg transition duration-200 flex items-center justify-center
              ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          >
            {loading ? (
              <ImSpinner2 className="animate-spin text-white text-xl" />
            ) : (
              'Sign Up'
            )}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-blue-700 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
