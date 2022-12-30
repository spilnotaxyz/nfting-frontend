import {
  Typography,
  Button,
  Container,
  useTheme,
  Box,
  Hidden,
  BoxProps,
  TypographyProps
} from '@mui/material'
import type { NextPage } from 'next'
import Marquee from 'react-fast-marquee'
import { Link } from '@components'
import Image from 'next/image'

const RunningText = (props: BoxProps) => {
  const theme = useTheme()
  return (
    <Box {...props}>
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
          {'2023 Every action counts '.repeat(6)}
          &nbsp;
        </Typography>
      </Marquee>
    </Box>
  )
}

const Generate = ({ fullWidth }: { fullWidth?: boolean }) => {
  const theme = useTheme()
  return (
    <Link
      href="/generate"
      sx={{
        '&:hover': { textDecoration: 'none !important' },
        mt: 3.75,
        ...(fullWidth ? { width: '100%' } : {})
      }}
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
        fullWidth={fullWidth}
      >
        Make your own card
      </Button>
    </Link>
  )
}

const MainText = (props: TypographyProps) => {
  return (
    <Typography
      variant="h2"
      component="h1"
      gutterBottom
      sx={{ maxWidth: 875 }}
      align="center"
      {...props}
    >
      Create your NFTing card which sums up your previous on-chain Ethereum
      activity. Share with friends, add your wishes and appreciation.
    </Typography>
  )
}
const Home: NextPage = () => {
  return (
    <Box p={1} display="flex" flexDirection="column" height="100%">
      <Hidden smDown>
        <RunningText mt="-125px" />
      </Hidden>
      <Container maxWidth="xl">
        <Hidden mdUp>
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <MainText />
            <Generate />
          </Container>
        </Hidden>
        <Hidden smDown>
          <MainText align="left" />
        </Hidden>
      </Container>
      <Box flexGrow={1} />
      <Hidden smDown>
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="center" mb={2} mt={2}>
            <Image
              src="/examples.png"
              alt="Examples"
              width={808}
              height={532}
            />
          </Box>

          <Generate fullWidth />
        </Container>
      </Hidden>
      <Hidden mdUp>
        <RunningText />
      </Hidden>
    </Box>
  )
}

export default Home
