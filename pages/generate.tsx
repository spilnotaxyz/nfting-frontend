import {
  GenerateWizard,
  ChooseInformationStep,
  ConnectStep,
  FillInformationStep,
  FollowNotice
} from '@components'
import { FinalButtonsGroup } from '@components/FinalButtonGroup'
import { DummyStep } from '@components/steps/CardStep'
import { Box, Container, styled, Typography } from '@mui/material'
import { NextPage } from 'next'

const Description = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  marginTop: theme.spacing(2.5),
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(2),
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
            description: (
              <>
                <FinalButtonsGroup />
                <Box flexGrow={1} />
                <FollowNotice />
              </>
            )
          }
        ]}
      >
        <ChooseInformationStep />
        <FillInformationStep />
        <ConnectStep />
        <DummyStep />
      </GenerateWizard>
    </Container>
  )
}

export default Generate
