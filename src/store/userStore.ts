'use client'

import { create } from "zustand"

interface User{
    email?: string;
    kakaoId?: string;
    name: string;
    objectId: string;
}

interface UserState{
    user: User | null;
    setUser: (user:User) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({user}),
    clearUser: () => set({user:null})
}))