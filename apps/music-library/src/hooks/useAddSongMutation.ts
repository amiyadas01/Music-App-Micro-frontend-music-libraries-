import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Song } from '@music-library-app/shared-types'

async function addSong(songData: Omit<Song, 'id'>): Promise<Song> {
  const response = await fetch('/songs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(songData),
  })
  if (!response.ok) throw new Error('Failed to add song')
  return response.json()
}

interface UseAddSongMutationArgs {
  userRole: 'admin' | 'user' | null
}

export function useAddSongMutation({ userRole }: UseAddSongMutationArgs = { userRole: null }) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (songData: Omit<Song, 'id'>) => {
      if (userRole !== 'admin') {
        throw new Error('Only admin can add songs')
      }
      return addSong(songData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songs'] })
    },
  })
}
