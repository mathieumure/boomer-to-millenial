import { FC } from "react";
import styled from "styled-components";
import { useMovies } from "../movie/movieContext";

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #424242;
  color: white;
  display: none;

  &.displayed {
    display: flex;
    flex-direction: column;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const PlayerContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  border-radius: 100%;

  &:hover {
    cursor: pointer;
  }
`;

export const FinalPlay: FC<{ display: boolean; onAction: () => void }> = ({
  display,
  onAction,
}) => {
  const { cart } = useMovies();

  return (
    <Container className={display ? "displayed" : ""}>
      <Title>Playing {cart[0]?.title}</Title>
      <PlayerContainer>
        {display && (
          <iframe
            width="1120"
            height="630"
            // src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </PlayerContainer>

      <CloseButton type="button" onClick={onAction}>
        X
      </CloseButton>
    </Container>
  );
};
