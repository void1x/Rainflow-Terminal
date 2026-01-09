import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import { Mail, Lock } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleEmailLogin = (e) => {
    e.preventDefault()
    if (email && password) {
      // Store user session
      localStorage.setItem('user', JSON.stringify({ email, loginMethod: 'email' }))
      navigate('/')
    } else {
      setError('Please fill in all fields')
    }
  }

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const userData = JSON.parse(atob(credentialResponse.credential.split('.')[1]))
      localStorage.setItem('user', JSON.stringify({
        email: userData.email,
        name: userData.name,
        picture: userData.picture,
        loginMethod: 'google'
      }))
      navigate('/')
    } catch (err) {
      setError('Google login failed')
    }
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-bg-secondary rounded-lg shadow-xl p-8 border border-border-color">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Welcome Back</h1>
          <p className="text-text-secondary mb-8">Sign in to your Rainflow account</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="mb-6 space-y-4">
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-text-secondary" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2 bg-bg-primary border border-border-color rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-text-secondary" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 bg-bg-primary border border-border-color rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-shadow"
            >
              Sign In
            </button>
          </form>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-color"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-bg-secondary text-text-secondary">Or continue with</span>
            </div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError('Google login failed')}
            />
          </div>

          <p className="text-center text-text-secondary text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-accent-primary hover:underline font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
