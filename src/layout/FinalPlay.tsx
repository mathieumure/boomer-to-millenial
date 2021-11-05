import { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  transform: translateY(100%);
  background-color: #424242;
  color: white;
  //transition: all 0.3s;

  &.displayed {
    transform: translateY(0);
  }
`;

export const FinalPlay: FC<{ display: boolean; onAction: () => void }> = ({
  display,
  onAction,
}) => {
  return (
    <Container className={display ? "displayed" : ""}>
      <h3>The end</h3>
      <button type="button" onClick={onAction}>
        Close
      </button>
      {display && (
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </Container>
  );
};
