import { CardBody } from '@components/CardBody'
import { useGenerateWizardContext } from '@hooks/useGenerateWizard'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export const DummyStep = () => {
  const { data } = useSession()

  const { address } = useAccount()

  const { state } = useGenerateWizardContext()

  const [result, setResult] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!address) {
      console.error('address is not defined')
      return
    }
    ;(async () => {
      setLoading(true)
      // create url with query params from state
      const params = new URLSearchParams()

      Object.entries(state).forEach(([key, value]) =>
        params.append(key, value.toString())
      )

      try {
        const response = await fetch(
          `https://api.eve.spilnota.xyz/transactions/${address}` + '?' + params
        )
        const result = await response.json()
        setResult(result)
      } finally {
        setLoading(false)
      }
    })()
  }, [address, state])

  return (
    <CardBody
      username={data?.user.name}
      image={data?.user.image}
      favouriteCommunity={state.favouriteCommunity}
      wish={state.wish}
      whoBroughtMeHere={state.whoBroughtMeHere}
      loading={
        !data || !data.user.name || !data.user.image || !result || loading
      }
      {...(result ?? {})}
    />
  )
}
