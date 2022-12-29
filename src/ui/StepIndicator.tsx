import { Box, Typography, useTheme } from '@mui/material'

export const StepIndicator = ({ step }: { step: number }) => {
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
