import React, { useRef } from "react";
import { Movie } from "../data";
import styled from "styled-components";
import { SortIcon } from "../icon/Sort.icon";

const IconWrapper = styled.span<{ visible: boolean; reversed: boolean }>`
  opacity: ${(props) => (props.visible ? 1 : 0)};
  display: flex;
  align-items: center;
  transform-origin: center center;
  transform: ${(props) => (props.reversed ? "rotate(180deg)" : "none")};
  margin-left: 2px;
`;

const FiltersContainer = styled.section`
  display: flex;
  margin-top: 100px;
  margin-bottom: 24px;
  padding: 0 4vw;
`;

const FiltersContainerTitle = styled.h3``;

const FilterButton = styled.button`
  color: var(--grey-700);
  border: none;
  background-color: transparent;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  margin: 0 20px;

  &:hover {
    cursor: pointer;
  }
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

  const ref = useRef<HTMLElement>(null);

  return (
    <FiltersContainer ref={ref}>
      <FiltersContainerTitle>Tri:</FiltersContainerTitle>
      <FilterButton onClick={() => handleClick("score")}>
        Popularité
        <IconWrapper visible={currentSortType === "score"} reversed={desc}>
          <SortIcon width={20} height={20} />
        </IconWrapper>
      </FilterButton>
      <FilterButton onClick={() => handleClick("date")}>
        Date de sortie
        <IconWrapper visible={currentSortType === "date"} reversed={desc}>
          <SortIcon width={20} height={20} />
        </IconWrapper>
      </FilterButton>
      <FilterButton onClick={() => handleClick("title")}>
        Nom
        <IconWrapper visible={currentSortType === "title"} reversed={desc}>
          <SortIcon width={20} height={20} />
        </IconWrapper>
      </FilterButton>
    </FiltersContainer>
  );
};
