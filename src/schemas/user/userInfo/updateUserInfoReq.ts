import { userInfoReqSchema } from '@/schemas/user/userInfo/userInfoReq'


export const updateUserInfoReqSchema = userInfoReqSchema.omit({gender: true}).partial().refine(
    data => Object.keys(data).length > 0, {message: '수정할 정보를 입력해주세요'}
)

