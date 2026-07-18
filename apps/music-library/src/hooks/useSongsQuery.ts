import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchSongs } from "../api/fetchSongs";
import { getStoredSongs } from "../mocks/songStore";
import type { Song } from "@music-library-app/shared-types";

export function useSongsQuery(term: string) {
  return useQuery<Song[], Error>({
    queryKey: ["songs", term],
    queryFn: async () => {
      const itunesSongs = await fetchSongs(term);
      const adminSongs = getStoredSongs();
      return [...itunesSongs, ...adminSongs];
    },
    // Keep last term's results on screen while the new term is in flight.
    // Without this, every debounced keystroke drops `data` back to
    // undefined, `isLoading` flips true, and the whole page re-mounts the
    // skeleton — even though the user is just refining a search.
    placeholderData: keepPreviousData,
    // A repeated search within a minute reuses the cached result instead
    // of re-hitting the iTunes API.
    staleTime: 60_000,
  });
}
