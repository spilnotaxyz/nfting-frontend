import { useCardData } from '@hooks/useCardData'
import { useGenerateWizardContext } from '@hooks/useGenerateWizard'
import { Button, Stack, Theme, useMediaQuery } from '@mui/material'
import { RandomizeColorButton, ShareCardTwitterButton } from './buttons'

export const FinalButtonsGroup = () => {
  const { refresh } = useGenerateWizardContext()
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))
  const { loading, refresh: refreshCardData } = useCardData()
  return (
    <Stack mt={isMobile ? 3 : 5} spacing={isMobile ? 1.25 : 2.5}>
      <RandomizeColorButton
        variant="outlined"
        size="large"
        fullWidth
        sx={{
          maxWidth: 565
        }}
      />
      <ShareCardTwitterButton
        variant="contained"
        size="large"
        fullWidth
        sx={{
          maxWidth: 565
        }}
      />
      <Button
        variant="contained"
        size="small"
        fullWidth
        sx={{
          maxWidth: 565
        }}
        onClick={() => {
          refresh()
          refreshCardData()
        }}
        disabled={loading}
      >
        Generate new card
      </Button>
    </Stack>
  )
}
