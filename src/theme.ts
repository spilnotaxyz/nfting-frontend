import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#E6FF4B'
    },
    secondary: {
      main: '#fff'
    },
    text: {
      primary: '#fff'
    }
  },
  typography: {
    h1: {
      fontFamily: 'NeueMachina',
      fontSize: '3rem',
      fontWeight: 700
    },
    h2: {
      fontFamily: 'NeueMachina',
      fontSize: '2rem',
      fontWeight: 500
    },
    subtitle1: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontFamily: 'NeueMachina'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: 'NeueMachina',
          fontSize: 22,
          borderRadius: 10
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: 'url(/background.svg)',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }
      }
    }
  }
})

export default theme
