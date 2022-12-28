import { useState, useEffect } from 'react'
import { Box, Typography, styled } from '@mui/material'
import LinearProgress, {
  LinearProgressProps,
  linearProgressClasses
} from '@mui/material/LinearProgress'
import BouncingDotsLoader from '../../ui/BouncingDotsLoader'

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
          left: '50%',
          transform: 'translate(-50%)'
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
    backgroundColor: theme.palette.primary.main,
    transition: '0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  }
}))

const phrases = [
  'Looking for cutest NFT puppies',
  'Looking for cutest NFT apes',
  'Looking for cutest NFT cats',
  'Looking for cutest NFT cows'
]

export const GenerateWizardCardGenerating = () => {
  const [progress, setProgress] = useState(10)
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)

  useEffect(() => {
    const timerProgress = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      )
    }, 1200)
    const timerPhrase = setInterval(() => {
      setCurrentPhraseIndex((prevPhraseIndex) =>
        ++prevPhraseIndex > phrases.length - 1 ? 0 : prevPhraseIndex
      )
    }, 2000)
    return () => {
      clearInterval(timerProgress)
      clearInterval(timerPhrase)
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
        {phrases[currentPhraseIndex]} <BouncingDotsLoader />
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
