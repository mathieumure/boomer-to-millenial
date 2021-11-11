import { ChangeEventHandler, FC } from "react";
import styled, { css } from "styled-components";
import { ifFeature, ifNotFeature } from "../baseDesign/utils";

const Label = styled.label`
  width: 100%;
  display: flex;
  position: relative;

  p {
    position: absolute;
    pointer-events: none;
    left: 12px;
    top: calc(50% - 1rem / 2);
    font-size: 0.875rem;

    ${ifFeature(
      "microinteractions",
      css`
        transition: all 150ms var(--easing-standard);
      `
    )}
  }

  ${ifFeature(
    "baseCss",
    css`
      color: var(--grey-500);

      input:focus + p,
      input:not([value=""]) + p {
        // -padding-left, -(margin-top + input-height/2 + font-size/2), 0
        //        -12   ,-(     4      +         40/2   +      16/2  ), 0
        transform: translate3d(-12px, -32px, 0);
        font-size: 0.75rem;
      }
    `
  )}

  ${ifNotFeature(
    "baseCss",
    css`
      input:focus + p,
      input:not([value=""]) + p {
        display: none;
      }
    `
  )}
`;

const Input = styled.input`
  width: 100%;

  ${ifFeature(
    "baseCss",
    css`
      height: 40px;
      display: block;
      background: white;
      border: 1px solid var(--grey-300);
      border-radius: 6px;
      padding: 0 12px;
      transition: all 100ms;
      color: var(--grey-900);
      font-size: 1rem;
      letter-spacing: 0.4px;

      &:hover:not(:focus) {
        background: var(--grey-100);
      }

      &:focus {
        outline: none;
        box-shadow: 0 0 0 2px var(--primary-light);
      }
    `
  )}
`;

type InputProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  label: string;
};

const TextInput: FC<InputProps> = ({ onChange, value, label }) => (
  <Label>
    <Input type="text" onChange={onChange} value={value} />
    <p>{label}</p>
  </Label>
);

export default TextInput;
