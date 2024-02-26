import type { CharacterSetType } from "../type/charset";

import Apple from "./Apple";
import Commodore from "./Commodore";
import IBM from "./IBM";
import Misc from "./Misc";
import Sinclair from "./Sinclair";
import TRS80 from "./TRS80";

const charsets: CharacterSetType = [...Apple, ...Commodore, ...IBM, ...Misc, ...Sinclair, ...TRS80];

export default charsets;
