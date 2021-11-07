import { FC } from "react";
import styled from "styled-components";
import { LeftNav } from "./layout/LeftNav";
import { MainContent } from "./layout/MainContent";
import { MoviesProvider } from "./movie/movieContext";

const Container = styled.div`
  display: flex;
`;

const App: FC = () => {
  return (
    <MoviesProvider>
      <Container>
        <LeftNav />
        <MainContent />
      </Container>
    </MoviesProvider>
  );
};

export default App;
