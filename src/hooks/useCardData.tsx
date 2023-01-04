import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState
} from 'react'

export type CardDataContextType = {
  data: {
    username?: string
    image?: string
    favouriteCommunity?: string
    wish?: string
    whoBroughtMeHere?: string

    biggestSale?: number
    biggestPurchase?: number
    totalBought?: number
    totalSold?: number
    totalBoughtInETH?: number
    totalSoldInETH?: number
    totalSpentOnMint?: number
    totalNFTsMinted?: number
    bluechips?: number
    avgHoldTime?: number
    holdTransactions?: number
  }
  appendData: (data: CardDataContextType['data']) => void
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}

const CardDataContext = createContext<CardDataContextType | undefined>(
  undefined
)

export const useCardData = () => {
  const context = useContext(CardDataContext)

  if (!context) {
    throw new Error('useCardData must be used within a CardDataProvider')
  }

  return context
}

export const CardDataProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<CardDataContextType['data']>({})
  const [loading, setLoading] = useState(true)

  return (
    <CardDataContext.Provider
      value={{
        data,
        appendData: (data) =>
          setData((prevState) => {
            // add up the number fields
            //if (Object.values(data ?? {}).every((v) => !v)) return prevState
            const holdTransactions =
              (prevState.holdTransactions ?? 0) + (data.holdTransactions ?? 0)
            return {
              totalBought:
                (prevState.totalBought ?? 0) + (data.totalBought ?? 0),
              totalSold: (prevState.totalSold ?? 0) + (data.totalSold ?? 0),
              totalBoughtInETH:
                (prevState.totalBoughtInETH ?? 0) +
                (data.totalBoughtInETH ?? 0),
              totalSoldInETH:
                (prevState.totalSoldInETH ?? 0) + (data.totalSoldInETH ?? 0),
              totalSpentOnMint:
                (prevState.totalSpentOnMint ?? 0) +
                (data.totalSpentOnMint ?? 0),
              totalNFTsMinted:
                (prevState.totalNFTsMinted ?? 0) + (data.totalNFTsMinted ?? 0),
              bluechips: (prevState.bluechips ?? 0) + (data.bluechips ?? 0),
              avgHoldTime:
                ((prevState.avgHoldTime ?? 0) *
                  (prevState.holdTransactions ?? 0) +
                  (data.avgHoldTime ?? 0) * (data.holdTransactions ?? 0)) /
                holdTransactions,
              holdTransactions,
              biggestPurchase: Math.max(
                prevState.biggestPurchase ?? 0,
                data.biggestPurchase ?? 0
              ),
              biggestSale: Math.max(
                prevState.biggestSale ?? 0,
                data.biggestSale ?? 0
              )
            }
            // prevState.totalBought = prevState.totalSold =
            //   (prevState?.totalSold ?? 0) + (data.totalSold ?? 0)
            // prevState.totalBoughtInETH =
            //   (prevState?.totalBoughtInETH ?? 0) + (data.totalBoughtInETH ?? 0)
            // prevState.totalSoldInETH =
            //   (prevState?.totalSoldInETH ?? 0) + (data.totalSoldInETH ?? 0)
            // prevState.totalNFTsMinted =
            //   (prevState?.totalNFTsMinted ?? 0) + (data.totalNFTsMinted ?? 0)
            // prevState.totalSpentOnMint =
            //   (prevState?.totalSpentOnMint ?? 0) + (data.totalSpentOnMint ?? 0)
            // prevState.bluechips =
            //   (prevState?.bluechips ?? 0) + (data.bluechips ?? 0)
            // prevState.avgHoldTime =
            //   ((prevState?.avgHoldTime ?? 0) *
            //     (prevState?.holdTransactions ?? 0) +
            //     (data.avgHoldTime ?? 0) * (data.holdTransactions ?? 0)) /
            //   ((prevState.holdTransactions ?? 1) + (data.holdTransactions ?? 1))

            // return prevState
          }),
        loading,
        setLoading
      }}
    >
      {children}
    </CardDataContext.Provider>
  )
}
