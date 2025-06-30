
import { useMutation } from '@apollo/client';
import {
  RiUserLine,
  RiLockPasswordLine,
  RiUserAddLine,
  RiLoader4Line,
  RiAlertLine,
  RiLoginBoxLine,
  RiCustomerService2Line,
  RiLockLine,
  RiMailLine
} from 'react-icons/ri';
import { useNavigate, Link } from 'react-router-dom';
import { REGISTER_USER } from '../../graphql/mutations';
import { useState} from 'react';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    onCompleted: (data) => {
      if (data.signup.errors && data.signup.errors.length > 0) {
        setError(data.signup.errors.join(', '));
        return;
      }
      // Show success message and redirect to login
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }

    try {
      await registerUser({
        variables: {
          email,
          password,
          name,
          role: "customer"
        },
      });
    } catch (err) {
      // Error is handled by onError callback
      console.log(err)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <RiCustomerService2Line className="h-12 w-12 text-blue-500" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 inline-flex items-center gap-2 group">
              <RiLoginBoxLine className="transition-transform group-hover:-translate-x-1" />
              sign in to your account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {success && (
            <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative flex items-center gap-2" role="alert">
              <RiUserAddLine className="flex-shrink-0 text-green-500" />
              <span className="block sm:inline">{success}</span>
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative flex items-center gap-2" role="alert">
              <RiAlertLine className="flex-shrink-0 text-red-500" />
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
          {/* Input fields container */}
            {/* Name field */}
            <div className="relative">
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <RiUserLine className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none rounded-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
              />
            </div>
            {/* Email field */}
            <div className="relative">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <RiMailLine className="h-5 w-5 text-gray-400" />
                </div>
                <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>

            {/* Password field */}
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <RiLockLine className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>

            {/* Password confirmation field */}
            <div className="relative">
              <label htmlFor="password-confirmation" className="sr-only">
                Confirm password
              </label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <RiLockPasswordLine className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password-confirmation"
                name="password-confirmation"
                type="password"
                autoComplete="new-password"
                required
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="appearance-none rounded-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Confirm password"
              />
            </div>
          </div>
          {/* Submit button */}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex items-center justify-center gap-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <RiLoader4Line className="animate-spin h-5 w-5" />
                  Creating account...
                </>
              ) : (
                <>
                  <RiUserAddLine className="h-5 w-5" />
                  Create account
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};






export default RegisterForm;
