import React, { Suspense } from "react";
import { AuthProvider } from "./auth/AuthContext";

const MusicLibraryApp = React.lazy(
  () => import("musicLibrary/MusicLibraryApp"),
);

function App() {
  return (
    <AuthProvider>
      <div className="p-6 bg-red-50">
        <h1 className="text-2xl font-bold mb-4">Main App (Host)</h1>
        <Suspense fallback={<div>Loading remote...</div>}>
          <MusicLibraryApp />
        </Suspense>
      </div>
    </AuthProvider>
  );
}

export default App;
