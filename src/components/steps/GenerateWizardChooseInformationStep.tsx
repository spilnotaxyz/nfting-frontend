import { useGenerateWizardContext } from '@hooks/useGenerateWizard'
import { Info } from '@mui/icons-material'
import { Box, BoxProps, Button, Chip, Stack, Typography } from '@mui/material'
import { useState, useCallback } from 'react'

const DataBlock = ({
  onSelect,
  label
}: {
  onSelect: (selected: boolean) => void
  label: string
}) => {
  const [selected, setSelected] = useState(false)
  return (
    <Box
      borderRadius="10px"
      p="15px 20px"
      onClick={() => {
        onSelect(!selected)
        setSelected(!selected)
      }}
      sx={{
        cursor: 'pointer',
        background: selected ? '#19097C' : 'rgba(255, 255, 255, 0.1)',
        border: `1px solid ${
          selected ? 'rgba(20, 11, 227, 1)' : 'rgba(255, 255, 255, 0.2)'
        }`
      }}
    >
      <Typography
        color="white"
        variant="body1"
        fontFamily="Inter"
        fontWeight="500"
        component="span"
        whiteSpace="nowrap"
      >
        {label} {selected ? '-' : '+'}
      </Typography>
    </Box>
  )
}

const CollapsableStack = ({ gap, ...rest }: BoxProps & { gap: string }) => (
  <Box {...rest} display="flex" flexWrap="wrap" gap={gap} />
)

export type GenerateWizardChooseInformationStepState = Partial<{
  numberOfMints: boolean
  spentOnMints: boolean
  totalNFTsBought: boolean
  totalNFTsSold: boolean
  totalSalesInETH: boolean
  totalSpentInETH: boolean
  biggestPurchaseInETH: boolean
  biggestSaleInETH: boolean
  top100OSNFTHolding: boolean
  avgHoldTime: boolean
}>

export const GenerateWizardChooseInformationStep = () => {
  const { next } = useGenerateWizardContext()

  const [localState, setLocalState] =
    useState<GenerateWizardChooseInformationStepState>({})

  const appendLocalState = useCallback(
    (obj: Partial<typeof localState>) => {
      setLocalState((prevState) => ({ ...prevState, ...obj }))
    },
    [setLocalState]
  )

  const [hovering, setHovering] = useState(false)

  return (
    <>
      <Stack spacing={2}>
        <Stack spacing={1}>
          <Typography variant="subtitle1">Mints</Typography>
          <CollapsableStack gap="10px">
            <DataBlock
              label="NFTs Minted"
              onSelect={(selected) =>
                appendLocalState({ numberOfMints: selected })
              }
            />
            <DataBlock
              label="Spent on Mints (Ξ)"
              onSelect={(selected) =>
                appendLocalState({ spentOnMints: selected })
              }
            />
          </CollapsableStack>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="subtitle1">Purchases</Typography>
          <CollapsableStack gap="10px">
            <DataBlock
              label="NFTs Bought"
              onSelect={(selected) =>
                appendLocalState({ totalNFTsBought: selected })
              }
            />
            <DataBlock
              label="Total Spent (Ξ)"
              onSelect={(selected) =>
                appendLocalState({ totalSpentInETH: selected })
              }
            />
            <DataBlock
              label="Biggest purchase (Ξ)"
              onSelect={(selected) =>
                appendLocalState({ biggestPurchaseInETH: selected })
              }
            />
          </CollapsableStack>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="subtitle1">Sales</Typography>
          <CollapsableStack gap="10px">
            <DataBlock
              label="NFTs Sold"
              onSelect={(selected) =>
                appendLocalState({ totalNFTsSold: selected })
              }
            />
            <DataBlock
              label="Total Sales (Ξ)"
              onSelect={(selected) =>
                appendLocalState({ totalSalesInETH: selected })
              }
            />
            <DataBlock
              label="Biggest Sale (Ξ)"
              onSelect={(selected) =>
                appendLocalState({ biggestSaleInETH: selected })
              }
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
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              Holds <Info sx={{ ml: 1, color: '#fff !important' }} />
              {hovering && (
                <Chip label="FP > 1Ξ, Volume 30Ξ last 30 days" sx={{ ml: 1 }} />
              )}
            </Typography>
          </Box>
          <CollapsableStack gap="10px">
            <DataBlock
              label="NFT Holdings Top 100"
              onSelect={(selected) =>
                appendLocalState({ top100OSNFTHolding: selected })
              }
            />
            <DataBlock
              label="Avg Hold Time"
              onSelect={(selected) =>
                appendLocalState({ avgHoldTime: selected })
              }
            />
          </CollapsableStack>
        </Stack>
      </Stack>
      <Box flexGrow={1} />
      <Button
        sx={{ mt: 3 }}
        size="large"
        variant="contained"
        fullWidth
        disabled={!next}
        onClick={() => {
          next?.(localState)
        }}
      >
        Continue
      </Button>
    </>
  )
}