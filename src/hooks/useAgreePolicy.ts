import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface AgreePolicyData {
    termsOfService: boolean
    privacyPolicy: boolean
    serviceImprovement: boolean
}

interface AgreePlicyRes{
    success: boolean
}

const agreePolicy = async(data: AgreePolicyData): Promise<AgreePlicyRes> => {
    const res = await axiosInstance.patch('/policy-agreement', data)
    return res.data
}

export function useAgreePolicy() {
    return useMutation({
        mutationFn: agreePolicy,
    })
}