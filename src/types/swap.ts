import { Protocol, TokenData } from "./route";

export interface TXType {
    from: string;
    to: string;
    data: string;
    value: string;
    gasPrice: string;
    gas: number;
}

export interface SwapResponseType {
    toAmount: string;
    toToken?: TokenData;
    fromToken?: TokenData;
    protocols?: Array<Array<Array<Protocol>>>;
    tx: TXType;
}