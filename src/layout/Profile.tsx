import { FC } from "react";
import styled from "styled-components";
import { BuildingIcon } from "../icon/Building.icon";
import { TwitterIcon } from "../icon/Twitter.icon";
import { WorkIcon } from "../icon/Work.icon";

const Container = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
  font-size: 1.6rem;
  border: 1px solid #222;
  border-radius: 12px;
  padding: 5rem;

  > div {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  img {
    height: 280px;
    width: 280px;
    object-fit: cover;
    object-position: top;
    border-radius: 50%;
    border: inherit;
  }

  a {
    color: currentColor;
    font-weight: bold;
  }

  span {
    display: inline-flex;
    gap: 16px;
    align-items: center;
    font-weight: 300;
  }

  strong {
    font-size: 3.2rem;
    margin-bottom: 0.75rem;
  }
`;

interface ProfileProps {
  profileUrl: string;
  name: string;
  job: string;
  twitterHandle: string;
}

export const Profile: FC<ProfileProps> = ({
  profileUrl,
  name,
  job,
  twitterHandle,
}) => (
  <Container>
    <img src={profileUrl} alt={`Profil de ${name}`} />
    <strong>{name}</strong>
    <div>
      <span>
        <WorkIcon size={26} />
        {job}
      </span>
      <span>
        <BuildingIcon size={26} />
        Zenika
      </span>
      <span>
        <TwitterIcon size={26} />
        <a href={`https://twitter.com/${twitterHandle}`}>@{twitterHandle}</a>
      </span>
    </div>
  </Container>
);
