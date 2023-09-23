import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SwapResponseType } from '../types/swap'
import SrcInfo from './SrcInfo'
import DstInfo from './DstInfo'
import { useAccount, useSendTransaction } from 'wagmi'

const Swap = () => {
    const { address, isConnected } = useAccount()
    const { sendTransactionAsync } = useSendTransaction()
    const swap = async () => {
        if(isConnected){
            const res = await fetch("https://seal-app-vln3e.ondigitalocean.app/v2/1116/swap?src=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&dst=0x6E35fF7aC8eEB825DdB155515eF612ADcD66BCbC&amount=10000000000000000&from=0x9d1af7EC1DC4486768E6c9e113fA412bA70DF7Cd&slippage=0.05&includeTokensInfo=true&includeProtocols=true")
            const data: SwapResponseType = await res.json()
            const transaction = await sendTransactionAsync({
                to: data.tx.to,
                data: `0x${data.tx.data.substring(2)}`,
                value: BigInt(data.tx.value),
                gasPrice: BigInt(data.tx.gasPrice),
                gas: BigInt(data.tx.gas),
            })
            console.log(transaction);
        }
    }
    return (
        <Box sx={{ width: "100%", minHeight: "100px", marginY: "50px", border: "1px solid rgb(225, 222, 242)", borderRadius: "5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ width: "40%", display: "flex", gap: "20px" }}>
                <SrcInfo />
                {/* <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography variant='caption' sx={{ fontSize: "16px" }}>Src Amount: {ethers.utils.formatUnits("10000000000000000", 18)}</Typography>
                </Box> */}
            </Box>
            <Box sx={{ width: "20%" }}>
                <Button variant='outlined' sx={{ width: "100%", height: "50px" }} onClick={() => swap()}>Swap</Button>
            </Box>
            <Box sx={{ width: "40%", display: "flex", justifyContent: "flex-end", gap: "20px" }}>
                {/* <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography variant='caption' sx={{ fontSize: "16px" }}>Return Amount: {SwapData && (+ethers.utils.formatUnits(BigNumber.from(SwapData.toAmount), SwapData.toToken?.decimals)).toFixed(4)}</Typography>
                </Box> */}
                <DstInfo />
            </Box>
        </Box>
    )
}

export default Swap