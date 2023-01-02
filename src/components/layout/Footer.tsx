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
      <a
        href="https://www.producthunt.com/posts/nfting-card-every-action-counts?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-nfting&#0045;card&#0045;every&#0045;action&#0045;counts"
        target="_blank"
        rel="noreferrer"
      >
        {/* eslint-disable-next-line @next/next/no-img-element*/}
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=373150&theme=dark"
          alt="NFTing&#0032;card&#0032;&#0045;&#0032;Every&#0032;action&#0032;counts - Create&#0032;your&#0032;NFTing&#0032;card&#0032;with&#0032;your&#0032;accomplishments | Product Hunt"
          width={250}
          height={54}
        />
      </a>
      <Link href="/privacy-policy">Privacy Policy</Link>
    </Container>
  </Box>
)
