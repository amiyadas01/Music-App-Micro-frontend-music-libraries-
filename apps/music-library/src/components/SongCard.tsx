import type { Song } from "@music-library-app/shared-types";
import { useDeleteSongMutation } from "../hooks/useDeleteSongMutation";

interface SongCardProps {
  song: Song;
  userRole: "admin" | "user" | null;
}

export function SongCard({ song, userRole }: SongCardProps) {
  const deleteMutation = useDeleteSongMutation();

  return (
    <div className="group rounded-2xl border border-gray-100 bg-white hover:border-transparent hover:shadow-xl hover:shadow-violet/10 transition-all duration-300 overflow-hidden flex items-center p-4 gap-4">
      <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-violet/10 via-blue/10 to-coral/10 flex items-center justify-center relative overflow-hidden rounded-xl">
        {/* Vinyl disc — spins gently on hover */}
        <div className="relative w-12 h-12 rounded-full bg-ink/90 flex items-center justify-center shadow-inner group-hover:animate-[spin_3s_linear_infinite] transition-transform">
          <div className="absolute inset-1 rounded-full border border-white/10" />
          <div className="absolute inset-2.5 rounded-full border border-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-violet to-coral" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-ink line-clamp-1 group-hover:text-violet transition-colors">
          {song.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{song.artist}</p>
        <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
          {song.album}
        </p>
      </div>
      {userRole === "admin" && (
        <button
          onClick={() => deleteMutation.mutate(song.id)}
          disabled={deleteMutation.isPending}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
