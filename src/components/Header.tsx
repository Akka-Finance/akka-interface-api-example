import { Box, Typography } from '@mui/material'
import ConnectWalletButtons from './ConnectWalletButtons'
import { useAccount } from 'wagmi'

const Header = () => {
    const { address, isConnected } = useAccount()
    return (
        <Box sx={{ width: "100%", paddingTop: { xs: "0", md: "10px" }, display: "flex" }}>
            <Box sx={{ width: "30%" }}>
                <Box
                    component="img"
                    sx={{
                        height: 100,
                        width: 120,
                    }}
                    alt="Logo"
                    src="https://www.app.akka.finance/static/media/akka-colorfull1.e14f6961870541109dba75ec1c36da0e.svg"
                />
            </Box>
            <Box sx={{ width: "70%", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "10px" }}>
                <Box>
                    {isConnected &&
                        <Typography>{address}</Typography>
                    }
                </Box>
                <Box>
                    <ConnectWalletButtons />
                </Box>
            </Box>
        </Box>
    )
}

export default Header