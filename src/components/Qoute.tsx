import { Box } from '@mui/material'
import React from 'react'
import SrcInfo from './SrcInfo'
import DstInfo from './DstInfo'
import Route from './Route'

const Qoute = () => {
    return (
        <Box sx={{ width: "100%", display: "flex", paddingY: "10px", marginTop: "100px" }}>
            <SrcInfo />
            <Route />
            <DstInfo />
        </Box>
    )
}

export default Qoute