import {
  Box,
  Divider,
  Unstable_Grid2 as Grid,
  Stack,
  StackProps,
  styled,
  Theme,
  Typography,
  TypographyProps,
  useMediaQuery,
  GridProps,
  Skeleton
} from '@mui/material'
import { ReactNode } from 'react'
import { Snow } from '@ui'

export type CardBodyProps = {
  username?: string
  image?: string
  favouriteCommunity?: string
  wish?: string
  whoBroughtMeHere?: string

  biggestSale?: number | null
  biggestPurchase?: number | null
  totalBought?: number | null
  totalSold?: number | null
  totalBoughtInETH?: number | null
  totalSoldInETH?: number | null
  totalSpentOnMint?: number | null
  totalNFTsMinted?: number | null
  bluechips?: number | null
  avgHoldTime?: number

  loading?: boolean
}

const LabelCaption = (props: TypographyProps) => {
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))
  return (
    <Typography
      {...props}
      fontSize={isMobile ? 10 : 12}
      color="rgba(255, 255, 255, 0.6)"
      whiteSpace="nowrap"
    />
  )
}

const Label = (props: TypographyProps) => {
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))
  return (
    <Typography
      {...props}
      fontSize={isMobile ? 12 : 14}
      color="rgba(255, 255, 255, 0.8)"
    />
  )
}

const Value = (props: TypographyProps) => {
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))
  return (
    <Typography
      {...props}
      fontFamily="NeueMachina"
      fontSize={isMobile ? 14 : 16}
      whiteSpace="nowrap"
    />
  )
}

const DataBlock = ({
  header,
  data,
  loading,
  ...props
}: StackProps & {
  header: string
  data: Record<string, ReactNode>
  loading?: boolean
}) => {
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))
  return (
    <Stack flexGrow={1} spacing={isMobile ? 1.875 : 2.5} {...props}>
      <LabelCaption>{header}</LabelCaption>
      <Stack justifyContent="space-between" direction="row" spacing={1}>
        <Stack spacing={1.875} justifyContent="space-between">
          {loading
            ? new Array(3)
                .fill(0)
                .map((_, i) => <Skeleton width={50} key={i} />)
            : Object.keys(data).map((label, i) => (
                <Label key={i}>{label}</Label>
              ))}
        </Stack>
        <Stack spacing={1.875} justifyContent="space-between">
          {loading
            ? new Array(3)
                .fill(0)
                .map((_, i) => <Skeleton width={50} key={i} />)
            : Object.values(data).map((value, i) => (
                <Value key={i}>{value}</Value>
              ))}
        </Stack>
      </Stack>
    </Stack>
  )
}

const MessageBox = styled(Box)(({ theme }) => ({
  fontSize: 12,
  background: 'rgba(255, 255, 255, 0.21)',
  borderRadius: 15,
  padding: `${theme.spacing(1.875)} ${theme.spacing(2.5)}`,
  fontFamily: 'NeueMachina',
  border: '1px solid rgba(255, 255, 255, 0.49)',
  [theme.breakpoints.down('sm')]: {
    fontSize: 11,
    padding: `${theme.spacing(1.25)} ${theme.spacing(1.875)}`
  }
}))

const SectionDivider = styled(Divider)({
  borderColor: 'rgba(255, 255, 255, 0.2)'
})

// `<Grid>` inside `<Stack>` bug
// https://github.com/mui/material-ui/issues/29221
const BoxedGrid = (props: GridProps) => {
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))
  return (
    <Box>
      <Grid {...props} px={isMobile ? 0 : 2} />
    </Box>
  )
}

const Title = (props: TypographyProps & { loading?: boolean }) => {
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))
  return (
    <Typography
      {...props}
      fontFamily="NeueMachina"
      fontSize={isMobile ? 18 : 28}
    />
  )
}

