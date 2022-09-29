import React from "react";
import { IPlayer } from "../../players/Interfaces/Interfaces";
import s from "./TeamInfo.module.css";

interface playerProps {
  player: IPlayer;
}

export default function PlayerLine({ player }: playerProps) {
  const age = () => {
    let today = new Date();
    let bithday = new Date(player.birthday);
    let age = today.getFullYear() - bithday.getFullYear();
    let m = today.getMonth() - bithday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < bithday.getDate())) {
      age--;
    }
    return age;
  };
  return (
    <span className={`${s.playerInfo} ${s.item}`}>
      <span className={s.numName}>
        <p>{player.number}</p>
        <p>
          <img
            src={`http://dev.trainee.dex-it.ru${player.avatarUrl}`}
            width="50"
            height="50"
            alt=""
          />
          <span>
            <p>{player.name}</p>
            <i>{player.position}</i>
          </span>
        </p>
      </span>
      <span className={s.genPlayInfo}>
        <p>{player.height} cm</p>
        <p>{player.weight} kg</p>
        <p>{age()}</p>
      </span>
    </span>
  );
}
