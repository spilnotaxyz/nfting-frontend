import { Box, Container, Typography } from '@mui/material'

export const Footer = () => (
  <Box p={2}>
    <Container
      component="footer"
      maxWidth="xl"
      sx={{ pb: 1, pt: 1, borderTop: '1px solid rgba(255, 255, 255, 0.6)' }}
      disableGutters
    >
      <Typography variant="body1">spilnota.xyz © 2022</Typography>
    </Container>
  </Box>
)
