import React, { Suspense } from "react";
import { useAuth } from "../auth/AuthContext";

const MusicLibraryApp = React.lazy(
  () => import("musicLibrary/MusicLibraryApp"),
);

export const HomePage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet/[0.04] via-white to-white">
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur-xl bg-white/75 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet to-blue flex items-center justify-center shadow-md shadow-violet/20">
              <svg
                className="w-4.5 h-4.5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
                Library
              </p>
              <h1 className="text-sm font-bold text-ink">Wavelength</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user.username}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <Suspense fallback={<div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-violet-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading music library...</p>
        </div>
      </div>}>
        <MusicLibraryApp
          userRole={user.role}
          token=""
        />
      </Suspense>
    </div>
  );
};