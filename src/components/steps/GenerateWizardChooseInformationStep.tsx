import { useGenerateWizardContext } from '@hooks/useGenerateWizard'
import { Box, BoxProps, Button, Stack, styled, Typography } from '@mui/material'
import { BlurredPaper } from '@ui/BlurredPaper'
import { useState, useCallback } from 'react'

const Block = styled(BlurredPaper)({
  background: 'rgba(255, 255, 255, 0.4)',
  border: 'none',
  padding: 10
})

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
        background: selected ? '#19097C' : '#fff',
        border: '1px solid #A9B7C5'
      }}
    >
      <Typography
        color={selected ? 'white' : 'black'}
        variant="body1"
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

  return (
    <>
      <Stack spacing={1}>
        <Block>
          <CollapsableStack gap="10px">
            <DataBlock
              label="Number of mints"
              onSelect={(selected) =>
                appendLocalState({ numberOfMints: selected })
              }
            />
            <DataBlock
              label="Spent on mints"
              onSelect={(selected) =>
                appendLocalState({ spentOnMints: selected })
              }
            />
            <DataBlock
              label="Total NFTs bought"
              onSelect={(selected) =>
                appendLocalState({ totalNFTsBought: selected })
              }
            />
            <DataBlock
              label="Total NFTs sold"
              onSelect={(selected) =>
                appendLocalState({ totalNFTsSold: selected })
              }
            />
          </CollapsableStack>
        </Block>
        <Block>
          <CollapsableStack gap="10px">
            <DataBlock
              label="Total sales in ETH"
              onSelect={(selected) =>
                appendLocalState({ totalSalesInETH: selected })
              }
            />
            <DataBlock
              label="Total spent in ETH"
              onSelect={(selected) =>
                appendLocalState({ totalSpentInETH: selected })
              }
            />
            <DataBlock
              label="Biggest purchase in ETH"
              onSelect={(selected) =>
                appendLocalState({ biggestPurchaseInETH: selected })
              }
            />
            <DataBlock
              label="Biggest sale in ETH"
              onSelect={(selected) =>
                appendLocalState({ biggestSaleInETH: selected })
              }
            />
            <DataBlock
              label="Top 100 OS NFT holding"
              onSelect={(selected) =>
                appendLocalState({ top100OSNFTHolding: selected })
              }
            />
          </CollapsableStack>
        </Block>
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
