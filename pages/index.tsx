import { Typography, Button, Container, useTheme, Box } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Marquee from 'react-fast-marquee'
import { Link } from '@components'

const Home: NextPage = () => {
  const theme = useTheme()
  return (
    <Box p={1} display="flex" flexDirection="column" height="100%">
      <Container>
        <Head>
          <title>spilnota.xyz</title>
          <meta
            name="description"
            content="Celebrate NY Eve with Spilnota! Get your Spilnota Card and share love with the web3 community!"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Container
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
              sx={{
                px: 7.5,
                py: 4.625,
                fontSize: 22,
                borderRadius: '20px',
                [theme.breakpoints.down('sm')]: {
                  py: 3.125
                }
              }}
            >
              Make your own card
            </Button>
          </Link>
        </Container>
      </Container>
      <Box flexGrow={1} />
      <Marquee gradient={false} speed={60}>
        <Typography
          variant="body1"
          component="p"
          align="center"
          fontFamily="PPMondwest"
          fontSize={212}
          sx={{
            [theme.breakpoints.down('sm')]: {
              fontSize: 100
            }
          }}
        >
          2023 Year NFTing 2023 Year NFTing 2023 Year NFTing 2023 Year NFTing
          &nbsp;
        </Typography>
      </Marquee>
    </Box>
  )
}

export default Home
