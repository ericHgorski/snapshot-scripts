import { LCDClient } from "@terra-money/terra.js";

export const ANGEL_ENDOWMENT_ADDRESS = "terra1nwk2y5nfa5sxx6gtxr84lre3zpnn7cad2f266h";
export const apANC_CONTRACT_ADDRESS = "terra172ue5d0zm7jlsj2d9af4vdff6wua7mnv6dq5vp";

export const PRE_ATTACK_BLOCK_HEIGHT = 7544910;
export const POST_ATTACK_BLOCK_HEIGHT = 7790000;
export const COMPARISON_BLOCK_HEIGHT = 7603700;

export const lcd = new LCDClient({
  URL: "https://lcd.terra.dev", // use localhost if you want to speedup the data collection process
  chainID: "columbus-5",
});