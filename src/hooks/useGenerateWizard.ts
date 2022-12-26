import {
  GenerateWizardContext,
  GenerateWizardContextType
} from '@components/GenerateWizard'
import { useContext } from 'react'

export const useGenerateWizardContext = (): GenerateWizardContextType => {
  return useContext(GenerateWizardContext)
}
