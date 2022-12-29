import { useGenerateWizardContext } from '@hooks/useGenerateWizard'
import { useTwitterData } from '@hooks/useTwitterData'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { GRADIENTS } from '@constants/GRADIENTS'
import { Card, CardBody } from '@ui'
import { Theme, useMediaQuery } from '@mui/material'

export const DummyStep = () => {
  const { data } = useTwitterData()

  const { address } = useAccount()

  const { state, randomColorIndex } = useGenerateWizardContext()

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

  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))

  return (
    <Card
      sx={{
        background: GRADIENTS[randomColorIndex],
        borderRadius: isMobile ? '30px' : '40px',
        borderWidth: 4,
        boxShadow: 'inset 0px 0px 0px 4px rgba(255, 255, 255, 0.2)',
        p: "'auto' !important"
      }}
    >
      <CardBody
        username={data?.name}
        image={data?.image}
        favouriteCommunity={state.favouriteCommunity}
        wish={state.wish}
        whoBroughtMeHere={state.whoBroughtMeHere}
        loading={!data || !data.name || !data.image || !result || loading}
        {...(result ?? {})}
      />
    </Card>
  )
}
