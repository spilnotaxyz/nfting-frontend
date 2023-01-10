import {
  AppBar,
  Box,
  Toolbar,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { Logo } from '@ui/branding'
import { Link } from '@components'

export const Header = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery<typeof theme>(theme.breakpoints.down('sm'))
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
          <Toolbar
            disableGutters
            variant="dense"
            sx={{ justifyContent: 'space-between' }}
          >
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
            <a
              href="https://www.producthunt.com/posts/nfting-card?utm_source=badge-top-post-topic-badge&utm_medium=badge&utm_souce=badge-nfting&#0045;card"
              target="_blank"
              rel="noreferrer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element*/}
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/top-post-topic-badge.svg?post_id=373150&theme=dark&period=weekly&topic_id=501"
                alt="NFTing&#0032;Card - Create&#0032;your&#0032;NFTing&#0032;card&#0032;with&#0032;your&#0032;accomplishments | Product Hunt"
                style="width: 250px; height: 54px;"
                width={isMobile ? 'auto' : 250}
                height={isMobile ? 30 : 54}
              />
            </a>
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
