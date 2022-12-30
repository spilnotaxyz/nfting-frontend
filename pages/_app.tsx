import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
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
import {
  Box,
  Container,
  ContainerProps,
  CssBaseline,
  Hidden,
  styled
} from '@mui/material'
import { Footer, Header } from '@components/layout'
import { TwitterDataContextProvider } from '@hooks/useTwitterData'

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

const ThemeContainer = styled((props: ContainerProps) => (
  <Container component="main" {...props} />
))(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    marginTop: 0,
    flexGrow: 1
  }
}))

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps
}: MyAppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="twitter:creator" content="@spilnotaxyz" />
        <meta name="twitter:site" content="@spilnotaxyz" />
        <meta name="og:title" content="spilnota.xyz" />
        <meta
          name="og:description"
          content="Celebrate NY Eve with Spilnota! Get your Spilnota Card and share love with the web3 community!"
        />
        <meta name="og:image" content="https://spilnota.xyz/meta_image.png" />
      </Head>
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
                <TwitterDataContextProvider>
                  <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Box display="flex" flexDirection="column" height="100%">
                      <Header />
                      <ThemeContainer
                        sx={{ mt: 4 }}
                        disableGutters
                        maxWidth={false}
                      >
                        <Component {...pageProps} />
                      </ThemeContainer>
                      <Hidden smDown>
                        <Box flexGrow={1} />
                      </Hidden>
                      <Footer />
                    </Box>
                  </ThemeProvider>
                </TwitterDataContextProvider>
              </RainbowKitProvider>
            </RainbowKitSiweNextAuthProvider>
          </WagmiConfig>
        </CacheProvider>
      </SessionProvider>
    </>
  )
}

export default MyApp
