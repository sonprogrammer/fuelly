
import { Box, Typography, LinearProgress, Tooltip } from "@mui/material";
import React from "react";

interface Props {
    name: string;
    currentGrams: number;
    targetGrams: number;
    icon: React.ReactNode
    exceed: number
}


function AmountComponent({ currentGrams, targetGrams, name, icon, exceed }: Props) {


    const current = Math.max(0, currentGrams);
    const percent = Math.min(100, Math.round((current / targetGrams) * 100));
    return (
        <div className="border border-gray-300 rounded-lg flex-1 p-5 bg-white flex flex-col gap-3">
            <section className='flex justify-between'>
                <h1>{name}</h1>
                {icon}
            </section>


            <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="subtitle2"></Typography>
                    <Typography variant="subtitle2" color="text.">
                        {current.toLocaleString()}g / {targetGrams.toLocaleString()}g ({percent}%)
                    </Typography>
                </Box>
                <Tooltip title={`${current}g / ${targetGrams}g`} arrow>
                    <LinearProgress
                        variant="determinate"
                        value={percent}
                        aria-label="amount-progress"
                        sx={{
                            height: 12,
                            borderRadius: 6,
                            backgroundColor: (theme) =>
                                theme.palette.mode === "light" ? "#eee" : theme.palette.grey[800],
                            "& .MuiLinearProgress-bar": {
                                borderRadius: 6,
                                transition: "width 600ms ease",
                                background: percent >= 100
                                    ? "linear-gradient(90deg,#ef4444,#b91c1c)"
                                    : percent >= 75
                                        ? "linear-gradient(90deg,#f59e0b,#f97316)"
                                        : "linear-gradient(90deg,#ef4444,#f97316)",
                            },
                        }}
                    />
                </Tooltip>
            </Box>
            <h2 className="text-sm">남은 {name} :  
                {targetGrams - currentGrams > 0
                    ? <span className="text-green-500 font-bold"> {targetGrams - currentGrams}g</span>
                    : <span className="text-red-500 font-bold"> +{Math.abs(targetGrams - currentGrams)}g 초과!</span>
                }
            </h2>
        </div>
    )
}

export default React.memo(AmountComponent);