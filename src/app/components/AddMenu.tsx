'use client'

import { useState } from 'react';
import AiMenu from './AiMenu'
import AddNomalMenu from './AddNomalMenu'
import { ClipboardList, Sparkles } from 'lucide-react';

export default function AddMenu() {
    const [choice, setChoice] = useState<'manual' | 'ai' >('manual');

    
    return (
        <div className="rounded-2xl border border-gray-800 bg-gray-900 overflow-hidden">
        <div className="flex border-b border-gray-800">
            <button
                onClick={() => setChoice('manual')}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors
                    ${choice === 'manual'
                        ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-500/5'
                        : 'text-gray-600 hover:text-gray-400'
                    }`}
            >
                <ClipboardList className="w-4 h-4" />
                직접 추가
            </button>
            <button
                onClick={() => setChoice('ai')}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors
                    ${choice === 'ai'
                        ? 'text-purple-400 border-b-2 border-purple-400 bg-purple-500/5'
                        : 'text-gray-600 hover:text-gray-400'
                    }`}
            >
                <Sparkles className="w-4 h-4" />
                AI 추천
            </button>
        </div>
        <div className="p-5">
            {choice === 'manual' ? <AddNomalMenu /> : <AiMenu />}
        </div>
    </div>
 
    )
}