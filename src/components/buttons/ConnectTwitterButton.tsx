import { Twitter } from '@mui/icons-material'
import { signIn } from 'next-auth/react'
import {
  Box,
  Button,
  ButtonProps,
  debounce,
  styled,
  Theme,
  Typography,
  useMediaQuery
} from '@mui/material'
import { useTwitterData } from '@hooks/useTwitterData'
import { Input } from '@ui/Input'
import { useAccount } from 'wagmi'

export const ConnectTwitterButton = styled((props: ButtonProps) => {
  const { data, setData } = useTwitterData()
  const { isConnected } = useAccount()
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))

  if (isMobile)
    return (
      <>
        <Box
          display="flex"
          justifyContent="space-between"
          flexWrap={isMobile ? 'wrap' : 'nowrap'}
          alignItems="center"
        >
          <Typography
            variant="body1"
            color="white"
            mb={isMobile ? 1.25 : 'auto'}
          >
            Please, type your Twitter handle
          </Typography>
          <Input
            required
            placeholder="@me"
            disabled={!isConnected}
            onChange={debounce(async (e) => {
              setData(null)
              const handle = e.target.value
                .replace('@', '')
                .replace('https://twitter.com/', '')
                .replace('twitter.com', '')
              try {
                const response = await fetch(
                  `https://api.eve.spilnota.xyz/twitter/${handle}`
                )
                const result = await response.json()
                setData({ name: handle, image: result.profile_image_url })
              } catch {
                setData(null)
              }
            }, 2000)}
          />
        </Box>
      </>
    )

  console.log(data)
  if (!data || !data.name || !data.image)
    return (
      <Button
        {...props}
        startIcon={<Twitter htmlColor="#1d9bf0" />}
        onClick={() => signIn('twitter')}
      >
        Connect Twitter
      </Button>
    )

  return (
    <Button {...props} disabled startIcon={<Twitter />}>
      Logged in as {data.name}
    </Button>
  )
})({
  backgroundColor: '#fff',
  '&:hover': {
    backgroundColor: '#bababa'
  }
})
