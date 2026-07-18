import { useMemo } from "react";
import { sortSongs } from "../lib/songTransforms";
import { SongCard } from "./SongCard";
import type { Song } from "@music-library-app/shared-types";

interface SongListProps {
  title: string;
  songs: Song[];
  userRole: "admin" | "user" | null;
}

export function SongList({ title, songs, userRole }: SongListProps) {
  const sortedSongs = useMemo(() => sortSongs(songs, "title", "asc"), [songs]);

  return (
    <div className="mb-10">
      <div className="flex items-center gap-2.5 mb-4">
        <span className="w-1.5 h-1.5 bg-violet rounded-full"></span>
        <h2 className="text-base font-bold text-ink tracking-tight">{title}</h2>
        <span className="text-xs font-medium text-gray-400">
          {sortedSongs.length}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {sortedSongs.map((song) => (
          <SongCard key={song.id} song={song} userRole={userRole} />
        ))}
      </div>
    </div>
  );
}
