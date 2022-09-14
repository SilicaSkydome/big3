import React, { useEffect, useState } from "react";
import Layout from "./common/Router/Layout";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import TeamList from "./modules/teams/TeamList";
import Players from "./modules/players/PlayerList";
import NotFound from "./common/components/NotFound/NotFound";
import SignIn from "./common/components/SignIn/SignIn";
import SignUp from "./common/components/SignUp/SignUp";
import { fetchValues } from "./common/components/types/types";
import { post } from "./api/baseRequest";
import { setCredentials } from "./core/redux/reducers/authSlice";
import { useDispatch } from "react-redux";
import AddTeam from "./modules/teams/AddTeam/AddTeam";
import TeamInfo from "./modules/teams/TeamInfo/TeamInfo";
import AddPlayer from "./modules/players/AddPlayer/AddPlayer";

function App() {
  let [token, setToken] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clearData = { name: "", avatarUrl: "", token: "" };
  const [teamNames, setTeamNames] = useState<{ name: string; id: number }[]>(
    []
  );
  const handleLogOut = () => {
    dispatch(setCredentials(clearData));
    setToken("");
    navigate("/signin");
    window.localStorage.removeItem("userData");
  };

  useEffect(() => {
    let userData: any = window.localStorage.getItem("userData");
    userData = JSON.parse(userData);
    if (userData) {
      post("/Auth/SignIn", JSON.stringify(userData)).then(
        (data: fetchValues) => {
          if (data.token) {
            setToken(data.token);
          }
          navigate("/teams");
          let response = {
            name: data.name,
            avatarUrl: data.avatarUrl,
            token: data.token,
          };

          dispatch(setCredentials(response));
        }
      );
    }
  }, []);

  if (!token) {
    return (
      <Routes>
        <Route path="/signin" element={<SignIn setToken={setToken} />} />
        <Route path="/signup" element={<SignUp setToken={setToken} />} />
        <Route path="/*" element={<Navigate to="/signin" />} />
      </Routes>
    );
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout handleLogOut={handleLogOut} />}>
          <Route
            path="teams"
            element={<TeamList setTeamNames={setTeamNames} />}
          />
          <Route path="teams/:id" element={<TeamInfo />} />
          <Route path="teams/AddTeam" element={<AddTeam />} />
          <Route path="players" element={<Players teamNames={teamNames} />} />
          <Route
            path="players/AddPlayer"
            element={<AddPlayer teamNames={teamNames} />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
