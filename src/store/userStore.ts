'use client'

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User{
    name?: string; //카카오
    kakaoId?: string; //카카오
    nickName?: string;//일반
    objectId?: string;
    weight?: number;
    height?: number;
    age?: number;
    gender?: 'male' | 'female';
    activity?: 'sedentary' | 'light' | 'moderate' | 'active';
    goal?: 'bulk' | 'diet' | 'maintain'
}

interface UserState{
    user: User | null;
    setUser: (user: Partial<User> | ((prev: User | null) => User)) => void;
    clearUser: () => void;
    userAccessToken: string | null;
    setUserAccessToken: (token: string | null ) => void

}

export const useUserStore = create<UserState>()(
    persist(
        (set) => 
            ({
                user: null,
                setUser: (user) =>
                    set((state) => {
                        const prev = state.user ?? {};
                
                        if (typeof user === "function") {
                            return { user: user(prev) };
                        }
                
                        return {
                            user: {
                                ...prev,
                                ...user
                            }
                        };
                    }),
            clearUser: () => {
                set({user:null, userAccessToken: null})
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('user')
                    localStorage.removeItem('message')
                    localStorage.removeItem('message_date')
                }
            },
            userAccessToken: null,
            setUserAccessToken: (token: string | null) => set({userAccessToken: token}),
        }),{
            name: 'user',
            partialize: (state) => ({
                user: state.user,
            }),
        },
    
))