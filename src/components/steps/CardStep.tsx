import { useEffect } from 'react'
import { GRADIENTS } from '@constants/GRADIENTS'
import { Card, CardBody } from '@ui'
import { Theme, Typography, useMediaQuery } from '@mui/material'
import {
  useCardData,
  useTwitterData,
  useAddressData,
  useGenerateWizardContext
} from '@hooks'

export const DummyStep = () => {
  const { data } = useTwitterData()

  const { address } = useAddressData()

  const { state, randomColorIndex } = useGenerateWizardContext()

  const { data: cardData, appendData, loading, setLoading } = useCardData()

  // data fetch effect
  useEffect(() => {
    if (!address) {
      console.error('address is not defined')
      return
    }

    ;(async () => {
      setLoading(true)

      // object to store continuation values, if there's page continuation
      let continuations: {
        continuationContracts?: string | null
        continuationTransactions?: string | null
      } = {}

      // continue fetching data until there's no continuation - null value
      while (
        continuations.continuationContracts !== null ||
        continuations.continuationTransactions !== null
      ) {
        // create url with query params from state
        const params = new URLSearchParams()

        Object.entries(state).forEach(([key, value]) =>
          params.append(key, value.toString())
        )

        // add continuation if there's any
        if (continuations.continuationContracts)
          params.append(
            'continuationContracts',
            continuations.continuationContracts
          )

        if (continuations.continuationTransactions)
          params.append(
            'continuationTransactions',
            continuations.continuationTransactions
          )

        try {
          const response = await fetch(
            `/backend/transactions/${address}` + '?' + params
          )
          const { continuationContracts, continuationTransactions, ...result } =
            await response.json()
          appendData(result)

          // update continuation values, if backend did not return it - set it to null
          continuations = {
            continuationContracts: continuationContracts ?? null,
            continuationTransactions: continuationTransactions ?? null
          }
        } catch (e) {
          console.error(e)
        }
      }
      // stop fetching
      setLoading(false)
    })()
  }, [address, state])

  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))

  return (
    <>
      <Typography fontFamily="NeueMachina" align="center">
        OGs might need to wait a few minutes.{' '}
      </Typography>
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
          loading={!data || !data.name || !data.image || loading}
          {...cardData}
        />
      </Card>
    </>
  )
}
