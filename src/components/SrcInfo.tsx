import { Box } from '@mui/material'
import React from 'react'

const SrcInfo = () => {
    return (
        <Box sx={{ width: "15%", padding: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <Box sx={{ border: "1px solid rgb(225, 222, 242)", borderRadius: "5px", padding: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Box
                        component="img"
                        sx={{
                            height: 20,
                            width: 20,
                        }}
                        alt="Chain Icon"
                        src="https://www.app.akka.finance/static/media/core.4d1e9a2ae466e413d517e44b2bcb71e1.svg"
                    />
                </Box>
                <Box>CORE</Box>
            </Box>
            <Box sx={{ border: "1px solid rgb(225, 222, 242)", borderRadius: "5px", padding: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
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
    )
}

export default SrcInfo