import { CardBody, CardBodyProps } from '@components/CardBody'
import { Container, useTheme } from '@mui/material'
import { BlurredPaper } from '@ui/BlurredPaper'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Cards: NextPage = () => {
  const [cardProps, setCardProps] = useState<CardBodyProps>()
  const { query } = useRouter()
  useEffect(() => {
    ;(async () => {
      if (query.slug)
        setCardProps(
          await (
            await fetch('https://api.eve.spilnota.xyz/card/' + query.slug)
          ).json()
        )
    })()
  }, [query.slug])
  const theme = useTheme()
  // use media query
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <BlurredPaper
        sx={{
          borderRadius: '40px',
          borderWidth: 4,
          boxShadow: 'inset 0px 0px 0px 4px rgba(255, 255, 255, 0.2)',
          p: 'auto',
          flexGrow: '1',
          minHeight: 585,
          maxWidth: 675,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          [theme.breakpoints.down('sm')]: {
            minHeight: 'auto'
          }
        }}
      >
        <CardBody loading={!cardProps} {...(cardProps ?? {})} />
      </BlurredPaper>
    </Container>
  )
}

export default Cards
