import * as React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepIndicator from '@mui/joy/StepIndicator';
import FileDownload from '@mui/icons-material/FileDownload';
import Upload from '@mui/icons-material/Upload';
import ModeEdit from '@mui/icons-material/ModeEdit';
import AutoFixHigh from '@mui/icons-material/AutoFixHigh';

const LOAD_STEPS = [
    {
        text: "Input",
        Icon: <Upload/>
    },
    {
        text: "Parsing",
        Icon: <ModeEdit/>
    },
    {
        text: "Sanitizing",
        Icon: <AutoFixHigh/>
    },
    {
        text: "Export",
        Icon: <FileDownload/>
    },
]

const IndicatorTopStepper = ({ steps = LOAD_STEPS, currentStep = 0 }) => {
    if (steps && steps.length === 0){
        return;
    }
    return (
        <Stepper size="lg" sx={{ width: '100%'}}>
            {
                steps.map((step, index)=> {
                    const isCurrentStep = currentStep === index;
                    return (
                        <Step
                            orientation="vertical"
                            indicator={
                                <StepIndicator
                                    variant={isCurrentStep ? "solid" : "outlined"}
                                    color="neutral">
                                    {step.Icon}
                                </StepIndicator>}>
                            {step.text}
                        </Step>
                    )
                })
            }
        </Stepper>
    );
}

export default IndicatorTopStepper