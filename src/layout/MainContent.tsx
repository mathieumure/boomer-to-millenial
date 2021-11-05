import { FC, FormEvent, useMemo, useState } from "react";
import { data, Movie } from "../data";
import { MovieCard } from "../movie/movieCard";
import styled from "styled-components";
import { FinalPlay } from "./FinalPlay";

const ResultSection = styled.section`
  margin-top: 30px;
`;

const CartSection = styled.section`
  margin-top: 50px;
`;

export const MainContent: FC = () => {
  const [cart, setCart] = useState<Movie[]>([]);
  const [started, setStarted] = useState<boolean>(false);

  const displayedMovie = useMemo<Movie[]>(
    () => data.filter((it) => !cart.find((c) => c.title === it.title)),
    [data, cart]
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleAddToCart = (movie: Movie) => {
    setCart([...cart, movie]);
  };

  const handleRemoveFromCart = (movie: Movie) => {
    setCart(cart.filter((it) => it.title !== movie.title));
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h3>Tri:</h3>
        <label>
          Popularité
          <input type="checkbox" />
        </label>
        <label>
          Date de sortie
          <input type="checkbox" />
        </label>
        <label>
          Nom
          <input type="checkbox" />
        </label>
        <button>Filtrer</button>
      </form>
      <ResultSection>
        {displayedMovie.map((it) => (
          <MovieCard
            movie={it}
            onAction={() => handleAddToCart(it)}
            actionName="Ajouter à ma liste"
            key={it.title}
          />
        ))}
      </ResultSection>
      <CartSection>
        <h3>Ma liste</h3>
        {cart.map((it) => (
          <MovieCard
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
    </main>
  );
};
