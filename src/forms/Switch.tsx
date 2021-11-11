import { ChangeEventHandler, FC } from "react";
import styled, { useTheme } from "styled-components";

const Label = styled.label`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75em;
  color: var(--grey-700);
  cursor: pointer;
  user-select: none;
  transition: color 100ms;

  &:hover {
    color: var(--grey-900);

    .switch {
      background: var(--grey-400);
    }

    input:checked ~ .switch {
      background: var(--primary-dark);
    }
  }
`;

const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;

  &:checked ~ .switch {
    background: var(--primary-base);

    .switch__handle {
      transform: translateX(100%);
    }
  }

  &:focus-visible ~ .switch {
    box-shadow: 0 0 0 3px var(--primary-light);
  }

  // fallback for older browsers
  &:focus ~ .switch {
    box-shadow: 0 0 0 3px var(--primary-light);
  }

  // no focus ring on browsers that support :focus-visible
  &:focus:not(:focus-visible) ~ .switch {
    box-shadow: none;
  }
`;

const SwitchElement = styled.span`
  --switch-height: 1.25em;
  --switch-padding: 0.125em;
  --switch-handle-size: calc(var(--switch-height) - 2 * var(--switch-padding));

  width: calc(2 * var(--switch-handle-size) + 2 * var(--switch-padding));
  height: var(--switch-height);
  flex-shrink: 0;
  background: var(--grey-300);
  box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.12),
    inset 0px 0px 1px rgba(0, 0, 0, 0.08);
  position: relative;
  border-radius: calc(var(--switch-height) / 2);
  transition: background 100ms;

  .switch__handle {
    width: var(--switch-handle-size);
    height: var(--switch-handle-size);
    background: white;
    border-radius: 50%;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15);
    position: absolute;
    left: var(--switch-padding);
    top: calc(50% - var(--switch-handle-size) / 2);
    transition: transform 150ms var(--easing-standard);
  }
`;

type SwitchProps = {
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
};

const Switch: FC<SwitchProps> = ({ label, onChange, checked }) => {
  const { features } = useTheme();

  if (!features.baseCss) {
    return (
      <label style={{ marginTop: "12px" }}>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span style={{ marginLeft: "8px" }}>{label}</span>
      </label>
    );
  }

  return (
    <Label>
      <Input type="checkbox" checked={checked} onChange={onChange} />
      <SwitchElement className="switch">
        <span className="switch__handle"></span>
      </SwitchElement>
      <p>{label}</p>
    </Label>
  );
};

export default Switch;
