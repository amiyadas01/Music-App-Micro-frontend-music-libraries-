import type { Song } from "@music-library-app/shared-types";

export function groupSongsBy(
  songs: Song[],
  key: "album" | "artist" | "title",
): Record<string, Song[]> {
  return songs.reduce(
    (acc, song) => {
      const groupKey = song[key];
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(song);
      return acc;
    },
    {} as Record<string, Song[]>,
  );
}

// Exception to map/filter/reduce - reduce-based sort adds no value here
export function sortSongs(
  songs: Song[],
  key: "title" | "artist" | "year",
  direction: "asc" | "desc",
): Song[] {
  return [...songs].sort((a, b) => {
    const aVal = a[key].toLowerCase();
    const bVal = b[key].toLowerCase();

    if (aVal < bVal) {
      return direction === "asc" ? -1 : 1;
    }
    if (aVal > bVal) {
      return direction === "asc" ? 1 : -1;
    }
    return 0;
  });
}

export function filterSongsByText(
  songs: Song[],
  query: string,
  field?: "title" | "artist" | "album" | "all",
): Song[] {
  if (!query.trim()) return songs;
  const lowerQuery = query.toLowerCase();
  const filterField = field || "all";
  return songs.filter((song) => {
    if (filterField === "all") {
      return (
        song.title.toLowerCase().includes(lowerQuery) ||
        song.artist.toLowerCase().includes(lowerQuery) ||
        song.album.toLowerCase().includes(lowerQuery)
      );
    }
    return song[filterField].toLowerCase().includes(lowerQuery);
  });
}
