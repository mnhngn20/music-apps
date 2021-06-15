import axios from 'axios';
import * as actionTypes from './actionTypes';

export const streamSuccess = (playingTrack) => {
    return {
        type: actionTypes.STREAM_SUCCESS,
        playingTrack: playingTrack
    }
}

export const streamStart = () => {
    return {
        type: actionTypes.STREAM_START
    }
}

export const streamFail = (error) => {
    return {
        type: actionTypes.STREAM_FAIL,
        error: error
    }
}

export const stream = trackId => {
    return dispatch => {
        dispatch(streamStart())
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
                }
                artists.push(artist)
            }
            const dataReceive = {  
                name: response.data.name, 
                artists: artists,
                url: response.data.preview_url,
                id: response.data.id,
            }
            dispatch(streamSuccess(dataReceive));
            if(dataReceive.url) dispatch(playAudio());
        }).catch(function (error) {
            dispatch(streamFail(error))
        });
    }
}

export const playOrPauseAudio = () => {
    return {
        type: actionTypes.PLAY_OR_PAUSE_AUDIO,
    }
}
export const playAudio = () => {
    return {
        type: actionTypes.PLAY_AUDIO
    }
}

export const stopAudio = () => {
    return {
        type: actionTypes.STOP_AUDIO
    }
}

export const mute = () => {
    return {
        type: actionTypes.MUTE
    }
}

export const adjustVolume = (volume) => {
    return {
        type: actionTypes.ADJUST_VOLUME,
        volume: volume
    }
}

export const updatePlaylistSearch = (playlist) => {
    return{
        type: actionTypes.UPDATE_PLAYLIST_SEARCH,
        playlist: playlist
    }
}