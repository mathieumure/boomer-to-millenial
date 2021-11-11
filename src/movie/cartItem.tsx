import { FC } from "react";
import { Movie } from "../data";
import styled, { css, useTheme } from "styled-components";

const Container = styled.li<{ fadein: boolean }>`
  display: flex;
  align-items: center;

  ${(props) =>
    props.fadein &&
    css`
      opacity: 0;
      animation: fadein 200ms var(--easing-decelerate) 50ms forwards;

      @keyframes fadein {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `}

  &:hover button {
    opacity: 1;
  }

  p {
    color: var(--grey-700);
    flex-grow: 1;
    font-weight: 500;
    margin-left: 1.125rem;
    font-size: 1rem;
  }

  button {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    border: 0;
    background: white;
    color: var(--grey-600);
    transition: 150ms box-shadow ease, 150ms background ease;
    opacity: 0;
    box-shadow: 0px 1.16667px 3.5px rgba(0, 0, 0, 0.1),
      0px 1.16667px 2.33333px rgba(0, 0, 0, 0.06);

    &:hover {
      background: var(--grey-100);
      color: var(--grey-700);
    }
    &:active {
      color: var(--grey-900);
    }
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px var(--primary-light);
    }
    &:focus-visible {
      opacity: 1;
      box-shadow: 0 0 0 3px var(--primary-light);
    }
    // for browsers that support :focus-visible
    &:focus:not(:focus-visible) {
      box-shadow: 0px 1.16667px 3.5px rgba(0, 0, 0, 0.1),
        0px 1.16667px 2.33333px rgba(0, 0, 0, 0.06);
    }
  }
`;

const Poster = styled.img`
  width: 4vw;
  height: 4vw;
  flex-shrink: 0;
  border-radius: 0.5rem;
  object-fit: cover;
`;

export const CartItem: FC<{
  movie: Movie;
  onAction: () => void;
}> = ({ movie, onAction }) => {
  const { features } = useTheme();
  return (
    <Container
      data-flipid={"cart-" + movie.title}
      fadein={features.watchlistFlip}
    >
      <Poster src={movie.imageUrl} />
      <p>{movie.title}</p>
      <button
        type="button"
        onClick={() => onAction()}
        aria-label="Supprimer de ma liste"
        title="Supprimer de ma liste"
      >
        <svg
          width="16"
          height="18"
          viewBox="0 0 16 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.9166 4C15.9166 4.20411 15.8417 4.40111 15.706 4.55364C15.5704 4.70617 15.3835 4.80362 15.1808 4.8275L15.0833 4.83333H14.3791L13.3533 15.2667C13.2975 15.8328 13.033 16.3579 12.6115 16.7399C12.1899 17.1219 11.6414 17.3334 11.0725 17.3333H4.92748C4.3586 17.3334 3.81004 17.1219 3.38848 16.7399C2.96692 16.3579 2.7025 15.8328 2.64665 15.2667L1.62081 4.83333H0.916646C0.695633 4.83333 0.483671 4.74554 0.327391 4.58926C0.17111 4.43298 0.083313 4.22101 0.083313 4C0.083313 3.77899 0.17111 3.56702 0.327391 3.41074C0.483671 3.25446 0.695633 3.16667 0.916646 3.16667H5.08331C5.08331 2.78364 5.15875 2.40437 5.30533 2.05051C5.45191 1.69664 5.66675 1.37511 5.93758 1.10427C6.20842 0.833434 6.52995 0.618594 6.88382 0.472018C7.23769 0.325442 7.61696 0.25 7.99998 0.25C8.383 0.25 8.76227 0.325442 9.11614 0.472018C9.47001 0.618594 9.79154 0.833434 10.0624 1.10427C10.3332 1.37511 10.5481 1.69664 10.6946 2.05051C10.8412 2.40437 10.9166 2.78364 10.9166 3.16667H15.0833C15.3043 3.16667 15.5163 3.25446 15.6726 3.41074C15.8288 3.56702 15.9166 3.77899 15.9166 4ZM9.87498 6.70833C9.72395 6.70834 9.57803 6.76304 9.4642 6.86231C9.35038 6.96158 9.27635 7.09871 9.25581 7.24833L9.24998 7.33333V13.1667L9.25581 13.2517C9.2764 13.4013 9.35044 13.5383 9.46426 13.6376C9.57808 13.7368 9.72398 13.7915 9.87498 13.7915C10.026 13.7915 10.1719 13.7368 10.2857 13.6376C10.3995 13.5383 10.4736 13.4013 10.4941 13.2517L10.5 13.1667V7.33333L10.4941 7.24833C10.4736 7.09871 10.3996 6.96158 10.2858 6.86231C10.1719 6.76304 10.026 6.70834 9.87498 6.70833V6.70833ZM6.12498 6.70833C5.97395 6.70834 5.82803 6.76304 5.7142 6.86231C5.60038 6.96158 5.52635 7.09871 5.50581 7.24833L5.49998 7.33333V13.1667L5.50581 13.2517C5.5264 13.4013 5.60044 13.5383 5.71426 13.6376C5.82808 13.7368 5.97398 13.7915 6.12498 13.7915C6.27598 13.7915 6.42188 13.7368 6.5357 13.6376C6.64952 13.5383 6.72356 13.4013 6.74415 13.2517L6.74998 13.1667V7.33333L6.74415 7.24833C6.72361 7.09871 6.64958 6.96158 6.53575 6.86231C6.42193 6.76304 6.27601 6.70834 6.12498 6.70833V6.70833ZM7.99998 1.91667C7.66846 1.91667 7.35052 2.04836 7.1161 2.28278C6.88168 2.5172 6.74998 2.83515 6.74998 3.16667H9.24998C9.24998 2.83515 9.11828 2.5172 8.88386 2.28278C8.64944 2.04836 8.3315 1.91667 7.99998 1.91667Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </Container>
  );
};
