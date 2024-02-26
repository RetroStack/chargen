import * as React from "react";

import Step from "@mui/joy/Step";
import Stepper from "@mui/joy/Stepper";
import StepIndicator from "@mui/joy/StepIndicator";

type PropType = {
  steps: {
    text: string;
    Icon: React.JSX.Element;
  }[];
  currentStep: number;
};

const IndicatorTopStepper = (props: PropType) => {
  const { steps, currentStep } = props;
  if ((steps && steps.length === 0) || currentStep < 0 || currentStep >= steps.length) {
    return;
  }

  return (
    <Stepper size="lg" sx={{ width: "100%" }}>
      {steps.map((step, index) => {
        const isCurrentStep = currentStep === index;
        return (
          <Step
            orientation="vertical"
            indicator={
              <StepIndicator variant={isCurrentStep ? "solid" : "outlined"} color="neutral">
                {step.Icon}
              </StepIndicator>
            }
            key={index}
          >
            {step.text}
          </Step>
        );
      })}
    </Stepper>
  );
};

export default IndicatorTopStepper;
