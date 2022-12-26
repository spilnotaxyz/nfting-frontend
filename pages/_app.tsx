import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import type { AppProps } from 'next/app'
import {
  RainbowKitProvider,
  getDefaultWallets,
  darkTheme
} from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { mainnet, goerli } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { SessionProvider } from 'next-auth/react'
import {
  GetSiweMessageOptions,
  RainbowKitSiweNextAuthProvider
} from '@rainbow-me/rainbowkit-siwe-next-auth'
import { Session } from 'next-auth'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '@utils/createEmotionCache'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@theme'
import { Box, Container, CssBaseline } from '@mui/material'
import { Footer, Header } from '@components/layout'

const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : [])
  ],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'Spilnota NY Eve App',
  chains
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider
})

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: 'Sign in to the RainbowKit + SIWE example app'
})

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps<{ session: Session }> {
  emotionCache?: EmotionCache
}

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps
}: MyAppProps) {
  return (
    <SessionProvider refetchInterval={0} session={pageProps.session}>
      <CacheProvider value={emotionCache}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitSiweNextAuthProvider
            getSiweMessageOptions={getSiweMessageOptions}
          >
            <RainbowKitProvider
              theme={darkTheme({
                accentColor: theme.palette.primary.main,
                accentColorForeground: '#000'
              })}
              chains={chains}
            >
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box display="flex" flexDirection="column" height="100%">
                  <Header />
                  <Container sx={{ mt: 4 }} disableGutters maxWidth={false}>
                    <Component {...pageProps} />
                  </Container>
                  <Box flexGrow={1} />
                  <Footer />
                </Box>
              </ThemeProvider>
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </WagmiConfig>
      </CacheProvider>
    </SessionProvider>
  )
}

export default MyApp
