'use client'

import { AGREEMENTS } from "@/app/components/term-bottomsheet/agreements"
import { TermBottomSheetProps } from "@/app/components/term-bottomsheet/type"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { useAgreePolicy } from "@/hooks/useAgreePolicy"
import { useAgreementStore } from "@/store/agreementsStore"
import { useUserStore } from "@/store/userStore"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useShallow } from "zustand/react/shallow"




export function TermBottomSheet({ open }: TermBottomSheetProps) {
  const router = useRouter()
  
  const { agreements, setAgreements, setAllAgreements,resetAgreements,setTermOpen } = useAgreementStore(useShallow(state => ({
    agreements: state.agreements,
    setAgreements: state.setAgreement,
    setAllAgreements: state.setAllAgreements,
    resetAgreements: state.resetAgreements,
    setTermOpen: state.setTermOpen
  })))

  const user = useUserStore(state => state.user)
  console.log('agreements', agreements)

  const { mutate: agreePolicy, isPending } = useAgreePolicy()

  const isAllAgreed = AGREEMENTS.every((term) => agreements[term.id])

  const handleAgree = () => {
    agreePolicy(agreements,{
      onSuccess: () => {
        resetAgreements()
        setTermOpen(false)

        if(user?.height && user.weight){
          router.replace('/home')
        }else{
          router.replace('/survey')
        }
        
      }
    })
    
  }

  return (
    <Drawer open={open} onOpenChange={setTermOpen}>
      <DrawerContent className="max-h-[85dvh]">
        <DrawerHeader className="border-b">
          <DrawerTitle>Fuelly 이용약관</DrawerTitle>

          <DrawerDescription>
            시행일 2026년 10월 1일
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex items-center justify-end gap-3 border-b px-5 py-4">
          <Checkbox
            id="all-agreements"
            checked={isAllAgreed}
            onCheckedChange={(checked) => setAllAgreements(checked === true)}
          />

          <label
            htmlFor="all-agreements"
            className="cursor-pointer text-sm font-semibold"
          >
            전체 동의
          </label>
        </div>

        {AGREEMENTS.map((term) => (
          <div
            key={term.id}
            className="flex items-center justify-between py-3 px-5 "
          >
            <div className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                id={term.id}
                checked={agreements[term.id]}
                onCheckedChange={(checked) =>
                  setAgreements(term.id, checked === true)}
              />

              <label htmlFor={term.id} className="text-sm cursor-pointer">
                <span className={term.required ? 'font-medium' : ''}>
                  [{term.required ? '필수' : '선택'}] {term.label}
                </span>
              </label>
            </div>


            <Link
              href={term.href}
              className="text-sm text-muted-foreground underline transition-transform duration-200 hover:-translate-y-0.5"
            >
              보기
            </Link>
          </div>
        ))}


        <DrawerFooter className="border-t">
          <Button
            className="w-full bg-emerald-500 hover:bg-emerald-700 active:scale-95"
            disabled={!agreements.termsOfService || !agreements.privacyPolicy || isPending}
            onClick={handleAgree}
          >
            {isPending ? "처리 중..." : "동의하고 이용하기"}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}