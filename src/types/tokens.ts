export interface BaseToken {
  address: string;
}
export interface StaticToken extends BaseToken {
  symbol: string;
  decimals: number;
  name: string;
  logoURI?: string;
}
export interface Token extends StaticToken {
  tags: string[];
}
