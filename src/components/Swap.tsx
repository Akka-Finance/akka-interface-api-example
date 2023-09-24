import { Box, Button, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import React, { useEffect, useState } from 'react'
import { SwapResponseType } from '../types/swap'
import SrcInfo from './SrcInfo'
import DstInfo from './DstInfo'
import { useAccount, useSendTransaction } from 'wagmi'
import { BigNumber, ethers } from 'ethers';
import { RouteResponseType } from '../types/route';

interface RouteProps {
    Route: RouteResponseType | null
}

const Swap = ({ Route }: RouteProps) => {
    const [loading, setLoading] = useState<boolean>(false)
    const { isConnected } = useAccount()
    const { sendTransactionAsync } = useSendTransaction()
    const swap = async () => {
        if (isConnected) {
            setLoading(true)
            try {
                const res = await fetch("https://seal-app-vln3e.ondigitalocean.app/v2/1116/swap?src=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&dst=0x6E35fF7aC8eEB825DdB155515eF612ADcD66BCbC&amount=10000000000000000&from=0x9d1af7EC1DC4486768E6c9e113fA412bA70DF7Cd&slippage=0.05&includeTokensInfo=true&includeProtocols=true")
                const data: SwapResponseType = await res.json()
                const transaction = await sendTransactionAsync({
                    to: data.tx.to,
                    data: `0x${data.tx.data.substring(2)}`,
                    value: BigInt(data.tx.value),
                    gasPrice: BigInt(data.tx.gasPrice),
                    gas: BigInt(data.tx.gas),
                })
            } catch (error) {
                console.log(error);
            }
            setLoading(false)
        }
    }
    const approve = async () => {
        if (isConnected) {
            setLoading(true)
            try {
                const res = await fetch("https://seal-app-vln3e.ondigitalocean.app/v2/1116/swap?src=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&dst=0x6E35fF7aC8eEB825DdB155515eF612ADcD66BCbC&amount=10000000000000000&from=0x9d1af7EC1DC4486768E6c9e113fA412bA70DF7Cd&slippage=0.05&includeTokensInfo=true&includeProtocols=true")
                const data: SwapResponseType = await res.json()
                const transaction = await sendTransactionAsync({
                    to: data.tx.to,
                    data: `0x${data.tx.data.substring(2)}`,
                    value: BigInt(data.tx.value),
                    gasPrice: BigInt(data.tx.gasPrice),
                    gas: BigInt(data.tx.gas),
                })
            } catch (error) {
                console.log(error);
            }
            setLoading(false)
        }
    }
    return (
        <Box sx={{ width: "100%", minHeight: "100px", marginY: "50px", border: "1px solid rgb(225, 222, 242)", borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ width: "60%", padding: "20px", display: "flex", alignItems: "center", gap: "20px" }}>
                <Box sx={{ border: "1px solid rgb(225, 222, 242)", borderRadius: "5px", padding: "10px", display: "flex", justifyContent: "space-around", alignItems: "center", gap: "10px" }}>
                    <Typography variant='caption' sx={{ fontSize: "16px" }}>{ethers.utils.formatUnits("10000000000000000", 18)}</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Box
                                component="img"
                                sx={{
                                    height: 20,
                                    width: 20,
                                }}
                                alt="Token Icon"
                                src="https://www.app.akka.finance/static/media/core.4d1e9a2ae466e413d517e44b2bcb71e1.svg"
                            />
                        </Box>
                        <Box>CORE</Box>
                    </Box>
                </Box>
                To
                <Box sx={{ border: "1px solid rgb(225, 222, 242)", borderRadius: "5px", padding: "10px", display: "flex", justifyContent: "space-around", alignItems: "center", gap: "10px" }}>
                    <Typography variant='caption' sx={{ fontSize: "16px" }}>{Route && (+ethers.utils.formatUnits(BigNumber.from(Route.toAmount), Route.toToken?.decimals)).toFixed(4)}</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Box
                                component="img"
                                sx={{
                                    height: 20,
                                    width: 20,
                                }}
                                alt="Token Icon"
                                src="https://icecreamswap-assets.s3.amazonaws.com/token/1116/0x6E35fF7aC8eEB825DdB155515eF612ADcD66BCbC.png"
                            />
                        </Box>
                        <Box>COREINU</Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ width: "20%", padding: "20px" }}>
                <LoadingButton variant='outlined' loading={loading} disabled sx={{ width: "100%", height: "50px" }} onClick={() => approve()}>Approve</LoadingButton>
            </Box>
            <Box sx={{ width: "20%", padding: "20px" }}>
                <LoadingButton variant='outlined' loading={loading} sx={{ width: "100%", height: "50px" }} onClick={() => swap()}>Swap</LoadingButton>
            </Box>
        </Box>
    )
}

export default Swap