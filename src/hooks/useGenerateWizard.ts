import {
  GenerateWizardContext,
  GenerateWizardContextType
} from '@components/GenerateWizard'
import { useContext } from 'react'

export const useGenerateWizardContext = (): GenerateWizardContextType => {
  const context = useContext(GenerateWizardContext)
  if (!context) {
    throw new Error(
      'useGenerateWizardContext must be used within a GenerateWizardContext'
    )
  }
  return context
}
