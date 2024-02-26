import type { CharacterSetType } from "../../type/charset";

import HD44780U from "./HD44780U";
import Motorola from "./Motorola";
import SAA from "./SAA";
import Signetics from "./Signetics";

const charsets: CharacterSetType = [...HD44780U, ...Motorola, ...SAA, ...Signetics];

export default charsets;
