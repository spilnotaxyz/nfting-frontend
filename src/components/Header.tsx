import { AppBar, Box, Toolbar, Container } from '@mui/material'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Logo } from '@ui/branding'
import { Link } from '@components'

export const Header = () => (
  <Box p={2}>
    <Container
      maxWidth="xl"
      sx={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.6)'
      }}
      disableGutters
    >
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar disableGutters variant="dense">
          <Link sx={{ lineHeight: 0 }} href="/">
            <Logo />
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <ConnectButton />
        </Toolbar>
      </AppBar>
    </Container>
  </Box>
)
