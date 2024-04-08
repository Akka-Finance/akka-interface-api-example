import { Token } from "./tokens";

export type TokensResponse = {
  [key: string]: Token;
};

export type QuoteResponse = {
  toAmount: string;
  fromToken?: Token;
  toToken?: Token;
  protocols?: Array<
    Array<
      Array<{
        name: string;
        part: number;
        fromTokenAddress: string;
        toTokenAddress: string;
      }>
    >
  >;
};

export type OnChainSwapResponse = {
  toAmount: string;
  tx: {
    from: string;
    to: `0x${string}`;
    data: string;
    value: string;
    gas: number;
    gasPrice: string;
  };
};
