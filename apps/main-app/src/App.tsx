import React, { Suspense } from "react";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import { LoginForm } from "./components/LoginForm";

const MusicLibraryApp = React.lazy(
  () => import("musicLibrary/MusicLibraryApp"),
);

function AppContent() {
  const { user, token } = useAuth();
  return (
    <div className="p-6 bg-red-50">
      <h1 className="text-2xl font-bold mb-4">Main App (Host)</h1>
      <LoginForm />
      <div className="mt-6">
        <Suspense fallback={<div>Loading remote...</div>}>
          <MusicLibraryApp
            userRole={user?.role || null}
            token={token || null}
          />
        </Suspense>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
