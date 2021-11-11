import { FC, FormEvent, useState } from "react";
import styled, { css, useTheme } from "styled-components";
import { useMovies } from "../movie/movieContext";
import { MovieType } from "../data";
import { ifFeature, ifNotFeature } from "../baseDesign/utils";
import TextInput from "../forms/Input";
import Checkbox from "../forms/Checkbox";
import Switch from "../forms/Switch";
import Button from "../forms/Button";

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
      padding: 10vh 2.5vw 3vw 2.5vw;
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
      flex-grow: 1;
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
          {features.baseCss && <SearchIcon></SearchIcon>}
          Rechercher
        </Button>
      </Form>
    </Container>
  );
};

const SearchIcon = () => (
  <svg
    width="19"
    height="20"
    viewBox="0 0 19 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.71 17.2871L14.31 13.8971C15.407 12.4996 16.0022 10.7738 16 8.9971C16 7.41485 15.5308 5.86814 14.6518 4.55254C13.7727 3.23695 12.5233 2.21157 11.0615 1.60607C9.59966 1.00057 7.99113 0.84214 6.43928 1.15082C4.88743 1.4595 3.46197 2.22143 2.34315 3.34025C1.22433 4.45907 0.462403 5.88453 0.153721 7.43638C-0.15496 8.98823 0.00346625 10.5968 0.608967 12.0586C1.21447 13.5204 2.23985 14.7698 3.55544 15.6489C4.87103 16.5279 6.41775 16.9971 8 16.9971C9.77666 16.9993 11.5025 16.4041 12.9 15.3071L16.29 18.7071C16.383 18.8008 16.4936 18.8752 16.6154 18.926C16.7373 18.9768 16.868 19.0029 17 19.0029C17.132 19.0029 17.2627 18.9768 17.3846 18.926C17.5064 18.8752 17.617 18.8008 17.71 18.7071C17.8037 18.6141 17.8781 18.5035 17.9289 18.3817C17.9797 18.2598 18.0058 18.1291 18.0058 17.9971C18.0058 17.8651 17.9797 17.7344 17.9289 17.6125C17.8781 17.4907 17.8037 17.3801 17.71 17.2871ZM2 8.9971C2 7.81042 2.3519 6.65038 3.01119 5.66368C3.67047 4.67699 4.60755 3.90795 5.7039 3.45383C6.80026 2.9997 8.00666 2.88088 9.17055 3.11239C10.3344 3.3439 11.4035 3.91535 12.2426 4.75446C13.0818 5.59358 13.6532 6.66268 13.8847 7.82656C14.1162 8.99045 13.9974 10.1968 13.5433 11.2932C13.0892 12.3896 12.3201 13.3266 11.3334 13.9859C10.3467 14.6452 9.18669 14.9971 8 14.9971C6.4087 14.9971 4.88258 14.365 3.75736 13.2397C2.63214 12.1145 2 10.5884 2 8.9971Z"
      fill="currentColor"
    />
  </svg>
);
