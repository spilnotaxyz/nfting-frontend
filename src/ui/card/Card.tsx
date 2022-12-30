import { Paper, PaperProps, useMediaQuery, Theme } from '@mui/material'

export const Card = ({ sx, ...rest }: PaperProps) => {
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))
  return (
    <Paper
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(2px)',
        borderRadius: isMobile ? '20px' : '15px',
        boxShadow: 'inset 0px 0px 0px 1px rgba(255, 255, 255, 0.4)',

        flexGrow: '1',
        minHeight: isMobile ? 'auto' : 585,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        p: isMobile ? 2.5 : 5,
        ...sx
      }}
      {...rest}
    />
  )
}
