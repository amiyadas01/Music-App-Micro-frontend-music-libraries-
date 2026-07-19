import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchSongs } from "../api/fetchSongs";
import { getStoredSongs } from "../mocks/songStore";
import type { Song } from "@music-library-app/shared-types";

// Extend Song type temporarily to include createdAt
interface SongWithTimestamp extends Song {
  createdAt?: number;
}

export function useSongsQuery(term: string) {
  return useQuery<Song[], Error>({
    queryKey: ["songs", term],
    queryFn: async () => {
      const itunesSongs = await fetchSongs(term);
      const adminSongs = getStoredSongs() as SongWithTimestamp[];

      // Sort admin songs by latest added first (createdAt descending)
      const sortedAdminSongs = [...adminSongs].sort(
        (a, b) => (b.createdAt || 0) - (a.createdAt || 0),
      );

      // Place admin songs first, then iTunes songs
      return [...sortedAdminSongs, ...itunesSongs];
    },
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  });
}
