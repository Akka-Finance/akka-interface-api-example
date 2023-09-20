import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { RouteResponseType } from '../types/route'

const Route = () => {
    const [Route, setRoute] = useState<RouteResponseType | null>(null)
    useEffect(() => {
        fetch("https://seal-app-vln3e.ondigitalocean.app/v2/1116/quote?src=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&dst=0x6E35fF7aC8eEB825DdB155515eF612ADcD66BCbC&amount=1000000000000000000000&includeProtocols=true")
            .then((res) => res.json())
            .then((data) => {
                setRoute(data)
            })
            .then(() => {
                console.log(Route);
            })
    }, [])



    return (
        <Box sx={{ width: "70%", border: "1px solid rgb(225, 222, 242)", borderRadius: "5px", display: "flex", flexDirection: "column" }}>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", paddingY: "10px" }}>
                <Typography variant='h4' sx={{ fontSize: "20px" }}>Route</Typography>
            </Box>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                {
                    Route?.protocols &&
                    Route.protocols.map((item, index) => {
                        return (

                            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                                {item.map((item2, index2) => {
                                    return (
                                        <>
                                            <Box sx={{ display: "flex", flexDirection: "column", gap: "5px", marginY: "20px" }}>
                                                {item2.map((item3, index3) => {
                                                    return (
                                                        <>
                                                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}>
                                                                <Typography>{item3.part.toFixed(2)}%</Typography>
                                                                <Box
                                                                    component="img"
                                                                    sx={{
                                                                        height: 20,
                                                                        width: 20,
                                                                    }}
                                                                    alt="Token Icon"
                                                                    src={`https://icecreamswap-assets.s3.amazonaws.com/token/1116/${item3.fromTokenAddress}.png`}
                                                                />
                                                                <Box
                                                                    component="img"
                                                                    sx={{
                                                                        height: 20,
                                                                        width: 20,
                                                                    }}
                                                                    alt="Token Icon"
                                                                    src={`https://icecreamswap-assets.s3.amazonaws.com/token/1116/${item3.toTokenAddress}.png`}
                                                                />
                                                                <Typography>({item3.name})</Typography>
                                                            </Box>
                                                        </>
                                                    )
                                                })}
                                            </Box>
                                            {item.length - 1 !== index2 && <Box>&#62;</Box>}
                                        </>
                                    )
                                })}
                            </Box>

                        )
                    })
                }
            </Box>
        </Box>
    )
}

export default Route