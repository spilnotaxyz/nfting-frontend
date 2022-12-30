import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { GRADIENTS } from '@constants/GRADIENTS'
import { Card, CardBody } from '@ui'
import { Theme, useMediaQuery } from '@mui/material'
import { useCardData, useTwitterData, useGenerateWizardContext } from '@hooks'

export const DummyStep = () => {
  const { data } = useTwitterData()

  const { address } = useAccount()

  const { state, randomColorIndex } = useGenerateWizardContext()

  const { data: cardData, setData } = useCardData()
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
          `/api/transactions/${address}` + '?' + params
        )
        const result = await response.json()
        setData(result)
      } finally {
        setLoading(false)
      }
    })()
  }, [address, state, setData])

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
        loading={!data || !data.name || !data.image || !cardData || loading}
        {...(cardData ?? {})}
      />
    </Card>
  )
}
