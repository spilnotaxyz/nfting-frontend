import { useGenerateWizardContext } from '@hooks/useGenerateWizard'
import {
  Box,
  Button,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { Input } from '@ui/Input'
import { useCallback, useState } from 'react'

export type GenerateWizardFillInformationStepState = Partial<{
  yourFavouriteNFTCommunity: string
  makeAWish: string
  whoBroughtYouHere: string
}>

const Label = ({ children }: { children: string }) => {
  const theme = useTheme()
  return (
    <Typography
      variant="body1"
      color="white"
      sx={{
        [theme.breakpoints.down('sm')]: {
          mb: 1.25
        }
      }}
    >
      {children}
    </Typography>
  )
}

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

  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))

  return (
    <>
      <Stack direction="column" spacing={2}>
        <Box
          display="flex"
          justifyContent="space-between"
          flexWrap={isMobile ? 'wrap' : 'nowrap'}
          alignItems="center"
        >
          <Label>Your favorite NFT community</Label>
          <Input
            placeholder="@BestNFTCommunityEver"
            onChange={(e) =>
              appendLocalState({ yourFavouriteNFTCommunity: e.target.value })
            }
          />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          flexWrap={isMobile ? 'wrap' : 'nowrap'}
          alignItems="center"
        >
          <Label>Your 2023 wish</Label>
          <Input
            multiline
            minRows={3}
            placeholder="Type your wish"
            onChange={(e) => appendLocalState({ makeAWish: e.target.value })}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          flexWrap={isMobile ? 'wrap' : 'nowrap'}
          alignItems="center"
        >
          <Label>Who brought you in the Web3 space?</Label>
          <Box
            display="flex"
            flexDirection="column"
            flexWrap="wrap"
            width={isMobile ? '100%' : 'min-content'}
          >
            <Input
              placeholder="Type here"
              onChange={(e) =>
                appendLocalState({ whoBroughtYouHere: e.target.value })
              }
            />
            <Typography variant="caption">
              DM him/her and share what for, we are sure they will be glad to
              hear.
            </Typography>
          </Box>
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
