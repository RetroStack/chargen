import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

import Sheet from "@mui/joy/Sheet";
import Grid from "@mui/joy/Grid";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import CopyAll from "@mui/icons-material/CopyAll";
import Box from "@mui/joy/Box";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardDoubleArrowUpOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowUpOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import KeyboardDoubleArrowDownOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowDownOutlined';
import CharacterSet from "../components/CharacterSet";
import Character from "../components/Character";
import SearchPane from "../components/index/SearchPane";

import charsets from "../chargen";
import { downloadData, charsetToByteArray } from "../utils/binary";
import { copyToClipboard } from "../utils/clipboard";

const EditPage: React.FC<PageProps> = () => {
  const [selectedCharset, setSelectedCharset] = React.useState(0);
  const [selectedCharacter, setSelectedCharacter] = React.useState(0);
  const [refresh, setRefresh] = React.useState(0);

  const charset = charsets[selectedCharset];

  const download = () => {
    const data = charsetToByteArray(charset.data, charset.dataWidth);
    downloadData(new Uint8Array(data), "character_set.bin");
  };

  const copy = () => {
    copyToClipboard(JSON.stringify(charset.data));
  };

  return (
    <>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={6}>
          <SearchPane
            onClick={(event) => {
              charset.data[selectedCharacter] = event.character.concat([]);
              setRefresh(refresh + 1);
            }}
          />
        </Grid>
        <Grid xs={6}>
          <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            <Box m="auto" pb="2rem">
              <Button
                loading={false}
                onClick={() => {
                  setSelectedCharset(Math.max(0, selectedCharset - 1));
                }}
                variant="solid"
                disabled={selectedCharset === 0}
              >
                <ArrowCircleLeftIcon />
              </Button>
              ({selectedCharset + 1} of {Math.ceil(charsets.length)})
              <Button
                loading={false}
                onClick={() => {
                  setSelectedCharset(selectedCharset + 1);
                }}
                variant="solid"
                disabled={selectedCharset === Math.floor(charsets.length)}
              >
                <ArrowCircleRightIcon />
              </Button>
              <Button
                loading={false}
                onClick={() => {
                  setSelectedCharset(selectedCharset + 10);
                }}
                variant="solid"
                disabled={selectedCharset === Math.floor(charsets.length)}
              >
                <ArrowCircleRightIcon />
                +10
              </Button>
            </Box>
          </Grid>
          <Sheet variant="outlined" sx={{ p: 4 }}>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
              <Grid>
                <div>
                    <div style={{display:"flex", justifyContent: "center"}}>
                        <KeyboardDoubleArrowUpOutlinedIcon
                            sx={{cursor: "pointer"}}
                            loading={false}
                            onClick={() => {
                                charset.data = charset.data.map((currentChar) => {
                                    return currentChar.slice(1).concat([currentChar[0]]);
                                });
                                setRefresh(refresh + 1);
                            }}
                        />
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <KeyboardDoubleArrowLeftOutlinedIcon
                            loading={false}
                            sx={{cursor: "pointer"}}
                            onClick={() => {
                                charset.data = charset.data.map((currentChar) => {
                                    return currentChar.map((val) => {
                                        const m = (val & (1 << (charset.dataWidth - 1))) >> (charset.dataWidth - 1);
                                        const r = val << 1;
                                        return m | r;
                                    });
                                });
                                setRefresh(refresh + 1);
                            }}
                        />
                        <CharacterSet
                          dataWidth={charset.dataWidth}
                          characters={charset.data}
                          refresh={refresh}
                          selectedCharacter={selectedCharacter}
                          onClick={(event) => {
                            setSelectedCharacter(event.characterIndex);
                          }}
                        ></CharacterSet>
                        <KeyboardDoubleArrowRightOutlinedIcon
                            loading={false}
                            sx={{cursor: "pointer"}}
                            onClick={() => {
                                charset.data = charset.data.map((currentChar) => {
                                    return currentChar.map((val) => {
                                        const m = (val & 1) << (charset.dataWidth - 1);
                                        const r = val >> 1;
                                        return m | r;
                                    });
                                });
                                setRefresh(refresh + 1);
                            }}
                            variant="solid"
                        />
                    </div>
                    <div style={{display:"flex", justifyContent: "center"}}>
                        <KeyboardDoubleArrowDownOutlinedIcon
                            loading={false}
                            sx={{cursor: "pointer"}}
                            onClick={() => {
                                charset.data = charset.data.map((currentChar) => {
                                    return [currentChar[currentChar.length - 1]].concat(
                                        currentChar.slice(0, currentChar.length - 1),
                                    );
                                });
                                setRefresh(refresh + 1);
                            }}
                            variant="solid"
                        />
                    </div>
                </div>
                  <div style={{width: "200px", textAlign: "center"}}>

                      <div>
                          <KeyboardArrowUpOutlinedIcon
                              sx={{cursor: "pointer"}}
                              loading={false}
                              onClick={() => {
                                  const currentChar = charset.data[selectedCharacter];
                                  charset.data[selectedCharacter] = currentChar.slice(1).concat([currentChar[0]]);
                                  setRefresh(refresh + 1);
                              }}
                          />
                      </div>
                      <div style={{display: "flex", alignItems: "center"}}>

                          <div>
                              <KeyboardArrowLeftOutlinedIcon
                                  loading={false}
                                  sx={{cursor: "pointer"}}
                                  onClick={() => {
                                      const currentChar = charset.data[selectedCharacter];
                                      charset.data[selectedCharacter] = currentChar.map((val) => {
                                          const m = (val & (1 << (charset.dataWidth - 1))) >> (charset.dataWidth - 1);
                                          const r = val << 1;
                                          return m | r;
                                      });
                                      setRefresh(refresh + 1);
                                  }}
                              />
                          </div>
                          <Character
                              dataWidth={charset.dataWidth}
                              character={charset.data[selectedCharacter]}
                              refresh={refresh}
                              onClick={(event) => {
                                  const mask = 1 << (charset.dataWidth - event.x - 1);
                                  const value = mask ^ charset.data[selectedCharacter][event.y];
                                  charset.data[selectedCharacter][event.y] = value;
                                  setRefresh(refresh + 1);
                              }}
                          ></Character>
                          <div>
                              <KeyboardArrowRightOutlinedIcon
                                  loading={false}
                                  sx={{cursor: "pointer"}}
                                  onClick={() => {
                                      const currentChar = charset.data[selectedCharacter];
                                      charset.data[selectedCharacter] = currentChar.map((val) => {
                                          const m = (val & 1) << (charset.dataWidth - 1);
                                          const r = val >> 1;
                                          return m | r;
                                      });
                                      setRefresh(refresh + 1);
                                  }}
                              />
                          </div>

                      </div>
                      <div>
                          <KeyboardArrowDownOutlinedIcon
                              loading={false}
                              sx={{cursor: "pointer"}}
                              onClick={() => {
                                  const currentChar = charset.data[selectedCharacter];
                                  charset.data[selectedCharacter] = [currentChar[currentChar.length - 1]].concat(
                                      currentChar.slice(0, currentChar.length - 1),
                                  );
                                  setRefresh(refresh + 1);
                              }}/>
                      </div>

                  </div>
                <div>
                  <div>
                    <Button
                      loading={false}
                      onClick={() => {
                        const currentChar = charset.data[selectedCharacter];
                        charset.data[selectedCharacter] = currentChar.map(() => {
                          return 0;
                        });
                        setRefresh(refresh + 1);
                      }}
                      variant="solid"
                    >
                      Clear
                    </Button>

                    <Button
                      loading={false}
                      onClick={() => {
                        let mask = 1;
                        for (let i = 0; i < charset.dataWidth - 1; i++) {
                          mask = mask | (mask << 1);
                        }
                        const currentChar = charset.data[selectedCharacter];
                        charset.data[selectedCharacter] = currentChar.map(() => {
                          return mask;
                        });
                        setRefresh(refresh + 1);
                      }}
                      variant="solid"
                    >
                      Set
                    </Button>

                    <Button
                      loading={false}
                      onClick={() => {
                        let mask = 1;
                        for (let i = 0; i < charset.dataWidth - 1; i++) {
                          mask = mask | (mask << 1);
                        }
                        const currentChar = charset.data[selectedCharacter];
                        charset.data[selectedCharacter] = currentChar.map((val) => {
                          return ~val & mask;
                        });
                        setRefresh(refresh + 1);
                      }}
                      variant="solid"
                    >
                      Invert
                    </Button>
                  </div>
                  <div>
                    <Button
                      loading={false}
                      onClick={() => {
                        charset.data = charset.data.map((currentChar) => {
                          return currentChar.map(() => {
                            return 0;
                          });
                        });
                        setRefresh(refresh + 1);
                      }}
                      variant="solid"
                    >
                      Clear All
                    </Button>
                    <Button
                      loading={false}
                      onClick={() => {
                        let mask = 1;
                        for (let i = 0; i < charset.dataWidth - 1; i++) {
                          mask = mask | (mask << 1);
                        }
                        charset.data = charset.data.map((currentChar) => {
                          return currentChar.map(() => {
                            return mask;
                          });
                        });
                        setRefresh(refresh + 1);
                      }}
                      variant="solid"
                    >
                      Set All
                    </Button>
                    <Button
                      loading={false}
                      onClick={() => {
                        let mask = 1;
                        for (let i = 0; i < charset.dataWidth - 1; i++) {
                          mask = mask | (mask << 1);
                        }
                        charset.data = charset.data.map((currentChar) => {
                          return currentChar.map((val) => {
                            return ~val & mask;
                          });
                        });
                        setRefresh(refresh + 1);
                      }}
                      variant="solid"
                    >
                      Invert All
                    </Button>
                  </div>
                </div>

                <Textarea
                  minRows={5}
                  maxRows={5}
                  variant="outlined"
                  value={JSON.stringify(charset.data)}
                  readOnly={true}
                />
              </Grid>
            </Grid>
            <Grid xs={12}>
              <Sheet variant="outlined" sx={{ p: 4 }}>
                <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                  <Grid xs={3}></Grid>
                  <Grid xs={3}>
                    <Button loading={false} onClick={copy} variant="solid">
                      <CopyAll />
                      Copy To Clipboard
                    </Button>
                  </Grid>
                  <Grid xs={6}>
                    <Box display="flex" justifyContent="flex-end">
                      <Button loading={false} onClick={download} variant="solid">
                        Download Binary
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Sheet>
            </Grid>
          </Sheet>
        </Grid>
      </Grid>
    </>
  );
};

export default EditPage;

export const Head: HeadFC = () => <title>Character Generator Editor</title>;
