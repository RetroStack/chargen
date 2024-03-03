import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Sheet from "@mui/joy/Sheet";
import Grid from "@mui/joy/Grid";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import CopyAll from "@mui/icons-material/CopyAll";
import Download from "@mui/icons-material/Download";
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

import '../styles/editor.css'
import {CardActionArea, CardActions} from "@mui/material";

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
      <Grid container spacing={1} sx={{ flexGrow: 1 }}>
        <Grid xs={6}>
          <SearchPane
            onClick={(event) => {
              charset.data[selectedCharacter] = event.character.concat([]);
              setRefresh(refresh + 1);
            }}
          />
        </Grid>
        <Grid xs={6}>
          <Grid container spacing={1}>
            <Box m="auto">
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
          <Sheet variant="outlined">
            <Grid container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center">
              <Grid>
                  <Card sx={{ mx:"auto", mt:2, mb:2 }}
                        width="100%"
                        variant="soft"
                        classNamee="edit-group-characters">
                      <CardContent>
                          <CardActions style={{display: "flex", justifyContent: "flex-end"}}>
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
                          </CardActions>
                          <div>
                              <div style={{display:"flex", justifyContent: "center"}}>
                                  <KeyboardDoubleArrowUpOutlinedIcon
                                      className="arrow"
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
                                      className="arrow"
                                      loading={false}
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
                                      className="arrow"
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
                                      className="arrow"
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
                      </CardContent>
                  </Card>
                  <Card sx={{ mx:"auto", mb:2 }}
                        width="100%"
                        variant="soft"
                        className="edit-single-character">
                    <CardContent>
                        <CardActionArea>
                            <div style={{display: "flex", justifyContent: "end"}}>
                                <CardActions>
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
                                </CardActions>
                            </div>
                        </CardActionArea>
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <div style={{ width: "fit-content", textAlign: "center"}}>
                              <div>
                                  <KeyboardArrowUpOutlinedIcon
                                      className="arrow"
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
                                          className="arrow"
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
                                          className="arrow"
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
                                      className="arrow"
                                      onClick={() => {
                                          const currentChar = charset.data[selectedCharacter];
                                          charset.data[selectedCharacter] = [currentChar[currentChar.length - 1]].concat(
                                              currentChar.slice(0, currentChar.length - 1),
                                          );
                                          setRefresh(refresh + 1);
                                      }}/>
                              </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                  <Textarea
                  minRows={5}
                  maxRows={5}
                  variant="outlined"
                  value={JSON.stringify(charset.data)}
                  readOnly={true}
                />
              </Grid>
            </Grid>
            <Grid container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center">
                <Card sx={{m:"auto", mt:2, mb: 2}} variant="plain">
                    <CardActionArea>
                        <CardActions>
                            <Button loading={false} onClick={copy} variant="solid">
                                <CopyAll />
                                Copy To Clipboard
                            </Button>
                            <Button loading={false} onClick={download} variant="solid">
                                <Download/> Download Binary
                            </Button>
                        </CardActions>
                    </CardActionArea>
                </Card>
            </Grid>
          </Sheet>
        </Grid>
      </Grid>
    </>
  );
};

export default EditPage;

export const Head: HeadFC = () => <title>Character Generator Editor</title>;
