import {
  ChangeEvent,
  FC,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Movie } from "../data";
import { MovieCard } from "../movie/movieCard";
import { MovieCardBase } from "../movie/movieCardBase";
import styled, { css, useTheme } from "styled-components";
import { FinalPlay } from "./FinalPlay";
import { useMovies } from "../movie/movieContext";
import { CartItem } from "../movie/cartItem";
import { ifFeature, ifNotFeature } from "../baseDesign/utils";
import { Flip } from "../baseDesign/flip";
import { Filters } from "./Filters";
import Button from "../forms/Button";
import { PlayIcon } from "../icon/Play.icon";
import { useSound } from "../sound/useSound";

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
  padding: 13vh 0 6vh 0;
  display: grid;
  gap: 1.5rem;
  grid-template: auto 1fr auto / auto;
  overflow: hidden;

  h3 {
    text-align: center;
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 2rem;
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
  overflow: auto;
  flex-grow: 1;
  padding: 0 2vw 0 3vw;
  width: 100%;
  gap: 1.5rem;

  background: linear-gradient(white 30%, rgba(255, 255, 255, 0)),
    linear-gradient(rgba(255, 255, 255, 0), white 70%) 0 100%,
    radial-gradient(farthest-side at 50% 0, rgba(0, 0, 0, 0.1), transparent),
    radial-gradient(farthest-side at 50% 100%, rgba(0, 0, 0, 0.1), transparent)
      0 100%;
  background-repeat: no-repeat;
  background-size: 100% 40px, 100% 40px, 100% 14px, 100% 14px;

  background-attachment: local, local, scroll, scroll;
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

const galleryFlip = new Flip();
const watchListFlip = new Flip();
const addToCartFlip = new Flip({
  withScaling: true,
  withAbsolute: true,
  animationDuration: 600,
});

export const MainContent: FC = () => {
  const { cart, searchResults, addToCart, sortMovie, removeFromCart } =
    useMovies();
  const [started, setStarted] = useState<boolean>(false);
  const [descOrder, setDescOrder] = useState<boolean>(false);
  const [currentSortType, setCurrentSortType] = useState<keyof Movie>();
  const [lastAdded, setLastAdded] = useState<Movie>();
  const [lastAction, setLastAction] = useState<"add" | "remove">();
  const { features } = useTheme();
  const gallery = useRef<HTMLElement>(null);
  const watchList = useRef<HTMLUListElement>(null);
  const { playSound } = useSound();

  function flipRead() {
    if (features.watchlistFlip && watchList.current) {
      watchListFlip.read(watchList.current.querySelectorAll("li"));
    }
    if (features.galleryFlip && gallery.current) {
      galleryFlip.read(gallery.current.querySelectorAll("article"));
    }
    if (features.addCartFlip && gallery.current) {
      addToCartFlip.read(
        gallery.current.querySelectorAll("div[data-flipid^=cart-img]")
      );
    }
  }

  useLayoutEffect(() => {
    if (features.galleryFlip && gallery.current) {
      galleryFlip.play(gallery.current.querySelectorAll("article"));
    }
  }, [searchResults]);

  useLayoutEffect(() => {
    if (features.watchlistFlip && watchList.current) {
      watchListFlip.play(watchList.current.querySelectorAll("li"));
    }
    if (features.addCartFlip && watchList.current && lastAction === "add") {
      addToCartFlip.play(
        watchList.current.querySelectorAll(
          `img[data-flipid="cart-img-${lastAdded?.title}"]`
        )
      );
      setLastAction(undefined);
    }
  }, [cart]);

  const handleAddToCart = async (movie: Movie) => {
    await playSound("add");
    setLastAction("add");
    flipRead();
    setLastAdded(movie);
    addToCart(movie);
  };

  const handleRemoveFromCart = async (movie: Movie) => {
    await playSound("delete");
    setLastAction("remove");
    flipRead();
    removeFromCart(movie);
  };

  const handleSortTypeChange = async (e: ChangeEvent<HTMLInputElement>) => {
    await playSound("shuffle");
    const sortType = e.target.value as keyof Movie;
    setCurrentSortType(sortType);
    flipRead();
    sortMovie(sortType, descOrder);
  };

  const handleFilterTypeChange = async (
    sortType: keyof Movie,
    desc: boolean
  ) => {
    await playSound("shuffle");
    setCurrentSortType(sortType);
    setDescOrder(desc);
    flipRead();
    sortMovie(sortType, desc);
  };

  const handleDescTypeChange = async (e: ChangeEvent<HTMLInputElement>) => {
    await playSound("shuffle");
    setDescOrder(e.target.checked);
    flipRead();
    sortMovie(currentSortType as keyof Movie, e.target.checked);
  };

  const handleStart = async () => {
    await playSound("cassette");
    setStarted(true);
  };

  if (!features.baseCss) {
    return (
      <MainContainer>
        <ResultSection ref={gallery}>
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

          {cart.length > 0 && (
            <button type="button" onClick={() => setStarted(true)}>
              Démarrer
            </button>
          )}
        </CartSection>
        <FinalPlay display={started} onAction={() => setStarted(false)} />
      </MainContainer>
    );
  }

  return (
    <>
      <MainContainer>
        <Filters
          currentSortType={currentSortType}
          desc={descOrder}
          handleSortTypeChange={handleFilterTypeChange}
        />
        <Gallery ref={gallery}>
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
        <CartList ref={watchList}>
          {cart.map((it) => (
            <CartItem
              movie={it}
              onAction={() => handleRemoveFromCart(it)}
              key={it.title}
            />
          ))}
        </CartList>

        {cart.length > 0 && (
          <CTAWrapper>
            <Button type="button" onClick={handleStart}>
              <PlayIcon />
              Démarrer
            </Button>
          </CTAWrapper>
        )}
      </CartContainer>
      <FinalPlay display={started} onAction={() => setStarted(false)} />
    </>
  );
};
