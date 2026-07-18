import { useMemo } from "react";
import { groupSongsBy } from "../lib/songTransforms";
import { SongList } from "./SongList";
import type { Song } from "@music-library-app/shared-types";

interface GroupTabsProps {
  songs: Song[];
  activeGroup: "all" | "album" | "artist" | "title";
  onGroupChange: (group: "all" | "album" | "artist" | "title") => void;
}

const GROUP_LABELS: Record<"all" | "album" | "artist" | "title", string> = {
  all: "All",
  album: "Album",
  artist: "Artist",
  title: "Title",
};

export function GroupTabs({
  songs,
  activeGroup,
  onGroupChange,
}: GroupTabsProps) {
  const groups = useMemo(
    () => ({
      album: groupSongsBy(songs, "album"),
      artist: groupSongsBy(songs, "artist"),
      title: groupSongsBy(songs, "title"),
    }),
    [songs],
  );

  // When active group is "all", just show all songs in a single list
  if (activeGroup === "all") {
    return (
      <div>
        {/* Mobile: styled dropdown */}
        <div className="md:hidden mb-6">
          <div className="relative">
            <select
              value={activeGroup}
              onChange={(e) => onGroupChange(e.target.value as any)}
              className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-ink bg-white focus:border-violet focus:outline-none focus:ring-4 focus:ring-violet/10 transition-all appearance-none cursor-pointer font-medium shadow-sm"
            >
              <option value="all">All</option>
              <option value="album">Album</option>
              <option value="artist">Artist</option>
              <option value="title">Title</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Desktop: segmented control */}
        <div className="hidden md:inline-flex mb-8 p-1 bg-gray-100/80 rounded-2xl gap-1">
          {(["all", "album", "artist", "title"] as const).map((group) => (
            <button
              key={group}
              onClick={() => onGroupChange(group)}
              className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                activeGroup === group
                  ? "bg-white text-violet shadow-sm shadow-violet/10"
                  : "text-gray-500 hover:text-ink"
              }`}
            >
              {GROUP_LABELS[group]}
            </button>
          ))}
        </div>

        <SongList title="All Songs" songs={songs} />
      </div>
    );
  }

  return (
    <div>
      {/* Mobile: styled dropdown */}
      <div className="md:hidden mb-6">
        <div className="relative">
          <select
            value={activeGroup}
            onChange={(e) => onGroupChange(e.target.value as any)}
            className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-ink bg-white focus:border-violet focus:outline-none focus:ring-4 focus:ring-violet/10 transition-all appearance-none cursor-pointer font-medium shadow-sm"
          >
            <option value="all">All</option>
            <option value="album">Album</option>
            <option value="artist">Artist</option>
            <option value="title">Title</option>
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Desktop: segmented control */}
      <div className="hidden md:inline-flex mb-8 p-1 bg-gray-100/80 rounded-2xl gap-1">
        {(["all", "album", "artist", "title"] as const).map((group) => (
          <button
            key={group}
            onClick={() => onGroupChange(group)}
            className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
              activeGroup === group
                ? "bg-white text-violet shadow-sm shadow-violet/10"
                : "text-gray-500 hover:text-ink"
            }`}
          >
            {GROUP_LABELS[group]}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-8">
        {(["album", "artist", "title"] as const).map((group) => (
          <div key={group}>
            {Object.entries(groups[group])
              .slice(0, 4)
              .map(([title, groupSongs]) => (
                <SongList
                  key={`${group}-${title}`}
                  title={title}
                  songs={groupSongs}
                />
              ))}
          </div>
        ))}
      </div>

      <div className="md:hidden">
        {Object.entries(groups[activeGroup]).map(([title, groupSongs]) => (
          <SongList
            key={`${activeGroup}-${title}`}
            title={title}
            songs={groupSongs}
          />
        ))}
      </div>
    </div>
  );
}
