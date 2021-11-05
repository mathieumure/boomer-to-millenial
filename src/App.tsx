import { FC } from "react";
import styled from "styled-components";
import { LeftNav } from "./layout/LeftNav";
import { MainContent } from "./layout/MainContent";

const Container = styled.div`
  display: flex;
`;

const App: FC = () => {
  return (
    <Container>
      <LeftNav />
      <MainContent />
    </Container>
  );
};

export default App;
