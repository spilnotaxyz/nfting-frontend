import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#E6FF4B'
    },
    secondary: {
      main: '#19857b'
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
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: 'NeueMachina',
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
    }
  }
})

export default theme
