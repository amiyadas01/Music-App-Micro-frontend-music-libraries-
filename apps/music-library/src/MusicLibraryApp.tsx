import { useState, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDebouncedCallback } from "./hooks/useDebounced";
import { useSongsQuery } from "./hooks/useSongsQuery";
import { filterSongsByText } from "./lib/songTransforms";
import { SongSearchInput } from "./components/SongSearchInput";
import { GroupTabs } from "./components/GroupTabs";
import { AddSongForm } from "./components/AddSongForm";
import { SkeletonLoader } from "./components/SkeletonLoader";

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    return worker.start();
  }
}

enableMocking();

const queryClient = new QueryClient();

const DEFAULT_SEARCH_TERM = "top hits";

// Signature motion primitives used by the search equalizer + skeleton shimmer.
// Defined once, globally, so any component can reference them.
function GlobalKeyframes() {
  return (
    <style>{`
      @keyframes eq-bounce {
        0%, 100% { transform: scaleY(0.35); }
        50% { transform: scaleY(1); }
      }
      @keyframes shimmer {
        100% { transform: translateX(200%); }
      }
    `}</style>
  );
}

interface MusicLibraryContentProps {
  userRole: "admin" | "user" | null;
  token: string | null;
}

function MusicLibraryContent({
  userRole,
  token: _token,
}: MusicLibraryContentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [queryTerm, setQueryTerm] = useState(DEFAULT_SEARCH_TERM);
  const [activeGroup, setActiveGroup] = useState<
    "all" | "album" | "artist" | "title"
  >("all");
  const debouncedSetQueryTerm = useDebouncedCallback((term: string) => {
    setQueryTerm(term.trim() === "" ? DEFAULT_SEARCH_TERM : term);
  }, 300);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    debouncedSetQueryTerm(term);
  };

  const { data, isLoading, isFetching, isError } = useSongsQuery(queryTerm);

  const filteredSongs = useMemo(() => {
    if (!data) return [];
    // Only filter if user has actually typed something
    if (searchTerm.trim() === "") return data;
    // Map active group to filter field
    const filterField: "all" | "title" | "artist" | "album" =
      activeGroup === "all" ? "all" : activeGroup;
    return filterSongsByText(data, searchTerm, filterField);
  }, [data, searchTerm, activeGroup]);

  const hasActualSearch = searchTerm.trim() !== "";
  const hasNoResults = hasActualSearch && filteredSongs.length === 0;

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (isError) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-coral"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-ink mb-2">
            Oops, something went wrong
          </h2>
          <p className="text-gray-500">
            We couldn't load the songs. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet/[0.04] via-white to-white">
      <main className="max-w-7xl mx-auto p-6">
        {/* Search and Add Song */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex-1 max-w-xl w-full">
            <SongSearchInput
              value={searchTerm}
              onChange={handleSearchChange}
              isSearching={isFetching}
            />
          </div>
          <AddSongForm userRole={userRole} />
        </div>

        {hasActualSearch && (
          <p className="text-sm text-gray-500 mb-6" role="status">
            {filteredSongs.length === 0
              ? `No matches for “${searchTerm}”`
              : `${filteredSongs.length} song${filteredSongs.length === 1 ? "" : "s"} matching “${searchTerm}”`}
          </p>
        )}

        {hasNoResults ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0a7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-ink mb-2">
                No songs found
              </h2>
              <p className="text-gray-500">
                We couldn't find anything matching "{searchTerm}". Try a
                different search term!
              </p>
            </div>
          </div>
        ) : (
          <GroupTabs
            songs={filteredSongs}
            activeGroup={activeGroup}
            onGroupChange={setActiveGroup}
            userRole={userRole}
          />
        )}
      </main>
    </div>
  );
}

interface MusicLibraryAppProps {
  userRole: "admin" | "user" | null;
  token: string | null;
}

export default function MusicLibraryApp({
  userRole,
  token,
}: MusicLibraryAppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalKeyframes />
      <MusicLibraryContent userRole={userRole} token={token} />
    </QueryClientProvider>
  );
}
