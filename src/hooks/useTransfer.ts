import { useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { transfer } from '../services/transfer'
import type { TransferRequest, TransferResponse } from '../types/transfer'

/**
 * Wraps the transfer mutation with a guard that prevents double submission.
 * - If a transfer is already in-flight, further calls to `mutate` are silently dropped.
 * - The button should also be `disabled={isPending}` as a visual safeguard.
 */
export function useTransfer() {
    //use ref does not trigger a rerender, no race conditions
  const inFlight = useRef(false)

  const mutation = useMutation<TransferResponse, Error, TransferRequest>({
    mutationFn: async (req) => {
      if (inFlight.current) {
        return Promise.reject(new Error('Transfer already in progress'))
      }
      inFlight.current = true
      try {
        const result = await transfer(req)
        return result
      } catch (err) {
        inFlight.current = false
        throw err
      }
    },
    onSettled() {
      inFlight.current = false
    },
  })

  const safeMutate = (req: TransferRequest) => {
    if (inFlight.current || mutation.isPending) return
    mutation.mutate(req)
  }

  return {
    mutate: safeMutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  }
}
