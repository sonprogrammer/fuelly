import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/axios'
import { useUserStore } from "@/store/userStore"
import { updateUserInfoResSchema } from '@/schemas/user/userInfo/updatedUserInfoRes'


interface UpdateData {
    weight?: number
    height?: number
    goal?: 'bulk' | 'diet' | 'maintain'
    activity?: 'sedentary' | 'light' | 'moderate' | 'active'
    birthDate?: string
}

const updateUserInfo = async (update: UpdateData) => {
    const res = await axiosInstance.patch<unknown>('/updated-userinfo', update)
    return updateUserInfoResSchema.parse(res.data)
}

const useUpdatedUserInfo = () => {
    const queryClient = useQueryClient()
    const setUser = useUserStore(state => state.setUser)
    return useMutation({
        mutationFn: updateUserInfo,
        onSuccess: (res) => {
            const updatedUser = res.userUpdated
            queryClient.setQueryData(['user'], updatedUser)
            setUser(updatedUser)
        }
    })
}

export default useUpdatedUserInfo