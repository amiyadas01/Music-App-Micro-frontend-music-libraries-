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

export function useAddSongMutation() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: addSong,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songs'] })
    },
  })
}
