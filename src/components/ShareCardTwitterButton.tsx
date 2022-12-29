import { useGenerateWizardContext } from '@hooks/useGenerateWizard'
import { Twitter } from '@mui/icons-material'
import { Button, ButtonProps, styled } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useCallback, useState } from 'react'
import { useAccount } from 'wagmi'

export const ShareCardTwitterButton = styled((props: ButtonProps) => {
  const { state, randomColorIndex } = useGenerateWizardContext()
  const { address } = useAccount()
  const { data } = useSession()
  const [loading, setLoading] = useState(false)

  const handleClick = useCallback(async () => {
    if (!address || !data || !data.user.name || !data.user.image) {
      console.error(
        'address is not defined or twitter session data is not defined'
      )
      return
    }
    setLoading(true)
    const params = new URLSearchParams()

    Object.entries(state).forEach(([key, value]) =>
      params.append(key, value.toString())
    )

    try {
      const response = await fetch(
        `https://api.eve.spilnota.xyz/transactions/${address}` + '?' + params
      )
      const result = await response.json()

      const response2 = await fetch(`https://api.eve.spilnota.xyz/card`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...result,
          gradientIndex: randomColorIndex,
          favouriteCommunity: state.favouriteCommunity,
          wish: state.wish,
          whoBroughtMeHere: state.whoBroughtMeHere,
          username: data.user.name,
          image: data.user.image
        })
      })

      const result2 = await response2.json()

      const url = `https://twitter.com/intent/tweet?original_referer=${window.origin}%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Er&text=Check%20out%20my%20NFT%20Stats%20at&url=eve.spilnota.xyz/card/${result2.slug}`

      window.open(url, '_blank')
    } finally {
      setLoading(false)
    }
  }, [address, data, state, randomColorIndex])

  return (
    <Button
      disabled={loading}
      startIcon={<Twitter htmlColor="#1d9bf0" />}
      onClick={handleClick}
      {...props}
    >
      Share the card on Twitter
    </Button>
  )
})({
  backgroundColor: '#fff',
  '&:hover': {
    backgroundColor: '#bababa'
  }
})
