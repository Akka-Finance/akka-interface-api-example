export interface TokenData {
    symbol: string;
    name: string;
    decimals: number;
    address: string;
    logoURI: string;
    tags: string[];
}
export interface TokensWrapperObject {
    [key: string]: TokenData;
}
export interface TokensResponseType {
    tokens: TokensWrapperObject;
}