import { useGenerateWizardContext } from '@hooks/useGenerateWizard'
import { useTwitterData } from '@hooks/useTwitterData'
import { Twitter } from '@mui/icons-material'
import { Button, ButtonProps, styled } from '@mui/material'
import { useCallback, useState } from 'react'
import { useAccount } from 'wagmi'

export const ShareCardTwitterButton = styled((props: ButtonProps) => {
  const { state, randomColorIndex } = useGenerateWizardContext()
  const { address } = useAccount()
  const { data } = useTwitterData()
  const [loading, setLoading] = useState(false)

  const handleClick = useCallback(async () => {
    if (!address || !data || !data.name || !data.image) {
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
          username: data.name,
          image: data.image
        })
      })

      const result2 = await response2.json()
      const url = `https://twitter.com/intent/tweet?original_referer=${window.origin}%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Er&text=HNY%202023%21%20This%20year%20I%20have%20found%20my%20favorite%20community%20%40${state.favouriteCommunity}%20and%20%40spilnotaxyz%20just%20generated%20my%20NFT%20card%0ACheck%20it%20out%3A%20&url=eve.spilnota.xyz/card/${result2.slug}`

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
