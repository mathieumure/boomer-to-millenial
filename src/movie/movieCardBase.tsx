import { FC } from "react";
import { Movie } from "../data";
import styled from "styled-components";

const Container = styled.article`
  display: flex;
  border: dashed 1px;
  margin-bottom: 2px;
  padding: 5px;
`;

const Title = styled.h3`
  flex-grow: 1;
`;

const CTA = styled.button`
  margin-left: 20px;
`;

export const MovieCardBase: FC<{
  movie: Movie;
  onAction: () => void;
  actionName: string;
}> = ({ movie, onAction, actionName }) => {
  const handleClick = () => {
    onAction();
  };
  return (
    <Container data-flipid={movie.title}>
      <Title>{movie.title}</Title>
      <CTA type="button" onClick={handleClick}>
        {actionName}
      </CTA>
    </Container>
  );
};
