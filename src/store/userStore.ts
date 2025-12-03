'use client'

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User{
    name?: string; //카카오
    kakaoId?: string; //카카오
    nickName?: string;//일반
    objectId: string;
    weight: number;
    height: number;
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
                    set((state: UserState) => {
                        if (typeof user === 'function') {
                            const newUser = user(state.user ?? null); // User 타입 반환
                            return { user: newUser } as Partial<UserState>; // 타입 단언
                        } else {
                            return { user: { ...user } } as Partial<UserState>; // 타입 단언
                        }
                    }),
            //     setUser: 
            //     (user) =>
            //         set((prev) =>
            //             typeof user === 'function'
            //     ? { user: user(prev.user ?? null) } as Partial<UserState>
            //     : { user: { ...(prev.user ?? {}), ...user } } as Partial<UserState>
            // ),
            clearUser: () => {
                set({user:null, userAccessToken: null})
                if(typeof window !== 'undefined'){
                    localStorage.removeItem('user')
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