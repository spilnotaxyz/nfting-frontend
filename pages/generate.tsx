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
                Decide what you want to know about your NFT journey and share
                with the world. Some data might will take longer than the other.
                Ethereum blockchain is supported support only.
              </Description>
            )
          },
          {
            title: 'Add information you want see on the card',
            shortTitle: 'Add information',
            descriptionTop: (
              <Description>
                Give back to the world by sharing your passions, wishes and
                appreciation.
              </Description>
            )
          },
          {
            title: 'Connect accounts',
            shortTitle: 'Connect accounts',
            descriptionTop: (
              <Description>
                You don’t need to sign any transaction. We verify your ownership
                and calculate the data based on your activity. Twitter is for
                making the card personalised with your handle and avatar.
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
