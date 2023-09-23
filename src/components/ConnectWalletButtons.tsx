import { Box, Button } from '@mui/material'
import { useIsMounted } from '../hooks/useIsMounted'
import { useAccount, useConnect } from 'wagmi'

const ConnectWalletButtons = () => {
    const isMounted = useIsMounted()
    const { connector, isReconnecting } = useAccount()
    const { connect, connectors, isLoading, error, pendingConnector } = useConnect()
    return (
        <>
            {connectors.map((x) => (
                <Button
                    disabled={!x.ready || isReconnecting || connector?.id === x.id}
                    type='button'
                    key={x.name}
                    onClick={() => connect({ connector: x, chainId: 1116 })}
                >
                    {x.id === 'injected' ? (isMounted ? x.name : x.id) : x.name}
                    {isMounted && !x.ready && ` (unsupported: Switch to ${x.name} chain)`}
                    {isLoading && x.id === pendingConnector?.id && '…'}
                </Button>
            ))}
            <Box>{error?.message}</Box>
        </>
    )
}

export default ConnectWalletButtons