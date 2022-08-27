import React from 'react';
import Layout from './common/Router/Layout'
import { Routes, Route} from "react-router-dom";
import TeamList from './modules/teams/TeamList';
import Players from './modules/players/PlayerList';
import NotFound from './common/components/NotFound/NotFound';
import SignIn from './common/components/SignIn/SignIn';
import SignUp from './common/components/SignUp/SignUp';

function App() {
  return (
    <>
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/' element={<Layout/>}>
          <Route path='teams' element={<TeamList />}/>
          <Route path='players' element={<Players />}/>
        </Route>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </>
  );
}

export default App;
