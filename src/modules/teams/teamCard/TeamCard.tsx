import React from "react";
import { Link } from "react-router-dom";
import { ITeamCard } from "../Interfaces/Interfaces";
import s from "./TeamCard.module.css";

interface infoProps {
  cardInfo: ITeamCard;
}

export default function TeamCard(props: infoProps) {
  const { cardInfo } = props;

  return (
    <Link className={s.card} to={`/teams/${cardInfo.id}`}>
      <img
        src={`http://dev.trainee.dex-it.ru${cardInfo.imageUrl}`}
        alt="no data"
        width="150px"
        height="150px"
      />
      <div className={s.info}>
        <h2 className={s.title}>{cardInfo.name}</h2>
        <h3 className={s.year}>
          Year of foundation: {cardInfo.foundationYear}
        </h3>
      </div>
    </Link>
  );
}
