

import axios from "axios"

const checkEmail = async(email: string) => {
    try {
        const res = await axios.post('/api/check-email',{email})

        return res.data.success
    } catch (error) {
        console.log('error', error)
        return false
    }
}

export default checkEmail