import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

interface LoginFormInputs {
  username: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormInputs>();
  const { login, user, logout } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    const success = login(data.username, data.password);
    if (!success) {
      setError("root", { message: "Invalid credentials" });
    } else {
      navigate("/");
    }
  });

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
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-3xl shadow-2xl p-8">
      <div className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            {...register("username", { required: "Username is required" })}
            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-violet focus:outline-none focus:ring-4 focus:ring-violet/10 transition-all"
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-violet focus:outline-none focus:ring-4 focus:ring-violet/10 transition-all"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {errors.root && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-2xl">
            <p className="text-red-500 text-sm">{errors.root.message}</p>
          </div>
        )}

        <button
          type="submit"
          className="w-full px-6 py-3 bg-violet-500 text-white rounded-2xl font-semibold hover:bg-violet-600 transition-all duration-300 shadow-lg shadow-violet-200"
        >
          Sign in
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Demo users:{" "}
            <span className="font-medium text-gray-700">admin/admin123</span>{" "}
            (admin),{" "}
            <span className="font-medium text-gray-700">user/user123</span>{" "}
            (user)
          </p>
        </div>
      </div>
    </form>
  );
};
