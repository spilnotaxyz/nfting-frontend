import { Check } from '@mui/icons-material'
import {
  StepIconProps,
  StepLabel as MuiStepLabel,
  StepLabelProps,
  styled
} from '@mui/material'

const SimpleStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: 'rgba(255, 255, 255, 0.4)',
    display: 'flex',
    height: 22,
    fontSize: '0.875rem',
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#fff'
    }),
    '& .SimpleStepIcon-completedIcon': {
      color: theme.palette.primary.main,
      zIndex: 1,
      fontSize: 18
    }
  })
)

const SimpleStepIcon = ({
  active,
  completed,
  className,
  icon
}: StepIconProps) => {
  return (
    <SimpleStepIconRoot ownerState={{ active }} className={className}>
      {completed ? <Check className="SimpleStepIcon-completedIcon" /> : icon}
    </SimpleStepIconRoot>
  )
}

export const StepLabel = (props: StepLabelProps) => {
  return (
    <MuiStepLabel
      StepIconComponent={SimpleStepIcon}
      sx={{
        whiteSpace: 'nowrap',
        '& .MuiStepLabel-labelContainer': {
          color: 'rgba(255, 255, 255, 0.4)'
        },
        '& .MuiStepLabel-label.Mui-active': {
          fontWeight: 400
        }
      }}
      {...props}
    />
  )
}
