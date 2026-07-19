import React from "react";
import { useAuth } from "../auth/AuthContext";
import { LoginForm } from "../components/LoginForm";
import { Navigate } from "react-router-dom";

export const LoginPage: React.FC = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-200">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back
          </h1>
          <p className="text-gray-500">Sign in to your account</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};
