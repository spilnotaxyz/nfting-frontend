import { ConnectButton as RainbowKitConnectButton } from '@rainbow-me/rainbowkit'
import { Button, ButtonProps, styled } from '@mui/material'
import { Check } from '@mui/icons-material'
import { useAccount } from 'wagmi'
import { event } from 'nextjs-google-analytics'

const formatAddress = (address: string): string =>
  `${address.slice(0, 6)}...${address.slice(-4)}`

const StyledButton = styled(Button)({
  backgroundColor: '#000',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#272727'
  }
})

export const ConnectWalletButton = (props: ButtonProps) => {
  useAccount({
    onConnect: () => {
      event('login', { category: 'connect', label: 'wallet' })
    }
  })
  return (
    <RainbowKitConnectButton.Custom>
      {({ account, openConnectModal, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready &&
          account &&
          (!authenticationStatus || authenticationStatus === 'authenticated')
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none'
              }
            })}
          >
            <StyledButton
              onClick={openConnectModal}
              type="button"
              {...props}
              disabled={connected}
            >
              {connected ? (
                <>
                  <Check sx={{ mr: 1 }} /> Connected as{' '}
                  {account.ensName ?? formatAddress(account.address)}
                </>
              ) : account && authenticationStatus === 'unauthenticated' ? (
                'Sign Message'
              ) : (
                'Connect Wallet'
              )}
            </StyledButton>
          </div>
        )
      }}
    </RainbowKitConnectButton.Custom>
  )
}
