'use client'

import { create } from "zustand"

interface User{
    email?: string;
    kakaoId?: string;
    nickName?: string;
    objectId: string;
}

interface UserState{
    user: User | null;
    setUser: (user:User) => void;
    clearUser: () => void;
    userAccessToken: string | null;
    setUserAccessToken: (token: string) => void
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({user}),
    clearUser: () => set({user:null}),
    userAccessToken: null,
    setUserAccessToken: (token: string) => set({userAccessToken: token})
}))