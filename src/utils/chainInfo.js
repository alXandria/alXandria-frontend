const ChainInfo = {
  chainId: process.env.REACT_APP_CHAIN_ID,
  chainName: process.env.REACT_APP_CHAIN_NAME,
  rpc: process.env.REACT_APP_RPC,
  rest: process.env.REACT_APP_REST,
  bip44: {
    coinType: Number(process.env.REACT_APP_COIN_TYPE),
  },
  bech32Config: {
    bech32PrefixAccAddr: process.env.REACT_APP_BECH32_ACC_ADDR,
    bech32PrefixAccPub: process.env.REACT_APP_BECH32_ACC_PUB,
    bech32PrefixValAddr: process.env.REACT_APP_BECH32_VAL_ADDR,
    bech32PrefixValPub: process.env.REACT_APP_BECH32_VAL_PUB,
    bech32PrefixConsAddr: process.env.REACT_APP_BECH32_CONS_ADDR,
    bech32PrefixConsPub: process.env.REACT_APP_BECH32_CONS_PUB,
  },
  currencies: [
    {
      coinDenom: process.env.REACT_APP_COIN_DENOM,
      coinMinimalDenom: process.env.REACT_APP_COIN_MIN_DENOM,
      coinDecimals: Number(process.env.REACT_APP_COIN_DECIMALS),
      coinGeckoId: process.env.REACT_APP_COIN_GECKO_ID,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: process.env.REACT_APP_COIN_DENOM,
      coinMinimalDenom: process.env.REACT_APP_COIN_MIN_DENOM,
      coinDecimals: Number(process.env.REACT_APP_COIN_DECIMALS),
      coinGeckoId: process.env.REACT_APP_COIN_GECKO_ID,
    },
  ],
  stakeCurrency: {
    coinDenom: process.env.REACT_APP_COIN_DENOM,
    coinMinimalDenom: process.env.REACT_APP_COIN_MIN_DENOM,
    coinDecimals: Number(process.env.REACT_APP_COIN_DECIMALS),
    coinGeckoId: process.env.REACT_APP_COIN_GECKO_ID,
  },
  coinType: Number(process.env.REACT_APP_COIN_TYPE),
  gasPriceStep: {
    low: Number(process.env.REACT_APP_GAS_LOW),
    average: Number(process.env.REACT_APP_GAS_AVERAGE),
    high: Number(process.env.REACT_APP_GAS_HIGH),
  },
}

export default ChainInfo
