import { useMutation, useQueryClient } from '@tanstack/react-query'

async function deleteSong(id: string): Promise<void> {
  const response = await fetch(`/songs/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) throw new Error('Failed to delete song')
}

export function useDeleteSongMutation() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteSong,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songs'] })
    },
  })
}
