import { FC, MouseEventHandler } from "react";
import styled, { useTheme } from "styled-components";
import { withKeyboardFocus } from "../baseDesign/utils";

const BaseButton = styled.button`
  min-height: 48px;
  border-radius: 8px;
  padding: 12px 32px;
  color: white;
  background: var(--primary-background);
  border: 0;
  font-family: inherit;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  outline: none;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1),
    0px 4px 6px -2px rgba(0, 0, 0, 0.05);

  &:hover {
    background: var(--primary-dark);
  }

  &:active {
    background: var(--primary-darker);
  }

  ${withKeyboardFocus({
    initialShadow:
      "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05);",
  })}
`;

type ButtonProps = {
  type?: "submit" | "button";
  onClick?: MouseEventHandler;
};

const Button: FC<ButtonProps> = ({ type = "submit", onClick, children }) => {
  const { features } = useTheme();

  if (!features.baseCss) {
    return (
      <button type={type} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <BaseButton type={type} onClick={onClick}>
      {children}
    </BaseButton>
  );
};

export default Button;
