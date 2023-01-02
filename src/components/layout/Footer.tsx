import { Link } from '@components/Link'
import { Box, Container, Typography } from '@mui/material'

export const Footer = () => (
  <Box p={2} pb={0}>
    <Container
      component="footer"
      maxWidth="xl"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        pb: 1,
        pt: 1,
        borderTop: '1px solid rgba(255, 255, 255, 0.6)'
      }}
      disableGutters
    >
      <Typography variant="body1">spilnota.xyz © 2022</Typography>

      <Link href="/privacy-policy">Privacy Policy</Link>
    </Container>
  </Box>
)
