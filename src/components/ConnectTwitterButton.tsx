import { Twitter } from '@mui/icons-material'
import { signIn, useSession } from 'next-auth/react'
import { Button, ButtonProps, styled } from '@mui/material'

export const ConnectTwitterButton = styled((props: ButtonProps) => {
  const handleConnect = () => {
    fetch('https://api.eve.spilnota.xyz/twitter/auth')
  }
  const { data } = useSession()
  if (!data || !data.user.name || !data.user.image)
    return (
      <Button
        {...props}
        disabled={!data}
        startIcon={<Twitter htmlColor="#1d9bf0" />}
        onClick={() => signIn('twitter')}
      >
        Connect Twitter
      </Button>
    )

  return (
    <Button {...props} disabled startIcon={<Twitter />} onClick={handleConnect}>
      Logged in as {data.user.name}
    </Button>
  )
})({
  backgroundColor: '#fff'
})
