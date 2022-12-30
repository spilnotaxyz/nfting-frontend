import {
  Box,
  Hidden,
  Step,
  Typography,
  Unstable_Grid2 as Grid,
  useMediaQuery,
  useTheme
} from '@mui/material'

import { Children, createContext, PropsWithChildren, ReactNode } from 'react'
import { ChooseInformationStepState, FillInformationStepState } from './steps'
import { ConnectStepState } from './steps/ConnectStep'
import { useLocalStorage } from '@hooks/useLocalStorage'
import { GRADIENTS } from '@constants/GRADIENTS'
import { Stepper } from '@ui/Stepper'
import { StepLabel } from '@ui/StepLabel'
import { StepIndicator } from '@ui/StepIndicator'
import { randomExluding, random } from '@utils'
import { useTwitterData } from '@hooks/useTwitterData'
import { CardDataProvider } from '@hooks/useCardData'

export type GenerateWizardState = ChooseInformationStepState &
  FillInformationStepState &
  ConnectStepState

export type GenerateWizardContextType = {
  step: number
  state: GenerateWizardState
  refresh: () => void
  next?: (newState?: GenerateWizardState) => void
  prev?: () => void
  randomizeColor: () => void
  randomColorIndex: number
}

export const GenerateWizardContext =
  createContext<GenerateWizardContextType | null>(null)

export const GenerateWizard = ({
  children,
  steps
}: PropsWithChildren<{
  steps: {
    title: string
    shortTitle: string
    description?: ReactNode
  }[]
}>) => {
  const [step, setStep] = useLocalStorage('wizard-step', 0)
  const [state, setState] = useLocalStorage<GenerateWizardState>(
    'wizard-state',
    {}
  )

  const [randomColorIndex, setRandomColorIndex] = useLocalStorage(
    'random-color-index',
    random(0, GRADIENTS.length)
  )

  const next =
    step !== steps.length - 1
      ? (newState?: GenerateWizardState) => {
          setStep((step) => step + 1)
          if (!newState) return
          setState((prevState) => ({ ...prevState, ...newState }))
        }
      : undefined
  const prev = step !== 0 ? () => setStep((step) => step - 1) : undefined

  const theme = useTheme()
  // use media query
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const { setData } = useTwitterData()

  const refresh = () => {
    setState({})
    setStep(0)
    setData(null)
  }

  return (
    <GenerateWizardContext.Provider
      value={{
        step,
        next,
        prev,
        refresh,
        state,
        randomColorIndex,
        randomizeColor: () => {
          setRandomColorIndex((index) =>
            randomExluding(0, GRADIENTS.length, index)
          )
        }
      }}
    >
      <CardDataProvider>
        <Grid container spacing={isMobile ? 1 : 2} sx={{ height: '100%' }}>
          <Grid
            xs={12}
            md={6}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <Stepper activeStep={step}>
              {steps.map(({ shortTitle }, i) => (
                <Step key={i}>
                  <StepLabel
                    icon={Number(i + 1)
                      .toString()
                      .padStart(2, '0')}
                  >
                    {!isMobile && shortTitle}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            <Box
              display="flex"
              mt={4}
              flexGrow={isMobile ? 'unset' : 1}
              sx={{
                [theme.breakpoints.down('sm')]: {
                  mt: 2.5
                }
              }}
            >
              <StepIndicator step={step} />
              <Box
                display="flex"
                flexDirection="column"
                flexGrow={isMobile ? 'unset' : 1}
              >
                <Typography
                  variant="h1"
                  sx={{
                    lineHeight: '110%',
                    fontWeight: 500,
                    maxWidth: 536,
                    [theme.breakpoints.down('sm')]: {
                      fontSize: 24
                    }
                  }}
                >
                  {steps[step].title}
                </Typography>
                <Hidden smDown>{steps[step].description}</Hidden>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} md={6}>
            {Children.map(children, (child, i) => {
              if (i === step) {
                return child
              }
            })}
          </Grid>
          <Hidden smUp>
            <Grid xs={12}>{steps[step].description}</Grid>
          </Hidden>
        </Grid>
      </CardDataProvider>
    </GenerateWizardContext.Provider>
  )
}
