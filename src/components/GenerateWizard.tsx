import {
  Box,
  Step,
  StepIconProps,
  StepLabel,
  Stepper,
  styled,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material'
import { Check } from '@mui/icons-material'

import { BlurredPaper } from '@ui/BlurredPaper'
import { Children, createContext, PropsWithChildren } from 'react'
import {
  GenerateWizardChooseInformationStepState,
  GenerateWizardFillInformationStepState
} from './steps'
import { GenerateWizardConnectStepState } from './steps/GenerateWizardConnectStep'
import { useLocalStorage } from '@hooks/useLocalStorage'

export type GenerateWizardState = GenerateWizardChooseInformationStepState &
  GenerateWizardFillInformationStepState &
  GenerateWizardConnectStepState

export type GenerateWizardContextType = {
  step: number
  state: GenerateWizardState
  next?: (newState?: GenerateWizardState) => void
  prev?: () => void
}

export const GenerateWizardContext = createContext<GenerateWizardContextType>({
  state: {},
  step: 0
})

const StepIndicator = ({ step }: { step: number }) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height={40}
    width={40}
    border="1px solid #A9B7C5"
    mr={2}
    sx={{
      background: 'rgba(255, 255, 255, 0.6)'
    }}
    borderRadius="50%"
  >
    <Typography
      component="span"
      sx={{
        fontSize: 18,
        padding: 1.25,
        color: '#000'
      }}
    >
      {Number(step + 1)
        .toString()
        .padStart(2, '0')}
    </Typography>
  </Box>
)

const SimpleStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: 'rgba(255, 255, 255, 0.4)',
    display: 'flex',
    height: 22,
    fontSize: '0.875rem',
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#fff'
    }),
    '& .SimpleStepIcon-completedIcon': {
      color: theme.palette.primary.main,
      zIndex: 1,
      fontSize: 18
    }
  })
)

const SimpleStepIcon = ({
  active,
  completed,
  className,
  icon
}: StepIconProps) => {
  return (
    <SimpleStepIconRoot ownerState={{ active }} className={className}>
      {completed ? <Check className="SimpleStepIcon-completedIcon" /> : icon}
    </SimpleStepIconRoot>
  )
}

const DotConnector = () => (
  <Box
    sx={{
      '& .DotConnector-circle': {
        width: 5,
        height: 5,
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.4)'
      }
    }}
  >
    <div className="DotConnector-circle" />
  </Box>
)

export const GenerateWizard = ({
  children,
  steps
}: PropsWithChildren<{
  steps: {
    title: string
    shortTitle: string
    description: string
  }[]
}>) => {
  const [step, setStep] = useLocalStorage('wizard-step', 0)
  const [state, setState] = useLocalStorage<GenerateWizardState>(
    'wizard-state',
    {}
  )

  return (
    <Grid container spacing={2}>
      <Grid xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Stepper activeStep={step} connector={<DotConnector />}>
          {steps.map(({ shortTitle }, i) => (
            <Step key={i}>
              <StepLabel
                icon={Number(i + 1)
                  .toString()
                  .padStart(2, '0')}
                StepIconComponent={SimpleStepIcon}
                sx={{
                  '& .MuiStepLabel-labelContainer': {
                    color: 'rgba(255, 255, 255, 0.4)'
                  }
                }}
              >
                {shortTitle}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box display="flex" mt={4}>
          <StepIndicator step={step} />
          <Typography variant="h1" sx={{ lineHeight: '110%', fontWeight: 500 }}>
            {steps[step].title}
          </Typography>
        </Box>
        <Box flexGrow="1" />
        <Typography sx={{ ml: 7.5 }}>{steps[step].description}</Typography>
      </Grid>
      <Grid xs={6}>
        <BlurredPaper
          sx={{
            minHeight: 585,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%'
          }}
        >
          <GenerateWizardContext.Provider
            value={{
              step,
              next:
                step !== steps.length - 1
                  ? (newState?: GenerateWizardState) => {
                      const skip = 0
                      // if (
                      //   step === 0 &&
                      //   !newState.includeMakeAWish &&
                      //   !newState.includeWhoBroughtYouHere &&
                      //   !newState.includeYourFavouriteNFTCommunity
                      // ) {
                      //   skip = 1
                      // }
                      setStep((step) => step + 1 + skip)
                      if (!newState) return
                      setState((prevState) => ({ ...prevState, ...newState }))
                    }
                  : undefined,
              prev: step !== 0 ? () => setStep((step) => step - 1) : undefined,
              state
            }}
          >
            <Box
              height="100%"
              display="flex"
              flexGrow="1"
              flexDirection="column"
              p={5}
            >
              {Children.map(children, (child, i) => {
                if (i === step) {
                  return child
                }
              })}
            </Box>
          </GenerateWizardContext.Provider>
        </BlurredPaper>
      </Grid>
    </Grid>
  )
}
