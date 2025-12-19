import { useMutation } from '@tanstack/react-query'
import { axiosInstance} from '@/lib/axios'
import {FixedUser} from '@/types/user'

interface AiSearch{
    prompt: string;
    user: FixedUser;
}

const aiSearch = async (userAndPrompt: AiSearch) => {
    const res = await axiosInstance.post('/ai-search', userAndPrompt)
    return res.data.answer
}


const usePostAiSearch = () => {

    return useMutation({
        mutationFn: (userAndPrompt: AiSearch) => aiSearch(userAndPrompt),
        onSuccess: (data) => {console.log('success')},
        onError: (error) => {console.log('error')}
    })
}

export default usePostAiSearch