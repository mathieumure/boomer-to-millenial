import { ChangeEvent, FC, useState } from "react";
import { Movie } from "../data";
import { MovieCard } from "../movie/movieCard";
import { MovieCardBase } from "../movie/movieCardBase";
import styled, { css, useTheme } from "styled-components";
import { FinalPlay } from "./FinalPlay";
import { useMovies } from "../movie/movieContext";
import { CartItem } from "../movie/cartItem";
import { ifFeature, ifNotFeature } from "../baseDesign/utils";

const MainContainer = styled.main`
  ${ifNotFeature(
    "baseCss",
    css`
      display: flex;
      width: 100%;
      margin-top: 30px;
      padding-right: 30px;
    `
  )}
  ${ifFeature(
    "baseCss",
    css`
      overflow: auto;
    `
  )}
`;

const ResultSection = styled.section`
  width: 50%;
`;

const CartContainer = styled.aside`
  background: white;
  padding: 13vh 2.5vw 3vw 3vw;
  overflow: auto;
  h3 {
    text-align: center;
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 2rem;
    margin-bottom: 1.5rem;
    color: var(--grey-800);
  }
`;

const CartSection = styled.section`
  width: 50%;
  margin-left: 30px;
`;

const CartList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FiltersContainer = styled.section`
  display: flex;
  align-items: baseline;
`;

const FiltersCheckbox = styled.label`
  margin-right: 8px;
  input {
    margin-right: 4px;
  }
`;

const Gallery = styled.section`
  display: flex;
  margin: auto;
  padding: 0 4vw;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.125rem;
`;

const FiltersContainerTitle = styled.h3`
  margin-right: 10px;
`;

const CTAWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: center;
`;

export const MainContent: FC = () => {
  const { cart, searchResults, addToCart, sortMovie, removeFromCart } =
    useMovies();
  const [started, setStarted] = useState<boolean>(false);
  const [descOrder, setDescOrder] = useState<boolean>(false);
  const [currentSortType, setCurrentSortType] = useState<keyof Movie>("score");
  const theme = useTheme();

  const handleAddToCart = (movie: Movie) => {
    addToCart(movie);
  };

  const handleRemoveFromCart = (movie: Movie) => {
    removeFromCart(movie);
  };

  const handleSortTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sortType = e.target.value as keyof Movie;
    setCurrentSortType(sortType);
    sortMovie(sortType, descOrder);
  };

  const handleDescTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescOrder(e.target.checked);
    sortMovie(currentSortType, e.target.checked);
  };

  if (!theme.features.baseCss) {
    return (
      <MainContainer>
        <ResultSection>
          <FiltersContainer>
            <FiltersContainerTitle>Tri:</FiltersContainerTitle>
            <FiltersCheckbox>
              <input
                type="radio"
                name="sortType"
                value="score"
                checked={currentSortType === "score"}
                onChange={handleSortTypeChange}
              />
              Popularité
            </FiltersCheckbox>
            <FiltersCheckbox>
              <input
                type="radio"
                name="sortType"
                value="date"
                checked={currentSortType === "date"}
                onChange={handleSortTypeChange}
              />
              Date de sortie
            </FiltersCheckbox>
            <FiltersCheckbox>
              <input
                type="radio"
                value="title"
                name="sortType"
                checked={currentSortType === "title"}
                onChange={handleSortTypeChange}
              />
              Nom
            </FiltersCheckbox>
            <FiltersCheckbox>
              <input
                type="checkbox"
                checked={descOrder}
                onChange={handleDescTypeChange}
              />
              DESC
            </FiltersCheckbox>
          </FiltersContainer>
          {searchResults.length > 0 ? (
            searchResults.map((it) => (
              <MovieCardBase
                movie={it}
                onAction={() => handleAddToCart(it)}
                actionName="Ajouter à ma liste"
                key={it.title}
              />
            ))
          ) : (
            <p>Aucun résultats</p>
          )}
        </ResultSection>
        <CartSection>
          <h3>Ma liste</h3>
          {cart.map((it) => (
            <MovieCardBase
              movie={it}
              onAction={() => handleRemoveFromCart(it)}
              actionName="Supprimer de ma liste"
              key={it.title}
            />
          ))}

          <CTAWrapper>
            {cart.length > 0 && (
              <button type="button" onClick={() => setStarted(true)}>
                Démarrer
              </button>
            )}
          </CTAWrapper>
        </CartSection>
        <FinalPlay display={started} onAction={() => setStarted(false)} />
      </MainContainer>
    );
  }

  return (
    <>
      <MainContainer>
        <FiltersContainer>
          <FiltersContainerTitle>Tri:</FiltersContainerTitle>
          <FiltersCheckbox>
            <input
              type="radio"
              name="sortType"
              value="score"
              checked={currentSortType === "score"}
              onChange={handleSortTypeChange}
            />
            Popularité
          </FiltersCheckbox>
          <FiltersCheckbox>
            <input
              type="radio"
              name="sortType"
              value="date"
              checked={currentSortType === "date"}
              onChange={handleSortTypeChange}
            />
            Date de sortie
          </FiltersCheckbox>
          <FiltersCheckbox>
            <input
              type="radio"
              value="title"
              name="sortType"
              checked={currentSortType === "title"}
              onChange={handleSortTypeChange}
            />
            Nom
          </FiltersCheckbox>
          <FiltersCheckbox>
            <input
              type="checkbox"
              checked={descOrder}
              onChange={handleDescTypeChange}
            />
            DESC
          </FiltersCheckbox>
        </FiltersContainer>

        <Gallery>
          {searchResults.length > 0 ? (
            searchResults.map((it) => (
              <MovieCard
                movie={it}
                onAction={() => handleAddToCart(it)}
                key={it.title}
              />
            ))
          ) : (
            <p>Aucun résultats</p>
          )}
        </Gallery>
      </MainContainer>

      <CartContainer>
        <h3>Ma liste</h3>
        <CartList>
          {cart.map((it) => (
            <CartItem
              movie={it}
              onAction={() => handleRemoveFromCart(it)}
              key={it.title}
            />
          ))}
        </CartList>

        <CTAWrapper>
          {cart.length > 0 && (
            <button type="button" onClick={() => setStarted(true)}>
              Démarrer
            </button>
          )}
        </CTAWrapper>
      </CartContainer>
      <FinalPlay display={started} onAction={() => setStarted(false)} />
    </>
  );
};
