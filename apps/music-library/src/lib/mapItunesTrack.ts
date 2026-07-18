import type { Song } from '@music-library-app/shared-types'

interface ItunesTrack {
  trackId: number
  trackName: string
  artistName: string
  collectionName: string
  releaseDate: string
}

export function mapItunesTrack(track: ItunesTrack): Song {
  const year = new Date(track.releaseDate).getFullYear().toString()
  return {
    id: track.trackId.toString(),
    title: track.trackName,
    artist: track.artistName,
    album: track.collectionName,
    year
  }
}