export const CardBody = ({
  username,
  image,
  favouriteCommunity,
  wish,
  whoBroughtMeHere,
  biggestSale,
  biggestPurchase,
  totalBought,
  totalSold,
  totalBoughtInETH,
  totalSoldInETH,
  totalSpentOnMint,
  totalNFTsMinted,
  bluechips,
  avgHoldTime,
  loading
}: CardBodyProps) => {
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        pt={isMobile ? 2.5 : 3.125}
        pb={isMobile ? 1.875 : 3.125}
        px={isMobile ? 2.5 : 3.75}
      >
        <Title mr={1} lineHeight={1} loading={loading}>
          2023 NFTing
        </Title>
        <Snow width={isMobile ? 16 : 27} height={isMobile ? 16 : 27} />
      </Box>
      <SectionDivider />
      <Stack
        px={isMobile ? 2.5 : 3.75}
        py={isMobile ? 3.125 : 4.75}
        spacing={2}
      >
        <Stack
          spacing={isMobile ? 2 : 4.75}
          display="flex"
          direction={isMobile ? 'column' : 'row'}
        >
          <Box display="flex" alignItems="center">
            <Box mr={2}>
              {loading ? (
                <Skeleton
                  variant="circular"
                  width={isMobile ? 66 : 100}
                  height={isMobile ? 66 : 100}
                />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element*/
                <img
                  src={image}
                  alt="Avatar"
                  {...(isMobile
                    ? {
                        width: 66,
                        height: 66
                      }
                    : {
                        width: 100,
                        height: 100
                      })}
                  style={{
                    borderRadius: '50%',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                />
              )}
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography
                fontFamily="NeueMachina"
                fontSize={isMobile ? 14 : 18}
              >
                {loading ? <Skeleton width={120} /> : `@${username}`}
              </Typography>
              <LabelCaption mt={1.5}>
                {loading ? <Skeleton width={120} /> : 'My favourite community'}
              </LabelCaption>
              <Typography
                fontFamily="NeueMachina"
                fontSize={12}
                color="rgba(255, 255, 255, 0.8)"
              >
                {loading ? <Skeleton width={120} /> : `@${favouriteCommunity}`}
              </Typography>
            </Box>
          </Box>
          <Stack spacing={isMobile ? 0.625 : 1} width="100%">
            {loading ? (
              <Skeleton
                width={isMobile ? 'auto' : 340}
                variant="rounded"
                height={60}
              />
            ) : (
              <MessageBox>{wish}</MessageBox>
            )}

            {loading ? (
              <Skeleton
                variant="rounded"
                height={60}
                width={isMobile ? 'auto' : 340}
              />
            ) : (
              whoBroughtMeHere && <MessageBox>{whoBroughtMeHere}</MessageBox>
            )}
          </Stack>
        </Stack>
        <SectionDivider />
        <BoxedGrid container spacing={isMobile ? 4 : 11.25}>
          <Grid xs={6}>
            <DataBlock
              header="Mints"
              data={{
                Minted: `${totalNFTsMinted ?? '?'} nfts`,
                Spent: `${totalSpentOnMint?.toFixed(2) ?? '?'} Ξ`
              }}
              loading={loading}
            />
          </Grid>
          <Grid xs={6}>
            <DataBlock
              header="Purchases"
              data={{
                Bought: `${totalBought ?? '?'} nfts`,
                'Total spent': `${totalBoughtInETH?.toFixed(2) ?? '?'} Ξ`,
                'Biggest purchase': `${biggestPurchase?.toFixed(2) ?? '?'} Ξ`
              }}
              loading={loading}
            />
          </Grid>
        </BoxedGrid>
        <SectionDivider />
        <BoxedGrid container spacing={isMobile ? 4 : 11.25}>
          <Grid xs={6}>
            <DataBlock
              header="Sales"
              data={{
                Sold: `${totalSold ?? '?'} nfts`,
                'Total sales': `${totalSoldInETH?.toFixed(2) ?? '?'} Ξ`,
                'Biggest sale': `${biggestSale?.toFixed(2) ?? '?'} Ξ`
              }}
              loading={loading}
            />
          </Grid>
          <Grid xs={6}>
            <DataBlock
              header="Holds"
              data={{
                'Bluechips (FP > 1 Ξ)': `${bluechips ?? '?'} nfts`,
                'Avg time of holding (FP > 0.2 Ξ)': `${
                  avgHoldTime ? Number(avgHoldTime / 86400).toFixed(0) : '?'
                } days`
              }}
              loading={loading}
            />
          </Grid>
        </BoxedGrid>
        <SectionDivider />
        <Box display="flex" justifyContent="center">
          <Typography fontFamily="NeueMachina" fontSize={isMobile ? 12 : 16}>
            Generated by @spilnotaxyz
          </Typography>
        </Box>
      </Stack>
    </>
  )
}
