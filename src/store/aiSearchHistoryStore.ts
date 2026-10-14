
import { AiSearchHistory } from "@/types/ai";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AiSearchHistoryStore {
    histories: AiSearchHistory[]
    addHistory: (history: AiSearchHistory) => void
    removeHistory: (id: string) => void
    clearHistory: () => void
}

export const useAiSearchHistoryStore = create<AiSearchHistoryStore>()(
    persist(
        set => ({
            histories: [],
            addHistory: history => set(state  => ({
                histories: [history, ...state.histories.filter(item => item.prompt !== history.prompt)].slice(0,10)
            })),
            removeHistory: id => set(state => ({
                histories: state.histories.filter(item => item._id !== id)
            })),
            clearHistory: () => set({histories: []})
        }),
        {
            name: 'fuelly-ai-search-histories',
            storage: createJSONStorage(() => localStorage)
        }
    )
)