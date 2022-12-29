import { useGenerateWizardContext } from '@hooks/useGenerateWizard'
import { Box, Button, Stack } from '@mui/material'
import { ConnectTwitterButton, ConnectWalletButton } from '@components'
import { useAccount } from 'wagmi'
import { useTwitterData } from '@hooks/useTwitterData'
import { Card } from '@ui'

export type ConnectStepState = Partial<{
  connectedWallet: boolean
  connectedTwitter: boolean
}>

export const ConnectStep = () => {
  const { next, prev } = useGenerateWizardContext()
  const account = useAccount()
  const { data } = useTwitterData()
  return (
    <Card>
      <Stack direction="column" spacing={2}>
        <ConnectWalletButton variant="contained" size="large" fullWidth />
        <ConnectTwitterButton variant="contained" size="large" fullWidth />
      </Stack>
      <Box flexGrow={1} />
      {next && (
        <Button
          sx={{ mt: 3 }}
          size="large"
          variant="contained"
          fullWidth
          disabled={!account.isConnected || !data || !data.name || !data.image}
          onClick={() => {
            next?.()
          }}
        >
          Continue
        </Button>
      )}
      {prev && (
        <Button onClick={prev} sx={{ mt: 2 }}>
          ← Back
        </Button>
      )}
    </Card>
  )
}
