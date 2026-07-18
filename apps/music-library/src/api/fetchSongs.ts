import { mapItunesTrack } from "../lib/mapItunesTrack";
import type { Song } from "@music-library-app/shared-types";

interface ItunesResponse {
  results: Array<{
    trackId: number;
    trackName: string;
    artistName: string;
    collectionName: string;
    releaseDate: string;
  }>;
}

export async function fetchSongs(term: string): Promise<Song[]> {
  const response = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song`,
  );
  const data: ItunesResponse = await response.json();
  return data.results.map(mapItunesTrack);
}