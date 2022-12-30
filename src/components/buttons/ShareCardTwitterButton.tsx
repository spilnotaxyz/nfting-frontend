import { Link } from '@components/Link'
import { useTwitterData, useCardData, useGenerateWizardContext } from '@hooks'
import { Twitter } from '@mui/icons-material'
import { Button, ButtonProps } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export const ShareCardTwitterButton = (props: ButtonProps) => {
  const { state, randomColorIndex } = useGenerateWizardContext()
  const { address } = useAccount()
  const { data } = useTwitterData()
  const { data: cardData, loading: cardLoading } = useCardData()
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState<string | undefined | null>()

  const getRetweetLink = useCallback(async () => {
    if (!address || !data || !data.name || !data.image || !cardData) {
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
      const response = await fetch(`/backend/card`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...cardData,
          gradientIndex: randomColorIndex,
          favouriteCommunity: state.favouriteCommunity,
          wish: state.wish,
          whoBroughtMeHere: state.whoBroughtMeHere,
          username: data.name,
          image: data.image
        })
      })

      const result = await response.json()
      const url = `https://twitter.com/intent/tweet?original_referer=${window.location.origin}%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Er&text=HNY%202023%21%20This%20year%20I%20have%20found%20my%20favorite%20community%20%40${state.favouriteCommunity}%20and%20%40spilnotaxyz%20just%20generated%20my%20NFTing%20card%0ACheck%20it%20out%3A%20&url=spilnota.xyz/card/${result.slug}`

      setLoading(false)
      return url
    } catch (e) {
      console.warn(e)
      setLoading(false)
    }
  }, [address, data, state, randomColorIndex, cardData])

  useEffect(() => {
    ;(async () => {
      setUrl(null)
      const url = await getRetweetLink()
      setUrl(url)
    })()
  }, [getRetweetLink])

  if (!url)
    return (
      <Button
        disabled
        color="secondary"
        startIcon={<Twitter htmlColor="#1d9bf0" />}
        {...props}
      >
        Share the card on Twitter
      </Button>
    )

  return (
    <Link
      href={url}
      sx={{
        '&:hover': { textDecoration: 'none !important' }
      }}
      target="_blank"
    >
      <Button
        disabled={loading || cardLoading}
        color="secondary"
        startIcon={<Twitter htmlColor="#1d9bf0" />}
        {...props}
      >
        Share the card on Twitter
      </Button>
    </Link>
  )
}
