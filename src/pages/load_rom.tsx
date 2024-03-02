import React from "react";
import type { HeadFC, PageProps } from "gatsby";

import Grid from "@mui/joy/Grid";
import Layout from "../components/Layout";
import IndicatorTopStepper from "../components/Stepper";

import InputPane from "../components/load_rom/InputPane";
import SavePane from "../components/load_rom/SavePane";

import FileDownload from "@mui/icons-material/FileDownload";
import Upload from "@mui/icons-material/Upload";

const LOAD_STEPS = [
  {
    text: "Input",
    Icon: <Upload />,
  },
  {
    text: "Save",
    Icon: <FileDownload />,
  },
];

const STEP_INPUT = 0;
const STEP_SAVE = 1;

const LoadPage: React.FC<PageProps> = () => {
  const [currentStep, setCurrentStep] = React.useState(STEP_INPUT);

  const [byteArray, setByteArray] = React.useState<number[] | null>(null);

  const onLoad = (byteArray: number[]) => {
    setByteArray(byteArray);
    setCurrentStep(STEP_SAVE);
  };

  const onSaveBack = () => {
    setCurrentStep(STEP_INPUT);
  };

  let inputPaneEl = null;
  if (currentStep === STEP_INPUT) {
    inputPaneEl = <InputPane onLoad={onLoad} />;
  }

  let savePaneEl = null;
  if (currentStep === STEP_SAVE && byteArray) {
    savePaneEl = <SavePane data={byteArray} onSaveBack={onSaveBack} />;
  }

  return (
    <Layout>
      <Grid container spacing={2} sx={{ flexGrow: 1, paddingBottom: "2rem" }}>
        <IndicatorTopStepper steps={LOAD_STEPS} currentStep={currentStep} />
      </Grid>
      {inputPaneEl}
      {savePaneEl}
    </Layout>
  );
};

export default LoadPage;

export const Head: HeadFC = () => <title>ROM Load</title>;
