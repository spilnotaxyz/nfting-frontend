import { useGenerateWizardContext } from '@hooks/useGenerateWizard'
import { Button, ButtonProps, styled } from '@mui/material'
import { Randomize } from '@ui/icons'

export const RandomizeColorButton = styled((props: ButtonProps) => {
  const { randomizeColor } = useGenerateWizardContext()
  return (
    <Button
      onClick={randomizeColor}
      startIcon={<Randomize />}
      color="secondary"
      {...props}
    >
      Randomize new color
    </Button>
  )
})({})
