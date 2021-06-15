import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/Ultility';

const initialState = {
    loading: false,
    error: null,
    isPlaying: false,
    isMute: false,
    volume: 0.75,
    playListSearch: [],
    playingTrack: null
}

const streamStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
}

const streamSuccess = (state, action) => {
    return updateObject(state, {
        playingTrack: action.playingTrack,
        error: null,
        loading: false
    });
}

const streamFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
}

const playOrPauseAudio = (state, action) => {
    return updateObject(state, {
        isPlaying: !state.isPlaying
    });
}

const playAudio = (state, action) => {
    return updateObject(state, {
        isPlaying: true
    });
}

const stopAudio = (state, action) => {
    return updateObject(state, {
        isPlaying: false
    })
}

const mute = (state, action) => {
    return updateObject(state, {
        isMute: !state.isMute
    })
}

const adjustVolume = (state, action) => {
    return updateObject(state, {
        volume: action.volume
    })
}

const updatePlaylistSearch = (state, action) => {
    return updateObject(state, {
        playListSearch: action.playlist
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.STREAM_FAIL: return streamFail(state, action);
        case actionTypes.STREAM_SUCCESS: return streamSuccess(state, action);
        case actionTypes.STREAM_START: return streamStart(state, action);
        case actionTypes.PLAY_OR_PAUSE_AUDIO: return playOrPauseAudio(state, action);
        case actionTypes.PLAY_AUDIO: return playAudio(state, action);
        case actionTypes.STOP_AUDIO: return stopAudio(state, action);
        case actionTypes.MUTE: return mute(state, action);
        case actionTypes.ADJUST_VOLUME: return adjustVolume(state, action);
        case actionTypes.UPDATE_PLAYLIST_SEARCH: return updatePlaylistSearch(state, action);
        default: return state;
    }
}

export default reducer;