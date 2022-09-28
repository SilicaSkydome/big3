import React, { ChangeEvent, useEffect, useState } from "react";
import s from "./TeamList.module.css";
import Select, { SingleValue } from "react-select";
import TeamCard from "./teamCard/TeamCard";
import { ITeamCard, ISelectOption, ITeam } from "./Interfaces/Interfaces";
import { get } from "../../api/baseRequest";
import { useSelector } from "react-redux";
import { RootState } from "../../core/redux";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import NoContent from "./NoContent";

interface teamProps {
  setTeamNames: Function;
}

export default function TeamList({ setTeamNames }: teamProps) {
  const navigate = useNavigate();
  const cardAmount = [
    { value: 6, label: 6 },
    { value: 12, label: 12 },
    { value: 24, label: 24 },
  ];
  const style = {
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
  const [teams, setTeams] = useState<ITeamCard[]>([]);

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      let pageSize: number = selectedOption!.value;
      getData(page, pageSize);
      return;
    }
    let pageSize: number = selectedOption!.value;
    getData(page, pageSize, e.target.value);
  };
  const pageSizeHandler = (selectedOption: SingleValue<ISelectOption>) => {
    setSelectedOption(selectedOption);
  };
  const addHandler = () => {
    navigate("/teams/AddTeam");
  };
  const handlePageClick = (e: { selected: number }) => {
    setPage(e.selected + 1);
  };
  const teamsToCards = (teams: ITeam[]): ITeamCard[] => {
    let teamcards = teams.map((team): ITeamCard => {
      return {
        name: team.name,
        foundationYear: team.foundationYear,
        imageUrl: team.imageUrl,
        id: team.id,
      };
    });
    return teamcards;
  };
  const getData = async (page: number, pageSize: number, name?: string) => {
    let teamFetch;
    if (!name) {
      teamFetch = await get(
        `/Team/GetTeams?Page=${page}&PageSize=${pageSize}`,
        token
      );
    } else {
      teamFetch = await get(
        `/Team/GetTeams?Page=${page}&PageSize=${pageSize}&Name=${name}`,
        token
      );
    }
    let teamList: ITeam[] = teamFetch.data;
    let cards = teamsToCards(teamList);
    setTeamNames(
      teamList.map((t) => {
        return { name: t.name, id: t.id };
      })
    );
    setTeams(cards);
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
            type="text"
            className={s.searchInput}
            placeholder="Search..."
            value={search}
            onChange={searchHandler}
          />
        </span>
        <button className={s.add} onClick={addHandler}>
          Add +
        </button>
      </div>

      <div className={s.content}>
        {teams.length ? (
          teams.map((card) => <TeamCard cardInfo={card} key={card.id} />)
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
          pageCount={5}
          marginPagesDisplayed={2}
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
            styles={style}
          />
        </span>
      </span>
    </>
  );
}
