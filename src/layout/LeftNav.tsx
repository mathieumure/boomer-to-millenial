import { FC, FormEvent, useState } from "react";
import styled, { css, useTheme } from "styled-components";
import { useMovies } from "../movie/movieContext";
import { MovieType } from "../data";
import { ifFeature, ifNotFeature } from "../baseDesign/utils";
import TextInput from "../forms/Input";
import Checkbox from "../forms/Checkbox";
import Switch from "../forms/Switch";
import Button from "../forms/Button";
import { SearchIcon } from "../icon/Search.icon";

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
      display: flex;
      flex-direction: column;
      padding: 10vh 2.5vw 6vh 2.5vw;
      background: linear-gradient(
        250.55deg,
        #f1f5f9 36.53%,
        rgba(255, 255, 255, 0) 103.26%
      );
    `
  )}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${ifFeature(
    "baseCss",
    css`
      flex-grow: 1;
      margin: 7vh auto 0;
      max-width: 350px;
    `
  )}
`;

const MainTitle = styled.h1`
  text-align: center;
  font-size: 4vmin;
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

const Filters = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;

  ${ifFeature(
    "baseCss",
    css`
      gap: 36px;
    `
  )}
`;

const SearchHeading = styled.h2`
  margin-bottom: 8px;

  ${ifFeature(
    "baseCss",
    css`
      color: var(--grey-800);
      font-size: 1rem;
      line-height: 1.5rem;
      font-weight: 700;
      margin-bottom: 12px;
    `
  )}
`;

const CheckboxColumn = styled.div`
  display: flex;
  flex-direction: column;

  ${ifFeature(
    "baseCss",
    css`
      gap: 12px;
      margin-left: 12px;
    `
  )}
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

  const { features } = useTheme();

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

      <Form onSubmit={handleSubmit}>
        <Filters>
          <TextInput
            label="Rechercher par nom"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <section>
            <SearchHeading>Type</SearchHeading>
            <CheckboxColumn>
              <Checkbox
                onChange={(e) => setWithMovieType(e.target.checked)}
                checked={withMovieType}
                label="Films"
              />
              <Checkbox
                onChange={(e) => setWithSeriesType(e.target.checked)}
                checked={withSeriesType}
                label="Série"
              />
            </CheckboxColumn>
          </section>

          <section>
            <SearchHeading>Genre</SearchHeading>
            <CheckboxColumn>
              <Checkbox
                onChange={(e) => setWithAction(e.target.checked)}
                checked={withAction}
                label="Action"
              />
              <Checkbox
                onChange={(e) => setWithFantastic(e.target.checked)}
                checked={withFantastic}
                label="Fantastique"
              />
              <Checkbox
                onChange={(e) => setWithDrama(e.target.checked)}
                checked={withDrama}
                label="Drame"
              />
              <Checkbox
                onChange={(e) => setWithComedy(e.target.checked)}
                checked={withComedy}
                label="Comédie"
              />
            </CheckboxColumn>
          </section>

          <section>
            <Switch
              onChange={(e) => setIncludeAlreadyAdded(e.target.checked)}
              checked={includeAlreadyAdded}
              label="Inclure les titres déjà ajoutés"
            />
          </section>
        </Filters>

        <Button>
          {features.baseCss && <SearchIcon />}
          Rechercher
        </Button>
      </Form>
    </Container>
  );
};
