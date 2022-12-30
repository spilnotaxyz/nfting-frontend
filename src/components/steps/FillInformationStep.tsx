import { useGenerateWizardContext } from '@hooks/useGenerateWizard'
import {
  Box,
  Button,
  Stack,
  Theme,
  Typography,
  TextField,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { Card } from '@ui'
import { useCallback, useState } from 'react'

export type FillInformationStepState = Partial<{
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

export const FillInformationStep = () => {
  const { next, prev, state } = useGenerateWizardContext()

  const [localState, setLocalState] = useState<FillInformationStepState>(state)

  const appendLocalState = useCallback(
    (obj: Partial<typeof localState>) => {
      setLocalState((prevState) => ({ ...prevState, ...obj }))
    },
    [setLocalState]
  )

  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))

  return (
    <Card>
      <Stack direction="column" spacing={2}>
        <Box
          display="flex"
          justifyContent="space-between"
          flexWrap={isMobile ? 'wrap' : 'nowrap'}
          alignItems="center"
        >
          <Label>Your favorite NFT community*</Label>
          <TextField
            fullWidth={isMobile}
            defaultValue={localState.favouriteCommunity}
            variant="outlined"
            required
            placeholder="https://twitter.com/youracountname"
            onChange={(e) => {
              appendLocalState({
                favouriteCommunity: e.target.value
                  .replace('https://twitter.com/', '')
                  .replace('@', '')
                  .replace('twitter.com/', '')
              })
              e.target.value = e.target.value.slice(0, 100)
            }}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          flexWrap={isMobile ? 'wrap' : 'nowrap'}
          alignItems="center"
        >
          <Label>Your 2023 wish*</Label>
          <TextField
            fullWidth={isMobile}
            defaultValue={localState.wish}
            variant="outlined"
            required
            multiline
            minRows={3}
            placeholder="Type your wish"
            onChange={(e) => {
              appendLocalState({ wish: e.target.value })
              e.target.value = e.target.value.slice(0, 280)
            }}
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
            <TextField
              fullWidth={isMobile}
              defaultValue={localState.whoBroughtMeHere}
              variant="outlined"
              placeholder="Type here"
              onChange={(e) => {
                appendLocalState({ whoBroughtMeHere: e.target.value })
                e.target.value = e.target.value.slice(0, 100)
              }}
            />
            <Typography variant="caption" mt={1}>
              DM him/her and share what for, we are sure they will be glad to
              hear.
            </Typography>
          </Box>
        </Box>
      </Stack>
      <Box flexGrow={1} />
      {next && (
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
          Continue to crypto wallet
        </Button>
      )}
      {prev && (
        <Button onClick={prev} sx={{ mt: 2 }}>
          ← Back to choose info
        </Button>
      )}
    </Card>
  )
}
