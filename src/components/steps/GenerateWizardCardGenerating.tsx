// import { useGenerateWizardContext } from '@hooks/useGenerateWizard'
import { useState, useEffect } from 'react'
import { Box, Typography, styled } from '@mui/material'
import LinearProgress, {
  LinearProgressProps,
  linearProgressClasses
} from '@mui/material/LinearProgress'

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box
        sx={{
          minWidth: 35,
          position: 'absolute',
          bottom: '20px',
          left: `${props.value === 100 ? 90 : props.value / 1.19}%`,
          transition: '1s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary.main"
          fontSize="1.4rem"
          fontFamily="Inter, sans-serif"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  )
}

const BorderLinearProgress = styled(LinearProgressWithLabel)(({ theme }) => ({
  height: 9,
  borderRadius: 10,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)'
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 10,
    backgroundColor: theme.palette.primary.main
  }
}))

export const GenerateWizardCardGenerating = () => {
  const [progress, setProgress] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      )
    }, 900)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Typography
        fontFamily="Inter, sans-serif"
        fontSize="1.4rem"
        textAlign="center"
        padding="10px 15px"
        bgcolor="rgba(255, 255, 255, 0.1)"
        borderRadius="30px"
        border="1px solid rgba(255, 255, 255, 0.2)"
      >
        Looking for cutest NFT puppies...
      </Typography>
      <Box
        sx={{
          width: '75%',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <BorderLinearProgress value={progress} />
      </Box>
    </Box>
  )
}
