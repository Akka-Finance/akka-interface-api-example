import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

interface HealthcheckResponseType {
    status: string,
    provider: string
}
const Healthcheck = () => {
    const [info, setInfo] = useState<HealthcheckResponseType | null>(null)
    useEffect(() => {
        fetch("https://seal-app-vln3e.ondigitalocean.app/v2/1116/healthcheck")
            .then((res) => res.json())
            .then((data) => {
                setInfo(data)
            })
    }, [])
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}>
            <Typography variant='h6' sx={{fontSize: "16px"}}>API status: </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "-2px" }}>{info?.status === "OK" ? "🟢" : "🔴"}</Box>
        </Box>
    )
}

export default Healthcheck