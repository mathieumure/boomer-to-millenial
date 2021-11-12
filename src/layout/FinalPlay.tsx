import { FC, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { CloseIcon } from "../icon/Close.icon";
import { useMovies } from "../movie/movieContext";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const title = keyframes`
  0% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: black;
  color: white;
  display: none;

  &.displayed {
    display: flex;
    flex-direction: column;
    justify-content: center;
    animation: ${fadeIn} 1000ms ease forwards;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 6rem;
  opacity: 0;
  animation: ${title} 2.5s ease 800ms forwards;
`;

const PlayerContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  iframe {
    width: 100%;
    height: 85%;
  }
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
  const [startVideo, setStartVideo] = useState(false);
  let timeout: any;

  useEffect(() => {
    if (display) {
      timeout = setTimeout(() => {
        setStartVideo(true);
      }, 3000);
    } else if (startVideo) {
      setStartVideo(false); // reset to false when closing the player
    }
  }, [display, startVideo]);

  function clickHandler() {
    clearTimeout(timeout);
    onAction();
  }

  return (
    <Container className={display ? "displayed" : ""}>
      <CloseButton type="button" onClick={clickHandler}>
        <CloseIcon size={50} fill="white"></CloseIcon>
      </CloseButton>

      {startVideo ? (
        <PlayerContainer>
          <iframe
            // src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </PlayerContainer>
      ) : (
        <Title>{cart[0]?.title}</Title>
      )}
    </Container>
  );
};
