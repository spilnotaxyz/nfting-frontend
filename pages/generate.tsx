import {
  GenerateWizard,
  GenerateWizardChooseInformationStep,
  GenerateWizardConnectStep,
  GenerateWizardFillInformationStep
} from '@components'
import { Container } from '@mui/material'
import { NextPage } from 'next'

const Generate: NextPage = () => {
  return (
    <Container maxWidth="xl">
      <GenerateWizard
        steps={[
          {
            title: 'Choose information you want see on the card',
            shortTitle: 'Choose information',
            description: 'Choose information you want see on the card'
          },
          {
            title: 'Fill information you want see on the card',
            shortTitle: 'Fill information',
            description: 'Fill information you want see on the card'
          },
          {
            title: 'Connect accounts',
            shortTitle: 'Connect accounts',
            description: 'Fill information you want see on the card'
          }
        ]}
      >
        <GenerateWizardChooseInformationStep />
        <GenerateWizardFillInformationStep />
        <GenerateWizardConnectStep />
      </GenerateWizard>
    </Container>
  )
}

export default Generate
