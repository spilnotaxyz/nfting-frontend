import {
  Box,
  Stepper as MuiStepper,
  StepperProps,
  Theme,
  useMediaQuery
} from '@mui/material'

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

export const Stepper = (props: StepperProps) => {
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))
  return (
    <MuiStepper
      connector={<DotConnector />}
      sx={{
        ml: '-8px',
        alignSelf: isMobile ? 'center' : 'auto'
      }}
      {...props}
    />
  )
}
