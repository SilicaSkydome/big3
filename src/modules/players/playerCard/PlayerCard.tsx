import React from "react";
import { Link } from "react-router-dom";
import IPlayerCard from "../Interfaces/Interfaces";
import s from "./PlayerCard.module.css";

interface infoProps {
  cardInfo: IPlayerCard;
}

export default function TeamCard(props: infoProps) {
  const { cardInfo } = props;

  return (
    <Link className={s.card} to={`/teams/${cardInfo.id}`}>
      <div className={s.image}>
        <img src={cardInfo.imageUrl} alt="no data" />
      </div>
      <div className={s.info}>
        <h2 className={s.title}>
          {cardInfo.name} <span className={s.number}>{cardInfo.number}</span>
        </h2>
        <h3 className={s.team}>{cardInfo.team}</h3>
      </div>
    </Link>
  );
}
