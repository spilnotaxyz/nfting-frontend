import {
  Box,
  Button,
  Hidden,
  Step,
  StepIconProps,
  StepLabel,
  Stepper,
  styled,
  SxProps,
  Theme,
  Typography,
  Unstable_Grid2 as Grid,
  useMediaQuery,
  useTheme,
  Stack
} from '@mui/material'
import { Check } from '@mui/icons-material'

import { BlurredPaper } from '@ui/BlurredPaper'
import { Children, createContext, PropsWithChildren, ReactNode } from 'react'
import {
  GenerateWizardChooseInformationStepState,
  GenerateWizardFillInformationStepState
} from './steps'
import { GenerateWizardConnectStepState } from './steps/GenerateWizardConnectStep'
import { useLocalStorage } from '@hooks/useLocalStorage'
import {
  RandomizeColorButton,
  ShareCardTwitterButton,
  FollowNotice
} from '@components'

export type GenerateWizardState = GenerateWizardChooseInformationStepState &
  GenerateWizardFillInformationStepState &
  GenerateWizardConnectStepState

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

const GRADIENTS = [
  'linear-gradient(180deg, #3C9C01 0%, #FF6868 100%)',
  'linear-gradient(360deg, #39A4C6 0%, #DD18EE 117.35%)',
  'linear-gradient(360deg, #94B8CD 0%, #171617 117.35%)',
  'linear-gradient(180deg, #9C0142 0%, #CC9F00 100%)',
  'linear-gradient(180deg, #0B07E8 0%, #D3726B 100%)',
  'linear-gradient(360deg, #39C68A 0%, #1847EE 117.35%)'
]

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min

const randomExluding = (
  min: number,
  max: number,
  excluding: number
): number => {
  const random = Math.floor(Math.random() * (max - min)) + min
  if (random === excluding) {
    return randomExluding(min, max, excluding)
  }
  return random
}

export const GenerateWizard = ({
  children,
  steps
}: PropsWithChildren<{
  steps: {
    title: string
    shortTitle: string
    description?: ReactNode
    noBack?: boolean
    props?: SxProps<Theme>
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
          const skip = 0
          // if (
          //   step === 0 &&
          //   !newState.includeMakeAW &&
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

  const refresh = () => {
    setState({})
    setStep(0)
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
                {steps[step].description}
                {step === steps.length - 1 && (
                  <>
                    <Stack mt={5} spacing={2.5}>
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
                        onClick={refresh}
                      >
                        Generate new card
                      </Button>
                    </Stack>
                    <Box flexGrow={1} />
                    <FollowNotice mt={2} />
                  </>
                )}
              </Hidden>
            </Box>
          </Box>
          <Hidden smUp>
            {steps[step].description}
            {step === steps.length - 1 && (
              <Stack mt={5} mb={2.5} spacing={1.25}>
                <RandomizeColorButton
                  variant="outlined"
                  size="large"
                  fullWidth
                />
                <ShareCardTwitterButton
                  variant="contained"
                  size="large"
                  fullWidth
                />
                <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  sx={{
                    maxWidth: 565
                  }}
                  onClick={refresh}
                >
                  Generate new card
                </Button>
              </Stack>
            )}
          </Hidden>
        </Grid>
        <Grid xs={12} md={6}>
          <BlurredPaper
            sx={{
              flexGrow: '1',
              minHeight: 585,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              width: '100%',
              p: isMobile ? 2.5 : 5,
              [theme.breakpoints.down('sm')]: {
                minHeight: 'auto'
              },
              ...(step === steps.length - 1
                ? {
                    background: GRADIENTS[randomColorIndex]
                  }
                : {}),
              ...steps[step].props
            }}
          >
            {Children.map(children, (child, i) => {
              if (i === step) {
                return child
              }
            })}
            {!steps[step].noBack && prev && (
              <Button onClick={prev} sx={{ mt: 2 }}>
                ← Back
              </Button>
            )}
          </BlurredPaper>
        </Grid>
        <Hidden smUp>
          <Grid xs={12}>
            <FollowNotice mt={2.5} />
          </Grid>
        </Hidden>
      </Grid>
    </GenerateWizardContext.Provider>
  )
}
