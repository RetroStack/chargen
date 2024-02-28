import type { CharacterSetType } from "../../type/charset";

import TRS80_Model1_0 from "./Model1_0";
import TRS80_Model1 from "./Model1";
import TRS80_Model3 from "./Model3";
import TRS80_Model4 from "./Model4";
import TRS80_Unknown from "./Unknown";

const charsets: CharacterSetType = [
  ...TRS80_Model1_0,
  ...TRS80_Model1,
  ...TRS80_Model3,
  ...TRS80_Model4,
  ...TRS80_Unknown,
];

export default charsets;
