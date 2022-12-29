import { Paper, PaperProps, styled } from '@mui/material'

export const BlurredPaper = styled((props: PaperProps) => (
  <Paper elevation={0} {...props} />
))(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(2px)',
  borderRadius: 15,
  boxShadow: 'inset 0px 0px 0px 1px rgba(255, 255, 255, 0.4)',
  [theme.breakpoints.down('sm')]: {
    borderRadius: 20
  }
}))
