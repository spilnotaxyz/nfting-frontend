import { Twitter } from '@mui/icons-material'
import {
  Box,
  BoxProps,
  Chip,
  Theme,
  Typography,
  useMediaQuery
} from '@mui/material'

export const FollowNotice = (props: BoxProps) => {
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))
  return (
    <Box
      display="flex"
      flexDirection="column"
      mt={isMobile ? 2.5 : 2}
      {...props}
    >
      <Typography fontFamily="NeueMachina" fontSize={isMobile ? 18 : 22}>
        Follow us to say thank you
      </Typography>
      <Chip
        sx={{
          mt: isMobile ? 1.25 : 2.5,
          width: 'max-content',
          px: 1.875,
          py: 2.5,
          borderRadius: 45
        }}
        icon={<Twitter color="secondary" />}
        label={
          <Typography fontFamily="NeueMachina" fontSize={22}>
            Spilnota
          </Typography>
        }
        variant="outlined"
        onClick={() => {
          window.open(
            `https://twitter.com/intent/follow?original_referer=https%3A%2F%2F${window.location.origin}%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Efollow%7Ctwgr%5Espilnotaxyz&region=follow_link&screen_name=spilnotaxyz`,
            '_blank'
          )
        }}
      />
      <Typography
        mt={isMobile ? 3.125 : 5.5}
        fontSize={isMobile ? 12 : 16}
        maxWidth={500}
      >
        We want to ask you some questions. Check our twitter page there are a
        few polls there on what we should do next.
      </Typography>
    </Box>
  )
}
