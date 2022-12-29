import { useGenerateWizardContext } from '@hooks/useGenerateWizard'
import { Box, Button, Stack } from '@mui/material'
import { ConnectTwitterButton, ConnectWalletButton } from '@components'
import { useSession } from 'next-auth/react'
import { useAccount } from 'wagmi'

export type GenerateWizardConnectStepState = Partial<{
  connectedWallet: boolean
  connectedTwitter: boolean
}>

export const GenerateWizardConnectStep = () => {
  const { next } = useGenerateWizardContext()
  const account = useAccount()
  const { data } = useSession()
  return (
    <>
      <Stack direction="column" spacing={2}>
        <ConnectWalletButton variant="contained" size="large" fullWidth />
        <ConnectTwitterButton variant="contained" size="large" fullWidth />
      </Stack>
      <Box flexGrow={1} />
      <Button
        sx={{ mt: 3 }}
        size="large"
        variant="contained"
        fullWidth
        disabled={
          !next ||
          !account.address ||
          !data ||
          !data.user.name ||
          !data.user.image
        }
        onClick={() => {
          next?.()
        }}
      >
        Continue
      </Button>
    </>
  )
}
