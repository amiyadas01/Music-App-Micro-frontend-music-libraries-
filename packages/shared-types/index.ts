export interface Song {
  id: string
  title: string
  artist: string
  album: string
  year: string
}

export interface User {
  username: string
  role: 'admin' | 'user'
}