export interface Protocol {
    name: string;
    part: number;
    fromTokenAddress: string;
    toTokenAddress: string;
}

export interface TokenData {
    symbol: string;
    name: string;
    decimals: number;
    address: string;
    logoURI: string;
    tags: string[];
}

export interface RouteResponseType {
    toAmount: string;
    toToken?: TokenData;
    fromToken?: TokenData;
    protocols?: Array<Array<Array<Protocol>>>;
}