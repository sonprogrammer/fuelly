'use client'

import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
// !추가할지 말지 고민
import ManualMenue from './ManualMenu'
import AiMenu from './AiMenu'
import AddNomalMenu from './AddNomalMenu'

export default function AddMenu() {
    const [choice, setChoice] = useState<'manual' | 'ai' >('manual');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newChoice: 'manual' | 'ai' | null 
    ) => {
        if (newChoice !== null) {
            setChoice(newChoice)
          }
    }
    
    return (
        <div>
            <Box display="flex" justifyContent="center" my={2}>
                <ToggleButtonGroup
                    value={choice}
                    exclusive
                    onChange={handleChange}
                    aria-label="food choice"
                >
                    <ToggleButton value="manual" aria-label="직접 추가">
                        음식 직접 추가
                    </ToggleButton>
                    <ToggleButton value="ai" aria-label="AI 추천">
                        AI 추천 받기
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
            {choice == 'manual' ? 
            <div>
                {/* TODO 밑에 컴포넌트는 ai 검색하는 컴포넌트임 이 페이지에서 사용할지 아님 ai 검색 페이지에서만 쓸지 고민*/}
            {/* <ManualMenue /> */}
            <AddNomalMenu />
            </div>
            :
            <AiMenu />
        }
        </div>
    )
}