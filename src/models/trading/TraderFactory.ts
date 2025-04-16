import { Wallet } from "ethers";
import { ChainType } from "../../config/chain-config";
import {
  AerodromeStrategy,
  BalancerStrategy,
  SushiswapV2Strategy,
  UniswapV2Strategy,
  UniswapV3Strategy,
} from "./strategies/_index";
import { ITradingStrategy } from "./strategies/interface/ITradingStrategy";
import { Trader } from "./Trader";
import { mapNetworkNameToChainType } from "../../config/chain-config";

export class TraderFactory {
  static async createTrader(wallet: Wallet): Promise<Trader> {
    const network = await wallet.provider!.getNetwork();
    const chain = mapNetworkNameToChainType(network.name);
    if (!chain) {
      throw new Error(`Unsupported network: ${network.name}`);
    }

    const strategies: ITradingStrategy[] = [];

    strategies.push(new UniswapV3Strategy(`UniswapV3-${chain}`, chain));
    strategies.push(new BalancerStrategy(`Balancer-${chain}`, chain));

    switch (chain) {
      case ChainType.ETH:
        strategies.push(new UniswapV2Strategy(`UniswapV2-${chain}`, chain));
        strategies.push(new SushiswapV2Strategy(`SushiswapV2-${chain}`, chain));
        break;
      case ChainType.ARB:
        strategies.push(new UniswapV2Strategy(`UniswapV2-${chain}`, chain));
        strategies.push(new SushiswapV2Strategy(`SushiswapV2-${chain}`, chain));
        break;
      case ChainType.BASE:
        strategies.push(new AerodromeStrategy(`Aerodrome-${chain}`, chain));
        break;
    }

    return new Trader(wallet, chain, strategies);
  }
}
