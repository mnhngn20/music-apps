import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {Switch, Route, Redirect} from 'react-router';

import Layout from './hoc/Layout/Layout';
import UserProfile from './components/UserProfile/UserProfile';
import Track from './components/Track/Track';

let route = (
  <Switch>
      <Route path = '/tracks/:id' component={Track} />
      <Route path = '/' component={UserProfile}/>
      <Redirect to = '/'/>
  </Switch>
)

const App = props => {
  useEffect(()=> {
    if(!localStorage.getItem('SpotifyToken')){
      const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
      const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
      if(accessTokenMatch && expiresInMatch){
          const expiresIn = Number(expiresInMatch[1]);
          window.setTimeout(() => {localStorage.removeItem('SpotifyToken'); window.location="/"}, expiresIn*1000);
          window.history.pushState('Access Token', null, '/');
          localStorage.setItem('SpotifyToken', accessTokenMatch[1])
      } else {
          const clientId = "612bccd38a7f4bb1aafb601450644da5";
          const redirectUri = "http://localhost:3000/";
          window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}`
      }
    } else {
      const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
      if(accessTokenMatch){
        if(localStorage.getItem('SpotifyToken') !== accessTokenMatch[1]){
          window.history.pushState('Access Token', null, '/');
          localStorage.setItem('SpotifyToken',accessTokenMatch[1])
        }    
      }
    } 
  }, [])
  return (
      <Layout>
        {route}
      </Layout>
  )
}

export default withRouter(App);