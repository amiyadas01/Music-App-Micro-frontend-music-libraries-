import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MusicLibraryApp from "./MusicLibraryApp.tsx";

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    return worker.start();
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <MusicLibraryApp userRole="admin" token="dummy" />
    </StrictMode>,
  );
});
