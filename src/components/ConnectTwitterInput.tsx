import {
  Box,
  CircularProgress,
  debounce,
  InputAdornment,
  Theme,
  Typography,
  TextField,
  useMediaQuery,
  TextFieldProps
} from '@mui/material'
import { useTwitterData } from '@hooks/useTwitterData'
import { useAccount } from 'wagmi'
import { Twitter } from '@mui/icons-material'
import { useState } from 'react'

export const ConnectTwitterInput = (props: TextFieldProps) => {
  const { setData } = useTwitterData()
  const { isConnected } = useAccount()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))

  const debouncedCall = debounce(async (handle: string) => {
    setIsLoading(true)
    setIsError(false)
    try {
      const response = await fetch(`/backend/twitter/${handle}`)
      if (!response.ok) return setIsError(true)

      const result = await response.json()
      setData({
        name: handle,
        image: result.profile_image_url.replace('_normal', '')
      })
    } catch (e) {
      console.log('Error', e)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }, 1000)

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap={isMobile ? 'wrap' : 'nowrap'}
        alignItems="center"
      >
        <Typography variant="body1" color="white">
          Please add your Twitter handle
        </Typography>
        <TextField
          variant="outlined"
          required
          placeholder="@me"
          error={isError}
          helperText={isError ? 'User with such handle not found' : null}
          disabled={!isConnected}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Twitter htmlColor="#1d9bf0" />
              </InputAdornment>
            ),
            endAdornment: (
              <Box display="flex">
                {isLoading ? <CircularProgress size={20} color="info" /> : null}
              </Box>
            )
          }}
          onChange={async (e) => {
            setData(null)
            if (isLoading) debouncedCall.clear()
            await debouncedCall(
              e.target.value
                .replace('@', '')
                .replace('https://twitter.com/', '')
                .replace('twitter.com', '')
            )
          }}
          {...props}
        />
      </Box>
    </>
  )
}
