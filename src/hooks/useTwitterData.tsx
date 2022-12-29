import {
  useState,
  createContext,
  useContext,
  PropsWithChildren,
  useEffect,
  SetStateAction,
  Dispatch
} from 'react'
import { useSession } from 'next-auth/react'

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
  const { data: sessionData } = useSession()
  const [data, setData] = useState<TwitterDataContextType['data'] | null>(null)

  useEffect(() => {
    if (sessionData && sessionData.user.image && sessionData.user.name)
      setData({
        name: sessionData.user.name,
        image: sessionData.user.image
      })
  }, [sessionData])

  return <TwitterDataContext.Provider value={{ data, setData }} {...props} />
}
