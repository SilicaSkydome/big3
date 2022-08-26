import React from 'react';
import Layout from './common/Router/Layout'
import { Routes, Route} from "react-router-dom";
import TeamList from './modules/teams/TeamList';
import Players from './modules/players/Players';
import NotFound from './common/components/NotFound/NotFound';

function App() {
  return (
    <>
      <Routes>
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
