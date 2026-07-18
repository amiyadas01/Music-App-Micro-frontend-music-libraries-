declare module "musicLibrary/MusicLibraryApp" {
  const MusicLibraryApp: React.ComponentType<{
    userRole: "admin" | "user" | null;
    token: string | null;
  }>;
  export default MusicLibraryApp;
}
