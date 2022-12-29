import {
  GenerateWizard,
  GenerateWizardChooseInformationStep,
  GenerateWizardConnectStep,
  GenerateWizardFillInformationStep
} from '@components'
import { DummyStep } from '@components/steps/DummyStep'
import { Container, styled, Typography } from '@mui/material'
import { NextPage } from 'next'

const Description = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    mt: theme.spacing(1.25),
    fontSize: 11
  }
}))

const Generate: NextPage = () => {
  return (
    <Container maxWidth="xl" sx={{ height: '100%' }}>
      <GenerateWizard
        steps={[
          {
            title: 'Choose data you want to see on the card',
            shortTitle: 'Choose information',
            description: (
              <Description>
                Choose information you want see on the card
              </Description>
            )
          },
          {
            title: 'Add information you want see on the card (Optional)',
            shortTitle: 'Add information',
            description: (
              <Description>
                Add information you want see on the card
              </Description>
            )
          },
          {
            title: 'Connect accounts',
            shortTitle: 'Connect accounts',
            description: (
              <Description>
                Fill information you want see on the card
              </Description>
            )
          },
          {
            title: 'Generated Card',
            shortTitle: 'generated card',
            noBack: true,
            props: {
              borderRadius: '40px',
              borderWidth: 4,
              boxShadow: 'inset 0px 0px 0px 4px rgba(255, 255, 255, 0.2)',
              p: 'auto'
            }
          }
        ]}
      >
        <GenerateWizardChooseInformationStep />
        <GenerateWizardFillInformationStep />
        <GenerateWizardConnectStep />
        <DummyStep />
      </GenerateWizard>
    </Container>
  )
}

export default Generate
