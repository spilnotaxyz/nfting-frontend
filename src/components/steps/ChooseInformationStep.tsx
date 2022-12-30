import { useGenerateWizardContext } from '@hooks/useGenerateWizard'
import { Info } from '@mui/icons-material'
import {
  Box,
  BoxProps,
  Button,
  Stack,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material'
import { useState, useCallback } from 'react'
import { Card } from '@ui'

const DataBlock = ({
  selected,
  onSelect,
  label
}: {
  selected?: boolean
  onSelect: (selected: boolean) => void
  label: string
}) => {
  const [isSelected, setIsSelected] = useState(selected ?? false)
  const theme = useTheme()
  return (
    <Box
      borderRadius="10px"
      p="15px 20px"
      onClick={() => {
        onSelect(!isSelected)
        setIsSelected(!isSelected)
      }}
      sx={{
        fontFamily: 'Inter, sans-serif',
        cursor: 'pointer',
        background: isSelected ? '#140BE3' : 'rgba(255, 255, 255, 0.1)',
        border: `1px solid ${
          isSelected ? 'rgba(20, 11, 227, 1)' : 'rgba(255, 255, 255, 0.2)'
        }`,
        transition: '0.5s',
        [theme.breakpoints.down('sm')]: {
          p: 1.25
        }
      }}
    >
      <Typography
        color="white"
        variant="body1"
        component="span"
        whiteSpace="nowrap"
        sx={{
          fontWeight: '500',
          [theme.breakpoints.down('sm')]: {
            fontSize: 14
          }
        }}
      >
        {label} {isSelected ? '-' : '+'}
      </Typography>
    </Box>
  )
}

const CollapsableStack = ({ ...rest }: BoxProps) => {
  const theme = useTheme()
  return (
    <Box
      {...rest}
      display="flex"
      flexWrap="wrap"
      gap="10px"
      sx={{
        [theme.breakpoints.down('sm')]: {
          gap: '5px'
        }
      }}
    />
  )
}

export type ChooseInformationStepState = Partial<{
  totalNFTsMinted: boolean
  totalSpentOnMint: boolean
  totalBought: boolean
  totalSold: boolean
  totalSoldInETH: boolean
  totalBoughtInETH: boolean
  biggestPurchase: boolean
  biggestSale: boolean
  bluechips: boolean
  avgHoldTime: boolean
}>

export const ChooseInformationStep = () => {
  const { next, prev, state } = useGenerateWizardContext()

  const [localState, setLocalState] =
    useState<ChooseInformationStepState>(state)

  const appendLocalState = useCallback(
    (obj: Partial<typeof localState>) => {
      setLocalState((prevState) => ({ ...prevState, ...obj }))
    },
    [setLocalState]
  )

  return (
    <Card>
      <Stack spacing={2}>
        <Stack spacing={1}>
          <Typography variant="subtitle1">Mints</Typography>
          <CollapsableStack>
            <DataBlock
              label="NFTs Minted"
              onSelect={(selected) =>
                appendLocalState({ totalNFTsMinted: selected })
              }
              selected={localState.totalNFTsMinted}
            />
            <DataBlock
              label="Spent on Mints (Ξ)"
              onSelect={(selected) =>
                appendLocalState({ totalSpentOnMint: selected })
              }
              selected={localState.totalSpentOnMint}
            />
          </CollapsableStack>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="subtitle1">Purchases</Typography>
          <CollapsableStack>
            <DataBlock
              label="NFTs Bought"
              onSelect={(selected) =>
                appendLocalState({ totalBought: selected })
              }
              selected={localState.totalBought}
            />
            <DataBlock
              label="Total Spent (Ξ)"
              onSelect={(selected) =>
                appendLocalState({ totalBoughtInETH: selected })
              }
              selected={localState.totalBoughtInETH}
            />
            <DataBlock
              label="Biggest purchase (Ξ)"
              onSelect={(selected) =>
                appendLocalState({ biggestPurchase: selected })
              }
              selected={localState.biggestPurchase}
            />
          </CollapsableStack>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="subtitle1">Sales</Typography>
          <CollapsableStack>
            <DataBlock
              label="NFTs Sold"
              onSelect={(selected) => appendLocalState({ totalSold: selected })}
              selected={localState.totalSold}
            />
            <DataBlock
              label="Total Sales (Ξ)"
              onSelect={(selected) =>
                appendLocalState({ totalSoldInETH: selected })
              }
              selected={localState.totalSoldInETH}
            />
            <DataBlock
              label="Biggest Sale (Ξ)"
              onSelect={(selected) =>
                appendLocalState({ biggestSale: selected })
              }
              selected={localState.biggestSale}
            />
          </CollapsableStack>
        </Stack>
        <Stack spacing={1}>
          <Box>
            <Typography
              variant="subtitle1"
              width="min-content"
              display="flex"
              alignItems="center"
              height="32px"
            >
              Holds
              <Tooltip title="Bluechip FP > 1Ξ | AVG > 0.2Ξ" placement="right">
                <Info color="secondary" sx={{ ml: 1, cursor: 'pointer' }} />
              </Tooltip>
            </Typography>
          </Box>
          <CollapsableStack>
            <DataBlock
              label="Bluechip NFTs"
              onSelect={(selected) => appendLocalState({ bluechips: selected })}
              selected={localState.bluechips}
            />
            <DataBlock
              label="Avg Hold Time"
              onSelect={(selected) =>
                appendLocalState({ avgHoldTime: selected })
              }
              selected={localState.avgHoldTime}
            />
          </CollapsableStack>
        </Stack>
      </Stack>
      <Box flexGrow={1} />
      {next && (
        <Button
          sx={{ mt: 3 }}
          size="large"
          variant="contained"
          fullWidth
          onClick={() => {
            next?.(localState)
          }}
        >
          Continue to add info
        </Button>
      )}
      {prev && (
        <Button onClick={prev} sx={{ mt: 2 }}>
          ← Back
        </Button>
      )}
    </Card>
  )
}
