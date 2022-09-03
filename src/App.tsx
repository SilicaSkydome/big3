import React, { useEffect, useState } from 'react';
import Layout from './common/Router/Layout'
import { Routes, Route, useNavigate} from "react-router-dom";
import TeamList from './modules/teams/TeamList';
import Players from './modules/players/PlayerList';
import NotFound from './common/components/NotFound/NotFound';
import SignIn from './common/components/SignIn/SignIn';
import SignUp from './common/components/SignUp/SignUp';
import { fetchValues } from './common/components/types/types';
import { post } from './api/baseRequest';
import { setCredentials } from './core/redux/reducers/authSlice';
import { useDispatch } from 'react-redux';

function App() {
  let [token, setToken] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let userData: any = window.localStorage.getItem('userData'); 
    userData = JSON.parse(userData);
    if(userData){
      const autoAuth = post('/Auth/SignIn', JSON.stringify(userData)).then((data: fetchValues) => {
        if(data.token){
            setToken(data.token);
        }
        navigate('/teams');
        let response = { name: data.name, avatarUrl: data.avatarUrl, token: data.token };
        
        dispatch(setCredentials(response));
    });
    }
  }, []);

  if(!token){
    return(
      <Routes>
        <Route path='/signin' element={<SignIn setToken={setToken} />} />
        <Route path='/signup' element={<SignUp setToken={setToken} />} />
      </Routes>
    )
  }
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='teams' element={<TeamList />}/>
          <Route path='players' element={<Players />}/>
        </Route>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </>
  );
}

export default App;
