import { KakaoCallbackClient } from "@/app/components/auth/KakaoCallbackClient";
import { KakaoLoginFallback } from "@/app/components/auth/KakaoLoginFallback";
import { Suspense } from "react";

export default function KakaoCallbackPage(){
    return (
        <Suspense fallback={<KakaoLoginFallback />}>
            <KakaoCallbackClient />
        </Suspense>
    )
}