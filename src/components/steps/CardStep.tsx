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

import axios from 'axios'

const AXIOS = axios.create({ baseURL: '/backend/transactions' })

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
      await Promise.all([
        (async () => {
          let continuationTransactions: string | null | undefined

          // continue fetching data until there's no continuation - null value
          while (continuationTransactions !== null) {
            try {
              const {
                data: {
                  continuation: nextContinuationTransactions,
                  transactions
                }
              } = await AXIOS.get(`/transactions/${address}`, {
                params: {
                  continuation: continuationTransactions
                }
              })

              const promises = []

              if (state.totalBought) {
                promises.push(
                  (async () => {
                    const { data: totalBought } = await AXIOS.post(
                      `/total-bought/${address}`,
                      {
                        transactions
                      }
                    )
                    appendData({ totalBought })
                  })()
                )
              }

              if (state.totalSold) {
                promises.push(
                  (async () => {
                    const { data: totalSold } = await AXIOS.post(
                      `/total-sold/${address}`,
                      {
                        transactions
                      }
                    )
                    appendData({ totalSold })
                  })()
                )
              }

              if (state.biggestPurchase) {
                promises.push(
                  (async () => {
                    const { data: biggestPurchase } = await AXIOS.post(
                      `/biggest-purchase/${address}`,
                      {
                        transactions
                      }
                    )
                    appendData({ biggestPurchase })
                  })()
                )
              }

              if (state.biggestSale) {
                promises.push(
                  (async () => {
                    const { data: biggestSale } = await AXIOS.post(
                      `/biggest-sale/${address}`,
                      {
                        transactions
                      }
                    )
                    appendData({ biggestSale })
                  })()
                )
              }

              if (state.totalBoughtInETH) {
                promises.push(
                  (async () => {
                    const { data: totalBoughtInETH } = await AXIOS.post(
                      `/total-bought-in-eth/${address}`,
                      {
                        transactions
                      }
                    )
                    appendData({ totalBoughtInETH })
                  })()
                )
              }

              if (state.totalSoldInETH) {
                promises.push(
                  (async () => {
                    const { data: totalSoldInETH } = await AXIOS.post(
                      `/total-sold-in-eth/${address}`,
                      {
                        transactions
                      }
                    )
                    appendData({ totalSoldInETH })
                  })()
                )
              }

              if (state.totalSpentOnMint) {
                promises.push(
                  (async () => {
                    const { data: totalSpentOnMint } = await AXIOS.post(
                      `/total-spent-on-mint/${address}`,
                      {
                        transactions
                      }
                    )
                    appendData({ totalSpentOnMint })
                  })()
                )
              }

              if (state.totalNFTsMinted) {
                promises.push(
                  (async () => {
                    const { data: totalNFTsMinted } = await AXIOS.post(
                      `/total-minted/${address}`,
                      {
                        transactions
                      }
                    )
                    appendData({ totalNFTsMinted })
                  })()
                )
              }

              if (state.avgHoldTime) {
                promises.push(
                  (async () => {
                    const {
                      data: { avgHoldTime, holdTransactions }
                    } = await AXIOS.post(`/average-hold-time/${address}`, {
                      transactions
                    })
                    appendData({ avgHoldTime, holdTransactions })
                  })()
                )
              }

              await Promise.all(promises)

              // update continuation values, if backend did not return it - set it to null
              continuationTransactions = nextContinuationTransactions ?? null
            } catch (e) {
              console.error(e)
              break
            }
          }
        })(),
        (async () => {
          let continuationContracts: string | null | undefined

          while (continuationContracts !== null) {
            const {
              data: { continuation: nextContinuationContracts, contracts }
            } = await AXIOS.get(`/owned-contracts/${address}`, {
              params: {
                continuation: continuationContracts
              }
            })

            if (state.bluechips) {
              const { data: bluechips } = await AXIOS.post(
                `/bluechips/${address}`,
                {
                  contracts
                }
              )
              appendData({ bluechips })
            }

            continuationContracts = nextContinuationContracts ?? null
          }
        })()
      ])
      // stop fetching
      setLoading(false)
    })()
  }, [address, state])

  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))

  return (
    <>
      <Typography fontFamily="NeueMachina" align="center">
        OGs might need to wait a few minutes.
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
