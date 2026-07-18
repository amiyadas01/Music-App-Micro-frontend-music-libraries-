import React from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../auth/AuthContext'

interface LoginFormInputs {
  username: string
  password: string
}

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormInputs>()
  const { login, user, logout } = useAuth()

  const onSubmit = handleSubmit((data) => {
    const success = login(data.username, data.password)
    if (!success) {
      setError('root', { message: 'Invalid credentials' })
    }
  }

  if (user) {
    return (
      <div className="p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
        <p className="mb-2">
          Logged in as <strong>{user.username}</strong> (role: {user.role})
        </p>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
        >
          Logout
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
      <h3 className="text-lg font-bold mb-4">Login</h3>
      <div className="mb-3">
        <label className="block mb-1 text-sm">Username</label>
        <input
          {...register('username', { required: 'Username is required' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
        {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
      </div>
      <div className="mb-3">
        <label className="block mb-1 text-sm">Password</label>
        <input
          type="password"
          {...register('password', { required: 'Password is required' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
      </div>
      {errors.root && <p className="text-red-500 text-xs mb-3">{errors.root.message}</p>}
      <button
        type="submit" className="w-full px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600">
        Login
      </button>
      <p className="mt-2 text-xs text-gray-500">
          Demo users: admin/admin123 (admin), user/user123 (user)
        </p>
    </form>
  )
}
