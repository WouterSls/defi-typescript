import { ChainType } from "../../lib/types/trading.types";
import { GeckoTerminalApi } from "../../services/GeckoTerminalApi";

export async function getPrice(chain: ChainType, tokenAddress: string) {
  const api = new GeckoTerminalApi();
  await api.getTokenPriceData(chain, tokenAddress);
}

const VIRTUAL_ADDRESS = "0x0b3e328455c4059eeb9e3f84b5543f74e24e7e1b";

if (require.main === module) {
  getPrice(ChainType.BASE, VIRTUAL_ADDRESS);
}
