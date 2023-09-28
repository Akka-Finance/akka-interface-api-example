import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SrcInfo from './SrcInfo'
import DstInfo from './DstInfo'
import Route from './Route'
import { RouteResponseType } from '../types/route'
import { TokensResponseType } from '../types/tokens'
import Swap from './Swap'

const Qoute = () => {
    const [RouteData, setRouteData] = useState<RouteResponseType | null>(null)
    useEffect(() => {
        fetch("https://router.akka.finance/v2/1116/quote?src=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&dst=0x6E35fF7aC8eEB825DdB155515eF612ADcD66BCbC&amount=10000000000000000&includeProtocols=true")
            .then((res) => res.json())
            .then((data) => {
                setRouteData(data)
            })
    }, [])

    const [Tokens, setTokens] = useState<TokensResponseType | null>(null)
    useEffect(() => {
        fetch("https://router.akka.finance/v2/1116/tokens")
            .then((res) => res.json())
            .then((data) => {
                setTokens(data)
            })
    }, [])
    return (
        <>
            <Box sx={{ width: "100%", display: "flex", paddingY: "10px", marginTop: "100px" }}>
                <SrcInfo Route={RouteData} />
                <Route Route={RouteData} />
                <DstInfo Route={RouteData} />
            </Box>
            <Swap Route={RouteData} />
        </>
    )
}

export default Qoute