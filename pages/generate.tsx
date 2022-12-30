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
    marginTop: 0,
    marginBottom: theme.spacing(3),
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
            descriptionTop: (
              <Description>
                Choose information you want see on the card
              </Description>
            )
          },
          {
            title: 'Add information you want see on the card',
            shortTitle: 'Add information',
            descriptionTop: (
              <Description>
                Add information you want see on the card
              </Description>
            )
          },
          {
            title: 'Connect accounts',
            shortTitle: 'Connect accounts',
            descriptionTop: (
              <Description>
                Connect your wallet and twitter to generate your card
              </Description>
            )
          },
          {
            title: 'Generate your card',
            shortTitle: 'Generate your card',
            descriptionBottom: (
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
