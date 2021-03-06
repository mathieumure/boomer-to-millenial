import React from "react";
import { Movie } from "../data";
import styled, { css } from "styled-components";
import { SortIcon } from "../icon/Sort.icon";
import { ifFeature, withKeyboardFocus } from "../baseDesign/utils";

const IconWrapper = styled.span<{ visible: boolean; reversed: boolean }>`
  display: ${(props) => (props.visible ? "flex" : "none")};
  align-items: center;
  transform: ${(props) => (props.reversed ? "matrix(1,0,0,-1,0,0)" : "none")};
  margin-left: 2px;

  ${ifFeature(
    "microinteractions",
    css`
      transition: transform 250ms var(--easing-standard); ;
    `
  )}
`;

const GridContainer = styled.section`
  display: grid;
  gap: 1.125rem;
  margin-top: 12vh;
  margin-bottom: 24px;
  padding: 0 4vw;
  grid-template-columns: repeat(5, 9vw);
  justify-content: center;
`;

const FiltersContainer = styled.div`
  grid-column: 1 / span 5;
  display: flex;
  align-items: center;
`;

const FiltersContainerTitle = styled.h3`
  margin-right: 12px;
  color: var(--grey-800);
`;

const FilterButton = styled.button`
  color: var(--grey-700);
  background-color: transparent;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 6px 12px;
  margin: 0 8px;
  border: 1px solid var(--grey-300);
  box-shadow: 0 1px 3.5px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  transition: all 0.2s;
  cursor: pointer;
  outline: none;

  &:hover {
    transform: scale(1.05);
  }
  &:active {
    background-color: var(--grey-300);
  }

  ${withKeyboardFocus({
    initialShadow:
      "0px 1.16667px 3.5px rgba(0, 0, 0, 0.1), 0px 1.16667px 2.33333px rgba(0, 0, 0, 0.06)",
  })}
`;

export const Filters: React.FC<{
  currentSortType: keyof Movie | undefined;
  desc: boolean;
  handleSortTypeChange: (sortType: keyof Movie, desc: boolean) => void;
}> = ({ currentSortType, handleSortTypeChange, desc }) => {
  const handleClick = (filterName: string) => {
    handleSortTypeChange(
      filterName as keyof Movie,
      filterName === currentSortType ? !desc : false
    );
  };

  return (
    <GridContainer>
      <FiltersContainer>
        <FiltersContainerTitle>Tri:</FiltersContainerTitle>
        <FilterButton onClick={() => handleClick("score")}>
          Popularit??
          <IconWrapper visible={currentSortType === "score"} reversed={desc}>
            <SortIcon />
          </IconWrapper>
        </FilterButton>
        <FilterButton onClick={() => handleClick("date")}>
          Date de sortie
          <IconWrapper visible={currentSortType === "date"} reversed={desc}>
            <SortIcon />
          </IconWrapper>
        </FilterButton>
        <FilterButton onClick={() => handleClick("title")}>
          Nom
          <IconWrapper visible={currentSortType === "title"} reversed={desc}>
            <SortIcon />
          </IconWrapper>
        </FilterButton>
      </FiltersContainer>
    </GridContainer>
  );
};
