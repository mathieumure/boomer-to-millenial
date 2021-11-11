import { FC, FormEvent, useState } from "react";
import styled, { css } from "styled-components";
import { useMovies } from "../movie/movieContext";
import { MovieType } from "../data";
import { ifFeature, ifNotFeature } from "../baseDesign/utils";
import TextInput from "../forms/Input";

const Container = styled.aside`
  ${ifNotFeature(
    "baseCss",
    css`
      border-right: solid 1px;
      min-height: 100vh;
      margin-right: 10px;
      padding: 10px;
    `
  )}
  ${ifFeature(
    "baseCss",
    css`
      background: linear-gradient(
        250.55deg,
        #f1f5f9 36.53%,
        rgba(255, 255, 255, 0) 103.26%
      );
    `
  )}
`;

const MainTitle = styled.h1`
  margin-top: 10vh;
  text-align: center;
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 900;
  text-transform: uppercase;

  ${ifFeature(
    "baseCss",
    css`
      background: var(--primary-background);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      span {
        background: var(--grey-900);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    `
  )}
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
      <MainTitle>
        Zflix<span>.</span>
      </MainTitle>

      <form onSubmit={handleSubmit}>
        <TextInput
          label="Rechercher par nom"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
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
