import {
  createContext,
  useContext,
  PropsWithChildren,
  SetStateAction,
  Dispatch
} from 'react'
import { useLocalStorage } from './useLocalStorage'

type AddressDataContextType = {
  address: string | null
  setData: Dispatch<SetStateAction<AddressDataContextType['address']>>
}

export const AddressDataContext = createContext<AddressDataContextType | null>(
  null
)

export const useAddressData = () => {
  const context = useContext(AddressDataContext)
  if (!context)
    throw new Error(
      'useAddressData must be used within TwitterDataContextProvider'
    )
  return context
}

export const AddressDataContextProvider = (props: PropsWithChildren) => {
  const [address, setData] = useLocalStorage<
    AddressDataContextType['address'] | null
  >('address', null)

  return <AddressDataContext.Provider value={{ address, setData }} {...props} />
}
