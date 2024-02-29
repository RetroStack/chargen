import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

import Sheet from "@mui/joy/Sheet";
import Grid from "@mui/joy/Grid";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";

import CharacterSet from "../components/CharacterSet";
import SearchPane from "../components/index/SearchPane";

import charsets from "../chargen";
import { downloadData, charsetToByteArray } from "../utils/binary";

const ListPage: React.FC<PageProps> = () => {
  const [selectedCharsets, setSelectedCharsets] = React.useState<number[]>([]);

  const charsetEl = selectedCharsets.map((selectedCharset, idx) => {
    const charset = charsets[selectedCharset];
    return (
      <Sheet key={idx} variant="outlined" sx={{ p: 4 }}>
        {charset.title} {charset.notes}
        <CharacterSet dataWidth={charset.dataWidth} characters={charset.data}></CharacterSet>
        <Button
          loading={false}
          variant="solid"
          onClick={() => {
            let newList = selectedCharsets.slice(0);
            newList.splice(idx, 1);
            setSelectedCharsets(newList);
          }}
        >
          Delete
        </Button>
      </Sheet>
    );
  });

  const inverse = () => {
    setSelectedCharsets(selectedCharsets.slice(0).reverse());
  };

  const download = () => {
    const data = selectedCharsets.reduce<number[]>((acc, charsetIndex) => {
      const charset = charsets[charsetIndex];
      const byteArray = charsetToByteArray(charset.data, charset.dataWidth);
      for (let i = 0; i < byteArray.length; i++) {
        acc.push(byteArray[i]);
      }
      return acc;
    }, []);
    downloadData(new Uint8Array(data));
  };

  return (
    <>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={6}>
          <SearchPane
            onClick={(event) => {
              const list = selectedCharsets.concat([event.charsetIndex]);
              setSelectedCharsets(list);
            }}
          />
        </Grid>
        <Grid xs={6}>
          <Sheet variant="outlined" sx={{ p: 4 }}>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
              <Grid>{charsetEl}</Grid>
            </Grid>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
              <Grid xs={6}>
                <Button loading={false} onClick={inverse} variant="solid">
                  Inverse
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
      </Grid>
    </>
  );
};

export default ListPage;

export const Head: HeadFC = () => <title>Character Generator List</title>;
