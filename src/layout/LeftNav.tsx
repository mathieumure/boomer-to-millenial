import { FC, FormEvent, useState } from "react";
import styled from "styled-components";
import { useMovies } from "../movie/movieContext";
import { MovieType } from "../data";

const Container = styled.aside`
  background: linear-gradient(
    250.55deg,
    #f1f5f9 36.53%,
    rgba(255, 255, 255, 0) 103.26%
  );
`;

const SearchSection = styled.section`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const SearchHeading = styled.h2`
  margin-bottom: 8px;
`;

const SearchCheckbox = styled.input`
  margin-right: 4px;
`;

const CtaContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const LeftNav: FC = () => {
  const { search } = useMovies();
  const [inputValue, setInputValue] = useState<string>("");

  const [includeAlreadyAdded, setIncludeAlreadyAdded] = useState<boolean>(true);

  const [withMovieType, setWithMovieType] = useState<boolean>(true);
  const [withSeriesType, setWithSeriesType] = useState<boolean>(true);

  const [withAction, setWithAction] = useState<boolean>(true);
  const [withFantastic, setWithFantastic] = useState<boolean>(true);
  const [withDrama, setWithDrama] = useState<boolean>(true);
  const [withComedy, setWithComedy] = useState<boolean>(true);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const movieType: MovieType[] = [];
    if (withMovieType) {
      movieType.push("Movie");
    }
    if (withSeriesType) {
      movieType.push("TVSeries");
    }

    const movieKind: string[] = [];
    if (withAction) {
      movieKind.push("Action");
    }
    if (withFantastic) {
      movieKind.push("Fantasy");
    }
    if (withDrama) {
      movieKind.push("Drama");
    }
    if (withComedy) {
      movieKind.push("Comedy");
    }

    search({
      title: inputValue,
      movieType,
      kind: movieKind,
      includeAlreadyAdded,
    });
  };

  return (
    <Container>
      <h1>Zflix.</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <SearchSection>
          <SearchHeading>Type</SearchHeading>
          <label>
            <SearchCheckbox
              type="checkbox"
              onChange={(e) => setWithMovieType(e.target.checked)}
              checked={withMovieType}
            />
            Movies
          </label>
          <label>
            <SearchCheckbox
              type="checkbox"
              onChange={(e) => setWithSeriesType(e.target.checked)}
              checked={withSeriesType}
            />
            Série
          </label>
        </SearchSection>
        <SearchSection>
          <SearchHeading>Genre</SearchHeading>
          <label>
            <SearchCheckbox
              type="checkbox"
              onChange={(e) => setWithAction(e.target.checked)}
              checked={withAction}
            />
            Action
          </label>
          <label>
            <SearchCheckbox
              type="checkbox"
              onChange={(e) => setWithFantastic(e.target.checked)}
              checked={withFantastic}
            />
            Fantastique
          </label>
          <label>
            <SearchCheckbox
              type="checkbox"
              onChange={(e) => setWithDrama(e.target.checked)}
              checked={withDrama}
            />
            Dramatique
          </label>
          <label>
            <SearchCheckbox
              type="checkbox"
              onChange={(e) => setWithComedy(e.target.checked)}
              checked={withComedy}
            />
            Comédie
          </label>
        </SearchSection>
        <SearchSection>
          <label>
            <SearchCheckbox
              type="checkbox"
              onChange={(e) => setIncludeAlreadyAdded(e.target.checked)}
              checked={includeAlreadyAdded}
            />
            Inclure les titres déjà ajoutés
          </label>
        </SearchSection>
        <CtaContainer>
          <button type="submit">Rechercher</button>
        </CtaContainer>
      </form>
    </Container>
  );
};
