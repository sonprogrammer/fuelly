import { useUserStore } from "@/store/userStore";
import axios from "axios";


interface LoginInfo{
    email: string;
    password: string;
}


const useRegularLogin = async ({email, password}: LoginInfo) => {
    const res = await axios.post('/api/regular-login',
        {email, password},
        {withCredentials: true}
    )
    console.log('res', res)
}