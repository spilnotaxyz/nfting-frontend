import { Box, Typography, Button, Container } from '@mui/material'
import type { GetServerSideProps, NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth'
import Head from 'next/head'
import { getAuthOptions } from './api/auth/[...nextauth]'
import { Snow } from '@ui'
import Marquee from 'react-fast-marquee'

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      session: await unstable_getServerSession(req, res, getAuthOptions(req))
    }
  }
}

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

        <main>
          <Typography variant="h2" component="h1" gutterBottom align="center">
            Create your own сard which sums up all your
            <br /> year activity and statistics. Share with friends wishing the
            <br /> best in New Year.
            <br />
          </Typography>
          <Box display="flex" justifyContent="center">
            <Snow />
          </Box>

          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{ p: 2, mt: 5 }}
          >
            Make my own card ✨
          </Button>
        </main>
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
