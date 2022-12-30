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
                bgcolor: '#C9CEFF',
                padding: '18px 20px',
                borderRadius: 40,
                [theme.breakpoints.down('sm')]: {
                  padding: '8px 10px'
                }
              }}
              href="/"
            >
              <Logo />
            </Link>
            <Box sx={{ flexGrow: 1 }} />
            <Link
              sx={{
                color: '#000',
                bgcolor: '#F6FFD3',
                padding: '18px 20px',
                borderRadius: 40,
                fontFamily: 'NeueMachina',
                fontSize: '1.2rem',
                [theme.breakpoints.down('sm')]: {
                  fontSize: '0.9rem',
                  padding: '8px 10px'
                }
              }}
              href="https://spilnota.notion.site/Introduction-to-Spilnota-4108c9f28b3741ebb46fc1308f3fcb87"
              target="_blank"
            >
              About
            </Link>
          </Toolbar>
        </AppBar>
      </Container>
    </Box>
  )
}
