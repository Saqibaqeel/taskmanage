import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import useAuth from '../../store/authStore'
import QButton from '../../components/Qbutton'
import Typography from '../../components/Typography'

const AuthForm = ({ mode }) => {
  const isSignup = mode === 'signup'

  const {
    authUser,
    login,
    signup,
    isLoading,
  } = useAuth()

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  })

  // ✅ Navigate ONLY when authUser is set
  useEffect(() => {
    if (authUser) {
      navigate('/dashbord', { replace: true })
    }
  }, [authUser, navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      toast.error('Please fill all required fields')
      return
    }

    try {
      if (isSignup) {
        await signup(formData)
      } else {
        await login({
          email: formData.email,
          password: formData.password,
        })
      }
    } catch (error) {
      toast.error(error?.message || 'Authentication failed')
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '450px' }}>
        <h3 className="text-center mb-4">
          {isSignup ? 'Sign Up' : 'Login'}
        </h3>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="form-control"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <QButton
            title={isSignup ? 'Register' : 'Login'}
            fullWidth
            disabled={isLoading}
            loading={isLoading}
          />

          <Typography variant="body2" style={{ marginTop: 16, textAlign: 'center' }}>
            {isSignup ? (
              <>Already have an account? <Link to="/">Login</Link></>
            ) : (
              <>Don’t have an account? <Link to="/signup">Sign Up</Link></>
            )}
          </Typography>
        </form>
      </div>
    </div>
  )
}

export default AuthForm
