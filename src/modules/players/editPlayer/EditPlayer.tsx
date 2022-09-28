import React, { useEffect, useRef, useState } from "react";
import s from "./EditPlayer.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IPlayer, IPlayerFormData } from "../Interfaces/Interfaces";
import { get, post, put } from "../../../api/baseRequest";
import { RootState } from "../../../core/redux";
import { useSelector } from "react-redux";
import Select, { SingleValue } from "react-select";

interface playerProps {
  teamNames: { name: string; id: number }[];
  playerInfo: IPlayer;
}

export default function EditPlayer({ teamNames, playerInfo }: playerProps) {
  const customSelect = {
    container: (base: any) => ({
      ...base,
      width: 360,
      height: 50,
      "@media (max-width: 650px)": {
        width: "90%",
        marginLeft: "5%",
      },
    }),
    control: (base: any) => ({
      ...base,
      background: "#F6F6F6",
      border: "none",
      boxShadow: "none",
    }),
    option: (base: any, { data, isDisabled, isFocused, isSelected }: any) => ({
      ...base,
      border: "1px solid #D1D1D1",
      background: isSelected ? "#C60E2E" : "#FFFFFF",
      color: isSelected ? "#FFFFFF" : "#9C9C9C",
      ":active": {
        ...base[":active"],
        background: "#C60E2E",
      },
    }),
    indicatorSeparator: (base: any) => ({
      ...base,
      display: "block",
      height: 24,
      alignSelf: "stretch",
      marginTop: 0,
      width: 1,
    }),
  };
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IPlayerFormData>({
    defaultValues: {
      name: playerInfo.name,
      number: playerInfo.number,
      birthday: playerInfo.birthday,
      height: playerInfo.height,
      weight: playerInfo.weight,
    },
  });
  const selectPositions: { value: string; label: string }[] = [
    { label: "Center Forward", value: "CenterForward" },
    { label: "Guard Forward", value: "GuardForward" },
    { label: "Forward", value: "Forward" },
    { label: "Center", value: "Center" },
    { label: "Guard", value: "Guard" },
  ];
  const [teams, setTeams] = useState<{ value: number; label: string }[]>([]);
  const imgData = new FormData();
  const [selectedPosition, setSelectedPosition] = useState<{
    value: string;
    label: string;
  }>(selectPositions[0]);
  const [selectedTeam, setSelectedTeam] = useState<{
    value: number;
    label: string;
  }>(teams[0]);
  const token: string = useSelector<RootState, string>(
    (state) => state.authReducer.token
  );
  const imageLabel = useRef<HTMLLabelElement>(null);
  const onSubmit: SubmitHandler<IPlayerFormData> = async (e) => {
    let playerData = {
      name: e.name,
      number: e.number,
      position: selectedPosition.value,
      team: selectedTeam.value,
      birthday: e.birthday,
      height: e.height,
      weight: e.weight,
      avatarUrl: "",
      id: playerInfo.id,
    };
    if (imgData.has("file")) {
      await post("/Image/SaveImage", imgData, token).then(
        (response: string): void => {
          playerData.avatarUrl = response;
        }
      );
    } else {
      playerData.avatarUrl = playerInfo.avatarUrl;
    }

    await put("/Player/Update", JSON.stringify(playerData), token);
    navigate("/players");
  };
  const handlePositionSelect = (
    selectedOption: SingleValue<{ value: string; label: string }>
  ) => {
    setSelectedPosition(selectedOption!);
  };
  const handleTeamSelect = (
    selectedOption: SingleValue<{ value: number; label: string }>
  ) => {
    setSelectedTeam(selectedOption!);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (imageLabel.current !== null) {
        imageLabel.current.style.backgroundImage = `url(${reader.result})`;
      }
    });
    imgData.set("file", e.target.files![0]);
    reader.readAsDataURL(e.target.files![0]);
  };

  useEffect(() => {
    const teams = teamNames.map((t) => {
      return { value: t.id, label: t.name };
    });
    setTeams(teams);
    if (imageLabel.current !== null) {
      imageLabel.current.style.backgroundImage = `url(http://dev.trainee.dex-it.ru${playerInfo.avatarUrl})`;
    }
    let defPos = selectPositions.filter(
      (p) => p.value === playerInfo.position
    )[0];
    setSelectedPosition(defPos);
    let defTeam = teams.filter((t) => t.value === playerInfo.team)[0];
    setSelectedTeam(defTeam);
  }, []);

  return (
    <div className={s.container}>
      <div className={s.header}>
        <p>
          <Link to="/players">Players</Link> /{" "}
          <Link to={`/teams/${playerInfo.id}`}>{playerInfo.name}</Link> /{" "}
          <Link to={`/teams/${playerInfo.id}/edit`}>Edit</Link>
        </p>
      </div>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.image}>
          <input
            type="file"
            {...register("image")}
            id="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label htmlFor="file" ref={imageLabel}>
            <svg
              width="74"
              height="75"
              viewBox="0 0 74 75"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.7"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.8748 29.6875C12.179 29.6875 10.7915 28.2812 10.7915 26.5625V20.3125H4.62481C2.92897 20.3125 1.54147 18.9062 1.54147 17.1875C1.54147 15.4688 2.92897 14.0625 4.62481 14.0625H10.7915V7.8125C10.7915 6.09375 12.179 4.6875 13.8748 4.6875C15.5706 4.6875 16.9581 6.09375 16.9581 7.8125V14.0625H23.1248C24.8206 14.0625 26.2081 15.4688 26.2081 17.1875C26.2081 18.9062 24.8206 20.3125 23.1248 20.3125H16.9581V26.5625C16.9581 28.2812 15.5706 29.6875 13.8748 29.6875ZM33.6143 40.625C35.2666 37.7244 38.3203 35.9375 41.625 35.9375C44.9297 35.9375 47.9834 37.7244 49.6357 40.625C51.2881 43.5257 51.2881 47.0994 49.6357 50C47.9834 52.9007 44.9297 54.6875 41.625 54.6875C38.3203 54.6875 35.2666 52.9007 33.6143 50C31.9619 47.0994 31.9619 43.5257 33.6143 40.625ZM66.2915 20.3125H56.5173L52.694 16.0938C51.5531 14.8125 49.8881 14.0625 48.1615 14.0625H28.4281C28.9523 15 29.2915 16.0312 29.2915 17.1875C29.2915 20.625 26.5165 23.4375 23.1248 23.4375H20.0415V26.5625C20.0415 30 17.2665 32.8125 13.8748 32.8125C12.734 32.8125 11.7165 32.4688 10.7915 31.9375V64.0625C10.7915 67.5 13.5665 70.3125 16.9581 70.3125H66.2915C69.6831 70.3125 72.4581 67.5 72.4581 64.0625V26.5625C72.4581 23.125 69.6831 20.3125 66.2915 20.3125ZM26.2079 45.3125C26.2079 53.9375 33.1146 60.9375 41.6246 60.9375C50.1346 60.9375 57.0413 53.9375 57.0413 45.3125C57.0413 36.6875 50.1346 29.6875 41.6246 29.6875C33.1146 29.6875 26.2079 36.6875 26.2079 45.3125Z"
                fill="white"
              />
            </svg>
          </label>
        </div>
        <div className={s.inputs}>
          <span>
            <label>Name</label>
            <input
              type="text"
              {...register("name")}
              required
              autoComplete="off"
            />
          </span>
          <span>
            <label>Position</label>
            <Select
              options={selectPositions}
              {...register("position")}
              onChange={handlePositionSelect}
              defaultValue={
                selectPositions.filter(
                  (p) => p.value === playerInfo.position
                )[0]
              }
              styles={customSelect}
            />
          </span>
          <span>
            <label>Team</label>
            <Select
              options={teams}
              {...register("team")}
              onChange={handleTeamSelect}
              styles={customSelect}
            />
          </span>
          <span className={s.doubleInput}>
            <span>
              <label>Height (cm)</label>
              <input
                type="number"
                {...register("height")}
                required
                autoComplete="off"
              />
            </span>
            <span>
              <label>Weight</label>
              <input
                type="number"
                {...register("weight")}
                required
                autoComplete="off"
              />
            </span>
          </span>
          <span className={s.doubleInput}>
            <span>
              <label>Birthday</label>
              <input
                type="date"
                {...register("birthday")}
                required
                style={{ maxWidth: "360px", width: "100%" }}
              />
            </span>
            <span>
              <label>Number</label>
              <input
                type="number"
                {...register("number")}
                required
                autoComplete="off"
              />
            </span>
          </span>
          <div className={s.buttons}>
            <button
              className={`${s.button} ${s.cancel}`}
              onClick={() => navigate("/teams")}
            >
              Cancel
            </button>
            <button className={`${s.button} ${s.save}`}>Save</button>
          </div>
        </div>
      </form>
    </div>
  );
}
