import { Paper, PaperProps, styled } from '@mui/material'

export const BlurredPaper = styled((props: PaperProps) => (
  <Paper elevation={0} {...props} />
))({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(2px)',
  borderRadius: 15,
  border: '1px solid rgba(255, 255, 255, 0.4)'
})
