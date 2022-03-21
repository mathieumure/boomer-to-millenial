import React, { FormEvent, useMemo, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";
import Input from "../forms/Input";
import Button from "../forms/Button";
import { ThemeFeatures } from "../baseDesign/theme";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: gray;
  z-index: 1000;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10vh 2.5vw 6vh 2.5vw;
  column-gap: 30px;
  background-color: white;
`;

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10vh 2.5vw 6vh 2.5vw;
  column-gap: 30px;
  background-color: white;
`;

type Props = {
  onQuit: (featureName: keyof ThemeFeatures) => void;
};

export const FeaturePan: React.FC<Props> = ({ onQuit }) => {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState<string>("");
  const [currentStepProgress, setCurrentStepProgress] = useState<number>(-1);
  const steps = ["Install", "Lint", "Test", "Build", "Deploy"];

  const activateFeature = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue) {
      setCurrentStepProgress(0);
      setTimeout(() => setCurrentStepProgress(1), 1000);
      setTimeout(() => setCurrentStepProgress(2), 2000);
      setTimeout(() => setCurrentStepProgress(3), 3000);
      setTimeout(() => setCurrentStepProgress(4), 4000);
      setTimeout(() => setCurrentStepProgress(5), 5000);
      setTimeout(() => {
        setInputValue("");
        setCurrentStepProgress(-1);
        onQuit(inputValue as keyof ThemeFeatures);
      }, 5000);
    }
  };

  return (
    <Overlay>
      <Wrapper>
        <StyledForm onSubmit={activateFeature}>
          <Input
            list="theme-keys"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <datalist id="theme-keys">
            {Object.keys(theme.features).map((it) => (
              <option value={it} key={it} />
            ))}
          </datalist>
          {currentStepProgress === -1 ? <Button>Valider</Button> : null}
        </StyledForm>
        <hr />
        {currentStepProgress >= 0 ? (
          <ProgressContainer>
            {steps.map((step, index) => (
              <div key={step}>
                {currentStepProgress >= index ? "☑" : "☐"}
                {step}
              </div>
            ))}
          </ProgressContainer>
        ) : null}
      </Wrapper>
    </Overlay>
  );
};
