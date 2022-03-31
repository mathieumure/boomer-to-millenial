import styled from "styled-components";
import { Profile } from "./Profile";

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const Profiles = () => (
  <Container>
    <Profile
      profileUrl="/images/mathieu.jpeg"
      name="Mathieu Mure"
      job="CTO & Consultant web"
      twitterHandle="MathieuMure"
    ></Profile>
    <Profile
      profileUrl="/images/julien.jpeg"
      name="Julien Sulpis"
      job="Consultant Web"
      twitterHandle="jsulpis"
    ></Profile>
  </Container>
);
