import { lcd, ANGEL_ENDOWMENT_ADDRESS, apANC_CONTRACT_ADDRESS, SNAP_BLOCK_HEIGHT } from "./utils.js";
import * as fs from "fs";
import * as path from "path";

const DATA_DIR = "data"

const main = async () => {
  const { endowments } = await lcd.wasm.contractQuery(
    ANGEL_ENDOWMENT_ADDRESS,
    { endowment_list: {} },
    { height: SNAP_BLOCK_HEIGHT }
  );
  const endowmentAddresses = [...endowments].map(({address}) => address);

  const ANGEL_BALANCES = await Promise.all(endowmentAddresses.map((address) => getCharityData(address)));
  fs.writeFileSync(
    path.join(DATA_DIR, "angel" + ".json"),
    JSON.stringify(ANGEL_BALANCES)
  );
}

const getCharityData = async (address) => {
  const { owner } = (await lcd.wasm.contractInfo(address)).init_msg
  const { locked_cw20, liquid_cw20 } = await lcd.wasm.contractQuery(
    apANC_CONTRACT_ADDRESS, 
    { balance: { address }}, 
    { height: SNAP_BLOCK_HEIGHT });
  const lockedApAnc = locked_cw20[0] ? Number(locked_cw20[0].amount) : 0;
  const liquidApAnc = liquid_cw20[0] ? Number(liquid_cw20[0].amount) : 0;
  
  return {
    amount: lockedApAnc + liquidApAnc,
    denom: "aUST", // 1 apANC === 1 aUST
    address: owner
  };
}

main();
