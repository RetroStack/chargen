import React from "react";
import type { HeadFC, PageProps } from "gatsby";

import Grid from "@mui/joy/Grid";
import Layout from "../components/Layout";
import IndicatorTopStepper from "../components/Stepper";

import InputPane from "../components/load/InputPane";
import ParsePane from "../components/load/ParsePane";
import ModifyPane from "../components/load/ModifyPane";
import SavePane from "../components/load/SavePane";

import FileDownload from "@mui/icons-material/FileDownload";
import Upload from "@mui/icons-material/Upload";
import ModeEdit from "@mui/icons-material/ModeEdit";
import AutoFixHigh from "@mui/icons-material/AutoFixHigh";

const LOAD_STEPS = [
  {
    text: "Input",
    Icon: <Upload />,
  },
  {
    text: "Parse",
    Icon: <ModeEdit />,
  },
  {
    text: "Modify",
    Icon: <AutoFixHigh />,
  },
  {
    text: "Save",
    Icon: <FileDownload />,
  },
];

const STEP_INPUT = 0;
const STEP_PARSE = 1;
const STEP_MODIFY = 2;
const STEP_SAVE = 3;

const LoadPage: React.FC<PageProps> = () => {
  const [currentStep, setCurrentStep] = React.useState(STEP_INPUT);

  const [byteArray, setByteArray] = React.useState<Uint8Array | null>(null);

  const [characterSet, setCharacterSet] = React.useState<{
    characters: number[][];
    dataWidth: number;
    dataHeight: number;
  } | null>(null);

  const [modifiedCharacters, setModifiedCharacters] = React.useState<number[][] | null>(null);
  const [modifiedWidth, setModifiedWidth] = React.useState<number>(8);

  const onLoad = (byteArray: Uint8Array) => {
    setByteArray(byteArray);
    setCurrentStep(STEP_PARSE);
  };

  const onParse = (characterSet: { characters: number[][]; dataWidth: number; dataHeight: number }) => {
    setCharacterSet(characterSet);
    setCurrentStep(STEP_MODIFY);
  };
  const onParseBack = () => {
    setCurrentStep(STEP_INPUT);
  };

  const onModify = (characters: number[][], dataWidth: number) => {
    setModifiedCharacters(characters);
    setModifiedWidth(dataWidth);
    setCurrentStep(STEP_SAVE);
  };
  const onModifyBack = () => {
    setCurrentStep(STEP_PARSE);
  };

  const onSaveBack = () => {
    setCurrentStep(STEP_MODIFY);
  };

  let inputPaneEl = null;
  if (currentStep === STEP_INPUT) {
    inputPaneEl = <InputPane onLoad={onLoad} />;
  }

  let parsePaneEl = null;
  if (currentStep === STEP_PARSE && byteArray) {
    parsePaneEl = <ParsePane byteArray={byteArray} onParse={onParse} onParseBack={onParseBack} />;
  }

  let modifyPaneEl = null;
  if (currentStep === STEP_MODIFY && characterSet) {
    modifyPaneEl = <ModifyPane characterSet={characterSet} onModify={onModify} onModifyBack={onModifyBack} />;
  }

  let savePaneEl = null;
  if (currentStep === STEP_SAVE && modifiedCharacters) {
    savePaneEl = <SavePane characters={modifiedCharacters} dataWidth={modifiedWidth} onSaveBack={onSaveBack} />;
  }

  return (
    <Layout>
      <Grid container spacing={2} sx={{ flexGrow: 1, paddingBottom: "2rem" }}>
        <IndicatorTopStepper steps={LOAD_STEPS} currentStep={currentStep} />
      </Grid>
      {inputPaneEl}
      {parsePaneEl}
      {modifyPaneEl}
      {savePaneEl}
    </Layout>
  );
};

export default LoadPage;

export const Head: HeadFC = () => <title>Character Generator ROM Load</title>;
