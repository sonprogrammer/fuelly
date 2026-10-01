import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from "zustand";

type AgreementState = {
    termsOfService: boolean
    privacyPolicy: boolean
    serviceImprovement: boolean
}

interface AgreementStore {
    agreements: AgreementState
    termOpen: boolean
    setAgreement: (key: keyof AgreementState, checked: boolean) => void
    setTermOpen: (open: boolean) => void
    setAllAgreements: (checked: boolean) => void
    resetAgreements: () => void
}

const initialAgreements: AgreementState = {
    termsOfService: false,
    privacyPolicy: false,
    serviceImprovement: false,
}

export const useAgreementStore = create<AgreementStore>()(
  persist(
    (set) => ({
      agreements: initialAgreements,
      termOpen: false,
      setAgreement: (key, checked) =>
        set((state) => ({
          agreements: {
            ...state.agreements,
            [key]: checked,
          },
        })),
        setTermOpen: (open) => set({termOpen: open}),

      setAllAgreements: (checked) =>
        set({
          agreements: {
            termsOfService: checked,
            privacyPolicy: checked,
            serviceImprovement: checked,
          },
        }),

      resetAgreements: () =>
        set({
          agreements: initialAgreements,
        }),
    }),
    {
      name: 'fuelly-agreements',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)