

import axios from "axios"

const checkEmail = async(email: string) => {
    try {
        console.log('email', email)
        const res = await axios.post('/api/check-email',{email})

        // * 디비에 이메일이 없으면 = 이메일을 사용할 수 있으면 
        return res.data.success
    } catch (error) {
        console.log('error', error)
        return false
    }
}

export default checkEmail