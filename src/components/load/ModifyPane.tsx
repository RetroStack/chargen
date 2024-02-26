import React, { useEffect } from "react";

import Sheet from "@mui/joy/Sheet";
import Grid from "@mui/joy/Grid";
import Snackbar from "@mui/joy/Snackbar";
import Button from "@mui/joy/Button";
import Slider from "@mui/joy/Slider";
import CharacterSet from "../CharacterSet";

type PropType = {
  characterSet: { characters: number[][]; dataWidth: number; dataHeight: number };
  onModify: (characters: number[][], dataWidth: number) => void;
  onModifyBack: () => void;
};

const ModifyPane: React.FC<PropType> = (props) => {
  const { characterSet, onModify, onModifyBack } = props;

  const [width, setWidth] = React.useState(characterSet.dataWidth);
  const [height, setHeight] = React.useState(characterSet.dataHeight);

  const [characters, setCharacters] = React.useState<number[][]>([]);

  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const submit = () => {
    onModify(characters, width);
  };

  useEffect(() => {
    const result: number[][] = [];

    const columnMask = (1 << width) - 1;
    for (let i = 0; i < characterSet.characters.length; i++) {
      const character: number[] = [];
      const rows = characterSet.characters[i];

      for (let row = 0; row < Math.min(height, rows.length); row++) {
        character.push(rows[row] & columnMask);
      }

      result.push(character);
    }

    setCharacters(result);
  }, [width, height]);

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={errorMsg != null}
        autoHideDuration={5000}
        disableWindowBlurListener={true}
        color={"danger"}
        size={"lg"}
        onClose={() => {
          setErrorMsg(null);
        }}
      >
        {errorMsg}
      </Snackbar>
      <Grid xs={12}>
        <Sheet variant="outlined" sx={{ p: 4 }}>
          <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            <Grid xs={6}>Width (in pixel):</Grid>
            <Grid xs={6}>Height (in pixel):</Grid>
            <Grid xs={6}>
              <Slider
                disabled={false}
                marks
                orientation="horizontal"
                valueLabelDisplay="on"
                min={1}
                max={characterSet.dataWidth}
                value={width}
                onChange={(_event, value, _activeThumb) => setWidth(Array.isArray(value) ? value[0] : value)}
              />
            </Grid>
            <Grid xs={6}>
              <Slider
                disabled={false}
                marks
                orientation="horizontal"
                valueLabelDisplay="on"
                min={1}
                max={characterSet.dataHeight}
                value={height}
                onChange={(_event, value, _activeThumb) => setHeight(Array.isArray(value) ? value[0] : value)}
              />
            </Grid>
          </Grid>
        </Sheet>
      </Grid>
      <Grid xs={12}>Sanitized Character Set:</Grid>
      <Grid xs={12}>
        <Sheet variant="outlined" sx={{ p: 4 }}>
          <CharacterSet dataWidth={width} data={characters}></CharacterSet>
        </Sheet>
      </Grid>
      <Button loading={false} onClick={onModifyBack} variant="soft" color="neutral">
        Back
      </Button>
      <Button onClick={submit}>Next</Button>
    </div>
  );
};

export default ModifyPane;
