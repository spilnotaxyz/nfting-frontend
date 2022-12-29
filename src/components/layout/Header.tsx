import { AppBar, Box, Toolbar, Container, useTheme } from '@mui/material'
import { Logo } from '@ui/branding'
import { Link } from '@components'

export const Header = () => {
  const theme = useTheme()

  return (
    <Box p={2}>
      <Container
        maxWidth="xl"
        sx={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.6)',
          paddingBottom: 2
        }}
        disableGutters
      >
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar disableGutters variant="dense">
            <Link
              sx={{
                lineHeight: 0,
                padding: '18px 20px',
                backgroundColor: '#C9CEFF',
                borderRadius: 40,
                [theme.breakpoints.down('sm')]: {
                  padding: '10px 15px'
                }
              }}
              href="/"
            >
              <Logo />
            </Link>
            <Box sx={{ flexGrow: 1 }} />
            <Link
              sx={{
                fontFamily: 'NeueMachina',
                fontSize: '1.2rem',
                color: '#000',
                padding: '15px 30px',
                bgcolor: '#F6FFD3',
                borderRadius: 40,
                [theme.breakpoints.down('sm')]: {
                  fontSize: '0.8rem',
                  padding: '10px 15px'
                }
              }}
              href="/about"
            >
              About
            </Link>
          </Toolbar>
        </AppBar>
      </Container>
    </Box>
  )
}
