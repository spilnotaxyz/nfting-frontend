import { Typography, Button, Container } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Marquee from 'react-fast-marquee'
import { Link } from '@components'

const Home: NextPage = () => {
  return (
    <>
      <Container sx={{ p: 1 }}>
        <Head>
          <title>spilnota.xyz</title>
          <meta
            name="description"
            content="Celebrate NY Eve with Spilnota! Get your Spilnota Card and share love with the web3 community!"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Container
          component="main"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            align="center"
            sx={{ maxWidth: 875 }}
          >
            Create your NFTing card which sums up your previous on-chain
            activity. Share with friends, add your wishes and appreciation.
          </Typography>
          <Link
            href="/generate"
            sx={{ '&:hover': { textDecoration: 'none !important' }, mt: 5 }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{ px: 7.5, py: 4.625, fontSize: 22, borderRadius: '20px' }}
            >
              Make your own card
            </Button>
          </Link>
        </Container>
      </Container>
      <Marquee gradient={false}>
        <Typography
          variant="body1"
          component="p"
          gutterBottom
          align="center"
          fontFamily="PPMondwest"
          fontSize={212}
        >
          2023 Year NFTing 2023 Year NFTing 2023 Year NFTing 2023 Year NFTing
        </Typography>
      </Marquee>
    </>
  )
}

export default Home
