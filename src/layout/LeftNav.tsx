import { FC, FormEvent } from "react";
import styled from "styled-components";

const Container = styled.aside`
  border-right: solid 1px;
  min-height: 100vh;
  margin-right: 10px;
  padding: 10px;
`;

export const LeftNav: FC = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Container>
      <h1>Zflix.</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" />
        <section>
          <h2>Type</h2>
          <label>
            <input type="checkbox" />
            Films
          </label>
          <label>
            <input type="checkbox" />
            Série
          </label>
        </section>
        <section>
          <h2>Genre</h2>
          <label>
            <input type="checkbox" />
            Action
          </label>
          <label>
            <input type="checkbox" />
            Fantastique
          </label>
          <label>
            <input type="checkbox" />
            Documentaires
          </label>
          <label>
            <input type="checkbox" />
            Comédie
          </label>
        </section>
        <section>
          <label>
            <input type="checkbox" />
            Inclure les titres déjà visionnés
          </label>
        </section>
        <button type="submit">Rechercher</button>
      </form>
    </Container>
  );
};
