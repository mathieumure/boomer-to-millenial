import React from "react";
import { Movie } from "../data";
import styled, { css } from "styled-components";
import { ifFeature, withKeyboardFocus } from "../baseDesign/utils";

const Container = styled.article`
  display: inline-flex;
  position: relative;
  border-radius: var(--border-radius-element);
  box-shadow: 0px 5px 19px -6px rgba(17, 24, 39, 0.8);
  overflow: hidden;

  ${ifFeature(
    "microinteractions",
    css`
      transition: transform 250ms var(--easing-standard);

      button {
        transition: transform 150ms var(--easing-decelerate),
          opacity 150ms var(--easing-decelerate), color 100ms;
      }

      &:hover {
        transform: scale(1.05);
      }
    `
  )}

  button {
    position: absolute;
    z-index: 1;
    bottom: 0.5rem;
    cursor: pointer;
    left: calc(50% - 2.5rem / 2);
    transform: translateY(100%);
    border: 3px solid currentColor;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    opacity: 0;
    background: transparent;
    color: white;
    font-size: 1.5rem;

    &:hover {
      color: rgba(255, 255, 255, 0.8);
    }

    &:active {
      color: rgba(255, 255, 255, 0.6);
    }

    &:focus {
      transition-duration: 0ms;
      outline: none;
      transform: translateY(0);
      opacity: 1;
    }

    ${withKeyboardFocus()}
  }

  &:hover {
    button {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const Poster = styled.div`
  width: 9vw;
  max-width: 200px;
  background-size: 102%;
  background-position: center;
  transition: background-size 250ms var(--easing-standard);
  position: relative;
  display: inline-flex;
  overflow: hidden;

  ${ifFeature(
    "microinteractions",
    css`
      --background-zoom: 110%;
    `
  )}

  article:hover > &,
  button:focus + & {
    background-size: var(--background-zoom, 102%);

    &::after {
      opacity: 1;
    }
  }

  &::before {
    content: "";
    display: inline-block;
    padding-top: calc(3 / 2 * 100%); // aspect ratio 2/3
    width: 100%;
    height: 0;
  }

  &::after {
    position: absolute;
    content: "";
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
    opacity: 0;
    transition: opacity 150ms var(--easing-standard);
    bottom: 0;
    left: 0;
    height: 40%;
    width: 100%;
  }
`;

export const MovieCard = React.memo<{
  movie: Movie;
  onAction: () => void;
}>(
  ({ movie, onAction }) => {
    return (
      <Container data-flipid={movie.title}>
        <button
          type="button"
          onClick={() => onAction()}
          aria-label="Ajouter à ma liste"
          title="Ajouter à ma liste"
        >
          +
        </button>
        <Poster
          style={{ backgroundImage: `url(${movie.imageUrl})` }}
          data-flipid={"cart-img-" + movie.title}
        />
      </Container>
    );
  },
  (prevProps, nextProps) => prevProps.movie?.title === nextProps.movie?.title
);
