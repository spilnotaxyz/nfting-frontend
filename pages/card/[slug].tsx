import { GRADIENTS } from '@constants'
import { Button, Container, Link, Unstable_Grid2 as Grid } from '@mui/material'
import { Card, CardBody, CardBodyProps } from '@ui'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const CardPage: NextPage = () => {
  const [cardProps, setCardProps] = useState<
    CardBodyProps & { gradientIndex: number }
  >()
  const { query } = useRouter()
  useEffect(() => {
    ;(async () => {
      if (query.slug)
        setCardProps(await (await fetch('/backend/card/' + query.slug)).json())
    })()
  }, [query.slug])
  // use media query
  return (
    <Container maxWidth="xl" sx={{ height: '100%' }}>
      <Grid container justifyContent="center" spacing={5}>
        <Grid xs={12} display="flex" justifyContent="center">
          <Link
            href="/generate"
            sx={{ '&:hover': { textDecoration: 'none !important' } }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 7.5,
                py: 4.625,
                fontSize: 22,
                borderRadius: '20px'
              }}
            >
              Make your own card
            </Button>
          </Link>
        </Grid>
        <Grid xs={12} md={6}>
          <Card
            sx={{
              background: cardProps?.gradientIndex
                ? GRADIENTS[cardProps.gradientIndex]
                : 'inherit',
              borderRadius: '40px',
              borderWidth: 4,
              boxShadow: 'inset 0px 0px 0px 4px rgba(255, 255, 255, 0.2)',
              p: 'auto'
            }}
          >
            <CardBody loading={!cardProps} {...(cardProps ?? {})} />
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default CardPage
