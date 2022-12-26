import { useGenerateWizardContext } from '@hooks/useGenerateWizard'
import { Box, Button, Stack, Typography } from '@mui/material'
import { Input } from '@ui/Input'
import { useCallback, useState } from 'react'

export type GenerateWizardFillInformationStepState = Partial<{
  yourFavouriteNFTCommunity: string
  makeAWish: string
  whoBroughtYouHere: string
}>

const Label = ({ children }: { children: string }) => (
  <Typography variant="body1" color="white">
    {children}
  </Typography>
)

export const GenerateWizardFillInformationStep = () => {
  const { next } = useGenerateWizardContext()

  const [localState, setLocalState] =
    useState<GenerateWizardFillInformationStepState>({})

  const appendLocalState = useCallback(
    (obj: Partial<typeof localState>) => {
      setLocalState((prevState) => ({ ...prevState, ...obj }))
    },
    [setLocalState]
  )

  return (
    <>
      <Stack direction="column" spacing={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Label>Your favorite NFT community</Label>
          <Input
            onChange={(e) =>
              appendLocalState({ yourFavouriteNFTCommunity: e.target.value })
            }
          />
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Label>Your 2023 wish</Label>
          <Input
            onChange={(e) => appendLocalState({ makeAWish: e.target.value })}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Label>Who/What brought you in the Web3 space?</Label>
          <Input
            onChange={(e) =>
              appendLocalState({ whoBroughtYouHere: e.target.value })
            }
          />
        </Box>
      </Stack>
      <Box flexGrow={1} />
      <Button
        sx={{ mt: 3 }}
        size="large"
        variant="contained"
        fullWidth
        disabled={!next}
        onClick={() => {
          next?.(localState)
        }}
      >
        {localState.makeAWish ||
        localState.whoBroughtYouHere ||
        localState.yourFavouriteNFTCommunity
          ? 'Continue'
          : 'Skip'}
      </Button>
    </>
  )
}
