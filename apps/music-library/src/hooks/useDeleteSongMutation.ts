import { useMutation, useQueryClient } from '@tanstack/react-query'

async function deleteSong(id: string): Promise<void> {
  const response = await fetch(`/songs/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) throw new Error('Failed to delete song')
}

interface UseDeleteSongMutationArgs {
  userRole: 'admin' | 'user' | null
}

export function useDeleteSongMutation({ userRole }: UseDeleteSongMutationArgs = { userRole: null }) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => {
      if (userRole !== 'admin') {
        throw new Error('Only admin can delete songs')
      }
      return deleteSong(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songs'] })
    },
  })
}
