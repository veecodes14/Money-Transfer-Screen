import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { login, type Credentials } from '../services/auth'

type User = Awaited<ReturnType<typeof login>>

export function useAuth(options?: {
  onSuccess?: (user: User) => void
  onError?: (err: unknown) => void
}): UseMutationResult<User, Error, Credentials> {
  return useMutation<User, Error, Credentials>({
    mutationFn: (creds: Credentials) => login(creds),
    onSuccess(data: User) {
      options?.onSuccess?.(data)
    },
    onError(err: Error) {
      options?.onError?.(err)
    },
  })
}