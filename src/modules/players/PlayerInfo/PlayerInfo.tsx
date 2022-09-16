import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { get, remove } from "../../../api/baseRequest";
import { RootState } from "../../../core/redux";
import { IPlayer } from "../Interfaces/Interfaces";
import s from "./PlayerInfo.module.css";

export default function PlayerInfo() {
  const token = useSelector<RootState, string>(
    (state) => state.authReducer.token
  );
  const navigate = useNavigate();
  const { id } = useParams();
  const [player, setPlayer] = useState<IPlayer>();
  const deletePlayerHandler = () => {
    remove(`/Player/Delete/?id=${id}`, token);
    let deleteImg = player?.avatarUrl.substring(8);
    remove(`/Image/DeleteImage/?fileName=${deleteImg}`, token);
    navigate("/players");
  };
  const age = () => {
    let today = new Date();
    let bithday = new Date(player!.birthday);
    let age = today.getFullYear() - bithday.getFullYear();
    let m = today.getMonth() - bithday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < bithday.getDate())) {
      age--;
    }
    return age;
  };
  useEffect(() => {
    get(`/Player/Get/?id=${id}`, token).then((res) => setPlayer(res));
  }, []);
  return (
    <>
      <div className={s.container}>
        <div className={s.header}>
          <span>
            <p>
              <Link to="/players">Players</Link> /{" "}
              <Link to={`/players/${player?.id}`}>{player?.name}</Link>
            </p>
          </span>
          <span className={s.images}>
            <svg
              className={s.img}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.7089 5.63151C21.0989 6.02151 21.0989 6.65151 20.7089 7.04151L18.8789 8.87151L15.1289 5.12151L16.9589 3.29151C17.1458 3.10426 17.3994 2.99902 17.6639 2.99902C17.9285 2.99902 18.1821 3.10426 18.3689 3.29151L20.7089 5.63151ZM2.99878 20.5015V17.4615C2.99878 17.3216 3.04878 17.2015 3.14878 17.1015L14.0588 6.19155L17.8088 9.94155L6.88878 20.8515C6.79878 20.9515 6.66878 21.0015 6.53878 21.0015H3.49878C3.21878 21.0015 2.99878 20.7815 2.99878 20.5015Z"
                fill="#9C9C9C"
              />
            </svg>
            <svg
              className={s.img}
              onClick={deletePlayerHandler}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.5001 4H18.0001C18.5501 4 19.0001 4.45 19.0001 5C19.0001 5.55 18.5501 6 18.0001 6H6.00006C5.45006 6 5.00006 5.55 5.00006 5C5.00006 4.45 5.45006 4 6.00006 4H8.50006L9.21006 3.29C9.39006 3.11 9.65006 3 9.91006 3H14.0901C14.3501 3 14.6101 3.11 14.7901 3.29L15.5001 4ZM7.99998 21C6.89998 21 5.99998 20.1 5.99998 19V9.00004C5.99998 7.90004 6.89998 7.00004 7.99998 7.00004H16C17.1 7.00004 18 7.90004 18 9.00004V19C18 20.1 17.1 21 16 21H7.99998Z"
                fill="#E4163A"
              />
            </svg>
          </span>
        </div>
        <div className={s.content}>
          <div className={s.image}>
            <img
              src={`http://dev.trainee.dex-it.ru${player?.avatarUrl}`}
              alt="No Img"
              width={300}
              height={300}
            />
          </div>
          <div className={s.info}>
            <h1 className={s.name}>
              {player?.name} <span className={s.number}>{player?.number}</span>
            </h1>
            <span className={s.genInfo}>
              <p>
                <strong>Position</strong>
                <br />
                {player?.position}
              </p>
              <p>
                <strong>Team</strong>
                <br />
                {player?.teamName}
              </p>
              <p>
                <strong>Height</strong>
                <br />
                {player?.height} cm
              </p>
              <p>
                <strong>Weight</strong>
                <br />
                {player?.weight}kg
              </p>
              <p>
                <strong>Age</strong>
                <br />
                {player ? age() : ""}
              </p>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
