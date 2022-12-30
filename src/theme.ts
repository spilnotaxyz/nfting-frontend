import { grey } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const ref = createTheme()

// Create a theme instance.
const theme = createTheme({
  ...ref,
  palette: {
    primary: {
      main: '#E6FF4B'
    },
    secondary: {
      main: '#fff'
    },
    text: {
      primary: '#fff'
    },
    error: {
      main: grey.A400
    }
  },
  typography: {
    fontFamily: 'Inter',
    h1: {
      fontFamily: 'NeueMachina',
      fontSize: '3rem',
      fontWeight: 700
    },
    h2: {
      fontFamily: 'NeueMachina',
      fontSize: '2rem',
      fontWeight: 500,
      [ref.breakpoints.down('sm')]: {
        fontSize: 22
      }
    },
    subtitle1: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontFamily: 'NeueMachina',
      [ref.breakpoints.down('sm')]: {
        fontSize: 12
      }
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: 'NeueMachina',
          fontWeight: 400,
          fontSize: 22,
          borderRadius: ref.spacing(2),
          paddingTop: ref.spacing(3),
          paddingBottom: ref.spacing(3),
          [ref.breakpoints.down('sm')]: {
            paddingTop: ref.spacing(2),
            paddingBottom: ref.spacing(2),
            fontSize: 14,
            borderRadius: ref.spacing(1)
          }
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: 'url(/background.svg)',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          backgroundPosition: '0 0',
          [ref.breakpoints.down('sm')]: {
            backgroundImage: 'url(/background-mobile.png)'
          }
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
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          minWidth: 325,
          [ref.breakpoints.down('sm')]: {
            minWidth: 'auto'
          }
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: '10px !important',
          backgroundColor: '#fff',
          color: '#000'
        }
      }
    }
  }
})

export default theme
