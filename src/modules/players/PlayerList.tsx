import React, { ChangeEvent, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select, { MultiValue, SingleValue } from "react-select";
import { get } from "../../api/baseRequest";
import { RootState } from "../../core/redux";
import IPlayerCard, { IPlayer, ISelectOption } from "./Interfaces/Interfaces";
import NoContent from "./NoContent";
import PlayerCard from "./playerCard/PlayerCard";
import s from "./PlayerList.module.css";

interface playerProps {
  teamNames: { name: string; id: number }[];
}

export default function PlayerList({ teamNames }: playerProps) {
  const navigate = useNavigate();
  const cardAmount = [
    { value: 6, label: 6 },
    { value: 12, label: 12 },
    { value: 24, label: 24 },
  ];
  const teams = teamNames.map((t) => {
    return { value: t.id, label: t.name };
  });
  const pageStyle = {
    control: (base: any) => ({
      ...base,
      border: 0,
      boxShadow: "none",
    }),
  };
  const teamStyle = {
    control: (base: any) => ({
      ...base,
      border: 0,
      boxShadow: "none",
    }),
  };
  const token: string = useSelector<RootState, string>(
    (state) => state.authReducer.token
  );
  const [selectedOption, setSelectedOption] = useState<
    SingleValue<ISelectOption>
  >({ value: 6, label: 6 });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const [players, setPlayers] = useState<IPlayerCard[]>([]);
  const [teamTags, setTeamTags] = useState<number[]>([]);

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    searchHandler(e.target.value, teamTags);
  };
  const teamTagsHandler = (e: MultiValue<{ value: number; label: string }>) => {
    const tags = e.map((t) => t.value);
    setTeamTags(tags);
    searchHandler(search, tags);
  };
  const searchHandler = (search: string, teams: number[]) => {
    if (search === "" && teams.length === 0) {
      let pageSize: number = selectedOption!.value;
      getData(page, pageSize);
    }
    if (search !== "" && teams.length === 0) {
      setSearch(search);
      let pageSize: number = selectedOption!.value;
      getData(page, pageSize, search);
    }
    if (search === "" && teams.length !== 0) {
      let pageSize: number = selectedOption!.value;
      getData(page, pageSize, "", teams);
    }
    if (search !== "" && teams.length > 0) {
      let pageSize: number = selectedOption!.value;
      getData(page, pageSize, search, teams);
    }
  };

  const pageSizeHandler = (selectedOption: SingleValue<ISelectOption>) => {
    setSelectedOption(selectedOption);
  };
  const addHandler = () => {
    navigate("/players/AddPlayer");
  };
  const handlePageClick = (e: { selected: number }) => {
    setPage(e.selected + 1);
  };
  const playersToCards = (players: IPlayer[]): IPlayerCard[] => {
    return players.map((p): IPlayerCard => {
      let team = teamNames.filter((t) => t.id === p.team);
      return {
        name: p.name,
        number: p.number,
        team: team[0].name,
        imageUrl: p.avatarUrl,
        id: p.id,
      };
    });
  };
  const getData = async (
    page: number,
    pageSize: number,
    name?: string,
    teams?: number[]
  ) => {
    let playerFetch;
    if (!name && !teams) {
      playerFetch = await get(
        `/Player/GetPlayers?Page=${page}&PageSize=${pageSize}`,
        token
      );
    }
    if (name && !teams) {
      playerFetch = await get(
        `/Player/GetPlayers?Page=${page}&PageSize=${pageSize}&Name=${name}`,
        token
      );
    }
    if (!name && teams) {
      playerFetch = await get(
        `/Player/GetPlayers?Page=${page}&PageSize=${pageSize}${teams
          .map((t) => {
            return `&TeamIds=${t}`;
          })
          .join("")}`,
        token
      );
    }
    if (name && teams) {
      playerFetch = await get(
        `/Player/GetPlayers?Page=${page}&PageSize=${pageSize}&Name=${name}${teams
          .map((t) => {
            return `&TeamIds=${t}`;
          })
          .join("")}`,
        token
      );
    }
    let playerList: IPlayer[] = playerFetch.data;
    let cards = playersToCards(playerList);
    setPlayers(cards);
  };
  useEffect(() => {
    let pageSize: number = selectedOption!.value;
    getData(page, pageSize);
  }, [selectedOption, page]);
  useEffect(() => {
    let pageSize: number = selectedOption!.value;
    getData(page, pageSize);
  }, []);

  return (
    <>
      <div className={s.flex}>
        <span className={s.search}>
          <input
            id="search"
            type="text"
            className={s.searchInput}
            placeholder="Search..."
            value={search}
            onChange={inputHandler}
          />
          <Select
            onChange={teamTagsHandler}
            defaultValue={[]}
            isMulti
            // @ts-ignore
            options={teams}
            menuPlacement="bottom"
            styles={teamStyle}
            className={s.select}
          />
        </span>
        <button className={s.add} onClick={addHandler}>
          Add +
        </button>
      </div>

      <div className={s.content}>
        {players.length ? (
          players.map((card) => <PlayerCard cardInfo={card} key={card.id} />)
        ) : (
          <div className={s.noContent}>
            <NoContent />
            <h2>Empty here</h2>
            <p>Add new teams to continue</p>
          </div>
        )}
      </div>
      <span className={s.pageOptions}>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={15}
          marginPagesDisplayed={4}
          onPageChange={handlePageClick}
          containerClassName={s.pagination}
          pageClassName={s.page}
          pageLinkClassName={s.pageLink}
          previousClassName={s.page}
          previousLinkClassName={s.pageLink}
          nextClassName={s.page}
          nextLinkClassName={s.pageLink}
          activeClassName={s.pageActive}
          activeLinkClassName={s.pageActiveLink}
        />
        <span className={s.cardAmount}>
          <Select
            onChange={pageSizeHandler}
            defaultValue={{ value: 6, label: 6 }}
            options={cardAmount}
            menuPlacement="top"
            styles={pageStyle}
          />
        </span>
      </span>
    </>
  );
}
