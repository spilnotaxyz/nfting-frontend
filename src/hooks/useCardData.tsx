import { createContext, PropsWithChildren, useContext, useState } from 'react'

export type CardDataContextType = {
  data?: {
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
  }
  setData: (data: CardDataContextType['data']) => void
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
  const [data, setData] = useState<CardDataContextType['data'] | undefined>()

  return (
    <CardDataContext.Provider value={{ data, setData }}>
      {children}
    </CardDataContext.Provider>
  )
}
