import {
  Box,
  TextFieldProps,
  CircularProgress,
  debounce,
  InputAdornment,
  TextField,
  Theme,
  Typography,
  useMediaQuery
} from '@mui/material'
import { useState } from 'react'
import { useAddressData } from '@hooks/useAddressData'
import { Ethereum } from '@ui/icons'
import { useProvider } from 'wagmi'

export const ConnectWalletButton = (props: TextFieldProps) => {
  const { setData } = useAddressData()
  const provider = useProvider()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState('')
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))

  const debouncedCall = debounce(async (address: string) => {
    setIsLoading(true)
    setIsError('')
    if (address.endsWith('.eth')) {
      const fetchedAddress = await provider.resolveName(address)
      if (!fetchedAddress) {
        setIsLoading(false)
        return setIsError('User with such ENS name not found.')
      }

      address = fetchedAddress
    }
    if (!address.startsWith('0x') || address.length !== 42) {
      setIsLoading(false)
      return setIsError('Invalid address')
    }
    setIsLoading(false)
    setData(address)
  })

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      flexWrap={isMobile ? 'wrap' : 'nowrap'}
      alignItems="center"
      gap="8px"
    >
      <Typography variant="body1" color="white" mb={isMobile ? 2 : 'auto'}>
        Please add your Ethereum address or ENS Name
      </Typography>
      <TextField
        fullWidth={isMobile}
        variant="outlined"
        required
        placeholder="@me"
        error={!!isError}
        helperText={isError}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Ethereum height={20} width={20} />
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
          await debouncedCall(e.target.value)
        }}
        {...props}
      />
    </Box>
  )
}
