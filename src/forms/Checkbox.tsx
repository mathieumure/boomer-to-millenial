import { ChangeEventHandler, FC } from "react";
import styled, { css, useTheme } from "styled-components";
import { ifFeature, withKeyboardFocus } from "../baseDesign/utils";

const Label = styled.label`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5em;

  ${ifFeature(
    "baseCss",
    css`
      color: var(--grey-700);
      cursor: pointer;
      user-select: none;
      transition: color 100ms;

      &:hover {
        color: var(--grey-900);

        span {
          background: var(--grey-100);
        }
      }
    `
  )}
`;

const Checkmark = styled.span`
  width: 1.125em;
  height: 1.125em;
  background: white;
  border: 0.0625em solid var(--grey-300);
  border-radius: 0.1875em;
  position: relative;
  display: grid;
  place-items: center;
  transition: background 100ms;

  svg {
    width: 0.7em;
    height: 0.7em;
    color: var(--primary-base);
  }

  path {
    stroke-dashoffset: 14;

    ${ifFeature(
      "microinteractions",
      css`
        transition: stroke-dashoffset 100ms ease-in-out;
      `
    )}
  }
`;

const Input = styled.input`
  ${ifFeature(
    "baseCss",
    css`
      opacity: 0;
      width: 0;
      height: 0;
      position: absolute;

      &:checked ~ span path {
        stroke-dashoffset: 0;
      }

      ${withKeyboardFocus({ relativeTarget: "~ span" })}
    `
  )}
`;

const CheckmarkIcon = () => (
  <svg
    width="11"
    height="10"
    viewBox="0 0 11 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 6.5L4 9L10 1"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="14"
      strokeDashoffset="0"
    />
  </svg>
);

type CheckboxProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
  label: string;
};

const Checkbox: FC<CheckboxProps> = ({ onChange, checked, label }) => {
  const { features } = useTheme();
  return (
    <Label>
      <Input type="checkbox" onChange={onChange} checked={checked} />
      {features.baseCss && (
        <Checkmark>
          <CheckmarkIcon></CheckmarkIcon>
        </Checkmark>
      )}
      <p>{label}</p>
    </Label>
  );
};

export default Checkbox;
