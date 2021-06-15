import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import * as actions from '../../store/actions/index';
import classes from './Track.module.css';
import { getTimeCodeFromNum, checkIsPlaying, convertArtistNames } from '../../shared/Ultility'
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';

const Track = props => {
    const { playingTrack, isPlaying, onStream} = props;
    const trackId = props.match.params.id;
    const [trackIsPlaying, setTrackIsPlaying] = useState(false);
    const [track, setTrack] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [showInfo, setShowInfo] = useState(false)
    useEffect(()=>{
        setLoading(true)
        const options = {
            method: 'GET',
            url: `https://api.spotify.com/v1/tracks/${trackId}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('SpotifyToken')}`
            }
        };
        axios.request(options).then(response => {
            let artists = [];
            for(let key in response.data.artists){
                let artist = {
                    name: response.data.artists[key].name,
                    id: response.data.artists[key].id,
                    type: response.data.artists[key].type,
                    externalUrlsSpotify: response.data.artists[key].external_urls.spotify
                }
                artists.push(artist)
            }
            console.log(response.data)
            const dataReceive = {  
                name: response.data.name, 
                artists: artists,
                url: response.data.preview_url,
                id: response.data.id,
                duration: response.data.duration_ms,
                externalUrlsSpotify: response.data.external_urls.spotify,
                popularity: response.data.popularity,
                album: {
                    id: response.data.album.id,
                    name: response.data.album.name,
                    releaseDate: response.data.album.release_date,
                    totalTracks: response.data.album.total_tracks,
                    type: response.data.album.type,
                    externalUrlsSpotify: response.data.album.external_urls.spotify,
                    image: response.data.album.images[0].url,
                },
            }
            setLoading(false);
            setTrack(dataReceive);
            console.log("aaa")
        }).catch(function (error) {
            console.log(error)
            setError(error);
        });
    }, [trackId]);

    useEffect(()=>{
        if(track && playingTrack){
            console.log(trackIsPlaying)
            setTrackIsPlaying(checkIsPlaying(track.id, playingTrack.id));
        }
    }, [track, playingTrack]);
    let artists = [];
    let artistNames = '';
    if(!loading && track){
        for(let key in track.artists){
            if(key == track.artists.length - 1) artists.push(<a key={track.artists[key].id} href={'/artists/'+ track.artists[key].id}>{track.artists[key].name}</a>);
            else artists.push(<a key={track.artists[key].id} href={'/artists/'+ track.artists[key].id}>{track.artists[key].name + ", "}</a>);
        }
        artistNames = convertArtistNames(track.artists)
    }

    const playPreview = (id) => {
        onStream(id);
    }
    return (
        <div className={classes.track}>
            {
                loading || !track
                ? <Spinner />
                : <div className={classes.track__main}>
                    <img className={classes.track__img} src={track.album.image} atl="photo" />
                    <p className={classes.track__name}>{track.name + " - " + artistNames}</p>
                    { 
                        <Button buttonType={trackIsPlaying ? "playing" : "playPreview"} clicked={() => playPreview(trackId)}>
                            {trackIsPlaying ? "STREAMING" : "PLAY PREVIEW"}
                        </Button>
                    }
                    <table>
                        <tr>
                            <th><p>Song name:</p></th>
                            <td><p>{track.name}</p></td>
                        </tr>
                        <tr>
                            <th><p>Artists:</p></th>
                            <td><p>{artists}</p></td>
                        </tr>
                        <tr>
                            <th><p>Duration:</p></th>
                            <td><p>{getTimeCodeFromNum(track.duration/1000)}</p></td>
                        </tr>
                        <tr>
                            <th><p>Album:</p></th>
                            <td><p>{track.album.name}</p></td>
                        </tr>
                        <tr>
                            <th><p>Album Release Date:</p></th>
                            <td><p>{track.album.releaseDate}</p></td>
                        </tr>
                        <tr>
                            <th><p>Album Total Tracks:</p></th>
                            <td><p>{track.album.totalTracks}</p></td>
                        </tr>
                        <tr>
                            <th><p>See Album on Spotify:</p></th>
                            <td><p><a href={track.album.externalUrlsSpotify}>Spotify</a></p></td>
                        </tr>
                    </table>
                </div>
            }
        </div>
    )
}

const mapState = state =>(
    {
        isPlaying: state.streamState.isPlaying,
        playingTrack: state.streamState.playingTrack,
        playlistSearch: state.streamState.playListSearch
    }
)

const mapDispatch = dispatch => (
    {
        onClickButton: () => dispatch(actions.playOrPauseAudio()),
        onStream: (id) => dispatch(actions.stream(id))
    }
)

export default connect(mapState, mapDispatch)(Track);