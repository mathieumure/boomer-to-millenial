import { FormEvent, FC, useState, useRef, useMemo } from "react";
import styled, { useTheme } from "styled-components";
import Input from "../forms/Input";
import Button from "../forms/Button";
import { ThemeFeatures } from "../baseDesign/theme";
import { SlidePanel } from "./SlidePanel";

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 1rem;
`;

const handleFeatureActivation = (feature: keyof ThemeFeatures) => {
  if (feature) {
    window.activateFeature(feature);
  }
};

export const FeaturePan: FC = () => {
  const { features } = useTheme();
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [panelVisible, setPanelVisible] = useState(false);

  const isValueValid = useMemo(
    () => Object.keys(features).includes(inputValue),
    [inputValue]
  );

  const activateFeature = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue) {
      handleFeatureActivation(inputValue as keyof ThemeFeatures);
      setPanelVisible(false);
    }
  };

  return (
    <SlidePanel
      visible={panelVisible}
      onVisibleChange={setPanelVisible}
      onBeforeEnter={() => inputRef.current?.focus()}
      onAfterLeave={() => setInputValue("")}
    >
      <StyledForm onSubmit={activateFeature}>
        <Input
          ref={inputRef}
          label="Feature"
          list="theme-keys"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required={true}
        />
        <datalist id="theme-keys">
          {Object.keys(features).map((it) => (
            <option value={it} key={it} />
          ))}
        </datalist>
        <Button disabled={!isValueValid}>Activer</Button>
      </StyledForm>
    </SlidePanel>
  );
};
