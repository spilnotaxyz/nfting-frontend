import {
  GenerateWizard,
  GenerateWizardChooseInformationStep,
  GenerateWizardConnectStep,
  GenerateWizardFillInformationStep,
  GenerateWizardCardGenerating
} from '@components'
import { Container } from '@mui/material'
import { NextPage } from 'next'

const Generate: NextPage = () => {
  return (
    <Container maxWidth="xl" sx={{ height: '100%' }}>
      <GenerateWizard
        steps={[
          {
            title: 'Choose data you want to see on the card',
            shortTitle: 'Choose information',
            description: 'Choose information you want see on the card'
          },
          {
            title: 'Add information you want see on the card (Optional)',
            shortTitle: 'Add information',
            description: 'Add information you want see on the card'
          },
          {
            title: 'Connect accounts',
            shortTitle: 'Connect accounts',
            description: 'Fill information you want see on the card'
          },
          {
            title: 'Your card is generating...',
            shortTitle: 'Your card',
            description: ''
          }
        ]}
      >
        <GenerateWizardChooseInformationStep />
        <GenerateWizardFillInformationStep />
        <GenerateWizardConnectStep />
        <GenerateWizardCardGenerating />
      </GenerateWizard>
    </Container>
  )
}

export default Generate
