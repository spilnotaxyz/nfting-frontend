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
  favouriteCommunity: string
  wish: string
  whoBroughtMeHere: string
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
            required
            placeholder="https://twitter.com/spilnota"
            onChange={(e) =>
              appendLocalState({ favouriteCommunity: e.target.value })
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
            required
            multiline
            minRows={3}
            placeholder="Type your wish"
            onChange={(e) => appendLocalState({ wish: e.target.value })}
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
                appendLocalState({ whoBroughtMeHere: e.target.value })
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
        disabled={!next || !localState.wish || !localState.favouriteCommunity}
        onClick={() => {
          next?.(localState)
        }}
      >
        Continue
      </Button>
    </>
  )
}
