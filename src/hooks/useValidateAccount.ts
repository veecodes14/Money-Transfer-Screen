import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { validateAccount } from '../services/transfer'

export function useValidateAccount(accountNumber: string, bankCode: string) {
  const [debouncedAccount, setDebouncedAccount] = useState(accountNumber)

  // Debounce account number changes by 600ms
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedAccount(accountNumber), 600)
    return () => clearTimeout(timer)
  }, [accountNumber])

  const isPendingDebounce =
    accountNumber !== debouncedAccount && accountNumber.length === 10

  const isReady = debouncedAccount.length === 10 && bankCode.length > 0

  const query = useQuery({
    queryKey: ['validate-account', debouncedAccount, bankCode],
    queryFn: () => validateAccount({ accountNumber: debouncedAccount, bankCode }),
    enabled: isReady,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 min cache
  })

  const isValidating = isPendingDebounce || (isReady && query.isFetching)

  return {
    accountName: query.data?.accountName ?? null,
    isValidating,
    isError: query.isError,
    validationError: (query.error as Error) ?? null,
    isSuccess: query.isSuccess,
    // True only when we showed a debounced query result for the current inputs
    isReady,
  }
}
