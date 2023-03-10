import {
  createContext,
  useContext,
  PropsWithChildren,
  SetStateAction,
  Dispatch
} from 'react'
import { useLocalStorage } from './useLocalStorage'

type TwitterDataContextType = {
  data: {
    name: string
    image: string
  } | null
  setData: Dispatch<SetStateAction<TwitterDataContextType['data']>>
}

export const TwitterDataContext = createContext<TwitterDataContextType | null>(
  null
)

export const useTwitterData = () => {
  const context = useContext(TwitterDataContext)
  if (!context)
    throw new Error(
      'useTwitterData must be used within TwitterDataContextProvider'
    )
  return context
}

export const TwitterDataContextProvider = (props: PropsWithChildren) => {
  const [data, setData] = useLocalStorage<
    TwitterDataContextType['data'] | null
  >('twitter-data', null)

  return <TwitterDataContext.Provider value={{ data, setData }} {...props} />
}
