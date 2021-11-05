import { FC, FormEvent } from "react";
import { Movie } from "../data";
import styled from "styled-components";

const Container = styled.article`
  display: flex;
  border: dashed 1px;
  margin-bottom: 2px;

  h3 {
    flex-grow: 1;
  }

  button {
    margin-left: 20px;
  }
`;

export const MovieCard: FC<{
  movie: Movie;
  onAction: () => void;
  actionName: string;
}> = ({ movie, onAction, actionName }) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAction();
  };
  return (
    <Container>
      <h3>{movie.title}</h3>
      <form onSubmit={handleSubmit}>
        <button>{actionName}</button>
      </form>
    </Container>
  );
};
