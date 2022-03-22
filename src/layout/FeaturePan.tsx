import { FormEvent, FC, useState, useRef, useEffect, useMemo } from "react";
import styled, { css, useTheme } from "styled-components";
import Input from "../forms/Input";
import Button from "../forms/Button";
import { ThemeFeatures } from "../baseDesign/theme";
import { ifFeature } from "../baseDesign/utils";

const Wrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  right: 2rem;
  top: 2rem;
  border: 2px solid black;
  background-color: white;

  ${ifFeature(
    "baseCss",
    css`
      border-radius: var(--border-radius-element);
      overflow: hidden;
      border: 1px solid var(--grey-300);
      box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.5);
    `
  )}
`;

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 2rem;
  column-gap: 1rem;
`;

type Props = {
  onQuit: (featureName: keyof ThemeFeatures) => void;
};

export const FeaturePan: FC<Props> = ({ onQuit }) => {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const activateFeature = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue) {
      setInputValue("");
      onQuit(inputValue as keyof ThemeFeatures);
    }
  };

  const isValueValid = useMemo(
    () => Object.keys(theme.features).includes(inputValue),
    [inputValue]
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  return (
    <Wrapper>
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
          {Object.keys(theme.features).map((it) => (
            <option value={it} key={it} />
          ))}
        </datalist>
        <Button disabled={!isValueValid}>Activer</Button>
      </StyledForm>
    </Wrapper>
  );
};
