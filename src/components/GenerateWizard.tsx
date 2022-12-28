import {
  Box,
  Button,
  Hidden,
  Step,
  StepIconProps,
  StepLabel,
  Stepper,
  styled,
  Typography,
  Unstable_Grid2 as Grid,
  useMediaQuery,
  useTheme
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

const StepIndicator = ({ step }: { step: number }) => {
  const theme = useTheme()
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={40}
      width={40}
      border="1px solid #A9B7C5"
      mr={2}
      sx={{
        background: 'rgba(255, 255, 255, 0.6)',
        [theme.breakpoints.down('sm')]: {
          height: 27,
          width: 27,
          mr: 1.5
        }
      }}
      borderRadius="50%"
    >
      <Typography
        component="span"
        sx={{
          fontSize: 18,
          padding: 1.25,
          color: '#000',
          [theme.breakpoints.down('sm')]: {
            fontSize: 14
          }
        }}
      >
        {Number(step + 1)
          .toString()
          .padStart(2, '0')}
      </Typography>
    </Box>
  )
}

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

  const next =
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
      : undefined
  const prev = step !== 0 ? () => setStep((step) => step - 1) : undefined

  const theme = useTheme()
  // use media query
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Grid container spacing={isMobile ? 1 : 2} sx={{ height: '100%' }}>
      <Grid xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Stepper
          activeStep={step}
          connector={<DotConnector />}
          sx={{ overflow: isMobile ? 'scroll' : 'auto', ml: '-8px' }}
        >
          {steps.map(({ shortTitle }, i) => (
            <Step key={i}>
              <StepLabel
                icon={Number(i + 1)
                  .toString()
                  .padStart(2, '0')}
                StepIconComponent={SimpleStepIcon}
                sx={{
                  whiteSpace: 'nowrap',
                  '& .MuiStepLabel-labelContainer': {
                    color: 'rgba(255, 255, 255, 0.4)'
                  },
                  '& .MuiStepLabel-label.Mui-active': {
                    fontWeight: 400
                  }
                }}
              >
                {shortTitle}
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
            <Hidden smDown>
              <Box flexGrow="1" />
              <Typography>{steps[step].description}</Typography>
            </Hidden>
          </Box>
        </Box>
        <Hidden smUp>
          <Typography sx={{ mt: 1.25, fontSize: 11 }}>
            {steps[step].description}
          </Typography>
        </Hidden>
      </Grid>
      <Grid xs={12} md={6}>
        <BlurredPaper
          sx={{
            minHeight: 585,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            [theme.breakpoints.down('sm')]: {
              minHeight: 'auto'
            }
          }}
        >
          <GenerateWizardContext.Provider
            value={{
              step,
              next,
              prev,
              state
            }}
          >
            <Box
              height="100%"
              display="flex"
              justifyContent="space-between"
              flexGrow="1"
              flexDirection="column"
              p={5}
              sx={{
                [theme.breakpoints.down('sm')]: {
                  p: 2.5
                }
              }}
            >
              <>
                {Children.map(children, (child, i) => {
                  if (i === step) {
                    return child
                  }
                })}
                {prev && (
                  <Button onClick={prev} sx={{ mt: 2 }}>
                    ← Back
                  </Button>
                )}
              </>
            </Box>
          </GenerateWizardContext.Provider>
        </BlurredPaper>
      </Grid>
    </Grid>
  )
}
