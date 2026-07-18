import type { Song } from '@music-library-app/shared-types'

const STORAGE_KEY = 'music-library:admin-songs'

export function getStoredSongs(): Song[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Failed to load stored songs:', error)
    return []
  }
}

export function addStoredSong(song: Omit<Song, 'id'>): Song {
  const storedSongs = getStoredSongs()
  const newSong: Song = {
    ...song,
    id: crypto.randomUUID()
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...storedSongs, newSong]))
  return newSong
}

export function removeStoredSong(id: string): void {
  const storedSongs = getStoredSongs()
  const filteredSongs = storedSongs.filter(song => song.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredSongs))
}
