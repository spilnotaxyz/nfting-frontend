import { useGenerateWizardContext } from '@hooks/useGenerateWizard'
import { Box, Button, Stack } from '@mui/material'
import { ConnectTwitterInput, ConnectWalletButton } from '@components'
import { useTwitterData, useAddressData } from '@hooks'
import { Card } from '@ui'
import { event } from 'nextjs-google-analytics'

export type ConnectStepState = Partial<{
  connectedWallet: boolean
  connectedTwitter: boolean
}>

export const ConnectStep = () => {
  const { next, prev } = useGenerateWizardContext()
  const { data } = useTwitterData()
  const { address } = useAddressData()
  return (
    <Card>
      <Stack direction="column" spacing={2}>
        <ConnectWalletButton variant="outlined" />
        <ConnectTwitterInput variant="outlined" />
      </Stack>
      <Box flexGrow={1} />
      {next && (
        <Button
          sx={{ mt: 3 }}
          size="large"
          variant="contained"
          fullWidth
          disabled={!address || !data || !data.name || !data.image}
          onClick={() => {
            next?.()
            event('login', { category: 'connect', label: 'twitter' })
          }}
        >
          Generate card
        </Button>
      )}
      {prev && (
        <Button onClick={prev} sx={{ mt: 2 }}>
          ← Back to add info
        </Button>
      )}
    </Card>
  )
}
