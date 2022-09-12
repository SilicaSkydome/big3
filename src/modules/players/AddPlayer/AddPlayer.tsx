import React, { useRef } from "react";
import s from "./AddPlayer.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { IPlayerFormData } from "../Interfaces/Interfaces";
import { post } from "../../../api/baseRequest";
import { RootState } from "../../../core/redux";
import { useSelector } from "react-redux";
import Select from "react-select";

export default function AddTeam() {
  const customSelect = {
    container: (base: any) => ({
      ...base,
      width: 360,
    }),
    control: (base: any) => ({
      ...base,
    }),
  };
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IPlayerFormData>();
  const selectPositions: { value: string; label: string }[] = [
    { label: "Center Forward", value: "Center Forward" },
    { label: "Guard Forward", value: "Guard Forward" },
    { label: "Forward", value: "Forward" },
    { label: "Center", value: "Center" },
    { label: "Guard", value: "Guard" },
  ];
  const imgData = new FormData();
  const token: string = useSelector<RootState, string>(
    (state) => state.authReducer.token
  );
  const imageLabel = useRef<HTMLLabelElement>(null);
  const onSubmit: SubmitHandler<IPlayerFormData> = async (e) => {
    // let imgUrl: string;
    // let teamData;
    // await post("/Image/SaveImage", imgData, token)
    //   .then((response: string): void => {
    //     imgUrl = response;
    //   })
    //   .then(() => {
    //     teamData = {
    //       name: e.name,
    //       foundationYear: e.year,
    //       division: e.division,
    //       conference: e.conference,
    //       imageUrl: imgUrl,
    //     };
    //   });
    // await post("/Team/Add", JSON.stringify(teamData), token);
    // navigate("/teams");
  };
  const handlePositionSelect = () => {};
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

  return (
    <div className={s.container}>
      <div className={s.header}>
        <p>
          <Link to="/teams">Teams</Link> /{" "}
          <Link to="/teams/AddTeam">Add new team</Link>
        </p>
      </div>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.image}>
          <input
            type="file"
            {...register("image")}
            id="file"
            accept="image/*"
            required
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
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              {...register("name")}
              id="Name"
              required
              autoComplete="off"
            />
          </span>
          <span>
            <label htmlFor="Position">Position</label>
            <Select
              options={selectPositions}
              defaultValue={selectPositions[0]}
              {...register("position")}
              id="Position"
              onChange={handlePositionSelect}
              styles={customSelect}
            />
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
