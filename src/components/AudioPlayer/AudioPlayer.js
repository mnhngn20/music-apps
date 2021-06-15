import React, {useEffect, useState, useRef} from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import { getTimeCodeFromNum } from '../../shared/Ultility'
import classes from './AudioPlayer.module.css';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import Modal from '../../UI/Modal/Modal';
import TimeSlider from '../../UI/TimeSlider/TimeSlider';
import VolumeSlider from '../../UI/VolumeSlider/VolumeSlider';
const AudioPlayer = ({ isPlaying, playingTrack, isLoading, onClickButton, onPlayAudio, onStopAudio, isMute, onMute, volume, onAdjustVolume, playlistSearch, onStream }) => {
    const [audio, setAudio] = useState();
    const [timeLenght, setTimeLength] = useState("0:00");
    const [currentTime, setCurrentTime] = useState("0:00");
    // const [isInPlaylist, setIsInPlaylist] = useState(false);
    const [loadedAudio, setLoadedAudio] = useState(false);
    const [progess, setProgess] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(()=>{
        if(audio){
            audio.volume = volume;
        }
    }, [volume])

    useEffect(()=>{
        if(isPlaying){
            onStopAudio()
            audio.pause()
            audio.currentTime = 0;
        }
        if(playingTrack && !isLoading){
            setAudio(null);
            if(playingTrack.url){
                const loadAudio = new Audio(playingTrack.url);
                setAudio(loadAudio);   
                setLoadedAudio(true);
            } else {
                setAudio(null)
                setShowModal(true);
                setCurrentTime("0:00");
                setProgess(0);
                setTimeLength("0:00");

            }
        }
    },[playingTrack, isLoading, onStopAudio])

    useEffect(()=>{
        if(audio){
            audio.addEventListener("loadedmetadata",() => {
                setTimeLength(getTimeCodeFromNum(audio.duration));
                onPlayAudio();
                audio.volume = volume;
                audio.play();
            })
            audio.addEventListener("timeupdate",()=>{
                setCurrentTime(getTimeCodeFromNum(audio.currentTime));
                setProgess(progessHandle(audio.currentTime, audio.duration))
            })
            audio.onended = () => {
                onStopAudio()
                setCurrentTime("0:00");
                setProgess(0);
            }
        }
    },[loadedAudio, audio, onPlayAudio, onStopAudio]);

    const progessHandle = (time, duration) => {
        return time * 100 / duration;
    }

    const adjustVolume = (e, newValue) => {
        if(loadedAudio){
            onAdjustVolume(newValue/100);
        }
    }   

    const adjustCurrentTime = (event, newValue) => {
        if(loadedAudio && audio) {
            setCurrentTime(getTimeCodeFromNum(newValue * audio.duration / 100));
            audio.currentTime = newValue * audio.duration / 100;
            setProgess(newValue);
        }
    }

    const handlePausePlayClick = () => {
        if(audio){
            if (isPlaying) {
            audio.pause();
            } else {
            audio.play();
            }
            onClickButton()
        }
    };

    const muteHandler = () => {
        if(isMute){
            audio.muted = false;
        } else audio.muted = true;
        onMute();
    }

    let artists = '';
    let name = '';
    if(!isLoading && playingTrack){
        if(playingTrack.url){
            for(let key in playingTrack.artists){
                artists += playingTrack.artists[key].name + ', ';
            }
            artists = artists.slice(0,artists.length -2)
            name = playingTrack.name;
        } else name = 'No song is playing';
    }

    const getTrackPosition = (playlist, track) => {
        for(let key in playlist){
            if(playlist[key].id === track.id){
                return key;
            }
        }
        return -1;
    }

    const skipTrack = (playlist, track, next) => {
        if(playlist.length > 0){
            let position = getTrackPosition(playlist, track);
            if(next){
                if(position < playlist.length - 1){
                    position++;
                    onStream(playlist[position].id)
                }
            } else {
                if(position > 0){
                    position--;
                    onStream(playlist[position].id)
                }
            }
        }
    }

    return (
        <div className={classes.audioPlayer}>
            {<Modal 
                show={showModal} 
                modalClose={()=>{setShowModal(!showModal)}}
                modalType= "no preview">
                <p>This track has no preview playback</p>
            </Modal>}
            <div className={classes.audioPlayer__name}>
                {!isLoading && playingTrack 
                ? <div><p className= {classes.audioPlayer__name__song}>{name}</p><p className = {classes.audioPlayer__name__artists}>{artists}</p></div>
                :<p className= {classes.audioPlayer__name__song}>No song is playing</p>}
            </div>
            <div className={classes.audioPlayer__timeline}>
                <p>{currentTime}</p>
                <TimeSlider 
                    value={progess} 
                    changed={adjustCurrentTime}/>
                <p>{timeLenght}</p>
            </div>
            <div className={classes.audioPlayer__controls}>
                <div onClick={() => skipTrack(playlistSearch, playingTrack, false)}>
                    <SkipPreviousIcon 
                        style={{width: "30px", height: "30px"}} 
                        className={classes.audioPlayer__controls__btn}/>
                </div>
                <div onClick={() => handlePausePlayClick()}>{isPlaying ? <PauseIcon style={{width: "50px", height: "50px"}} className={classes.audioPlayer__controls__btn_play} /> : <PlayArrowIcon style={{width: "50px", height: "50px"}} className={classes.audioPlayer__controls__btn_play}/>}</div>
                <div onClick={() => skipTrack(playlistSearch, playingTrack, true)}>
                    <SkipNextIcon 
                        style={{width: "30px", height: "30px"}} 
                        className={classes.audioPlayer__controls__btn}/>
                </div>
            </div>
            <div className={classes.audioPlayer__volume}>
                <div 
                    className={classes.audioPlayer__volume__slider}>
                        <VolumeSlider 
                            value={volume*100}
                            changed={adjustVolume}/>
                </div>
                <div className={classes.audioPlayer__volume_mute}>
                    {
                        isMute ? <VolumeOffIcon onClick={() => muteHandler()} className={classes.audioPlayer__volume_btn}/>
                        : <VolumeUpIcon onClick={() => muteHandler()} className={classes.audioPlayer__volume_btn}/>
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
       isPlaying: state.streamState.isPlaying,
       playingTrack: state.streamState.playingTrack,
       isLoading: state.streamState.loading,
       isMute: state.streamState.isMute,
       volume: state.streamState.volume,
       playlistSearch: state.streamState.playListSearch,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClickButton: () => dispatch(actions.playOrPauseAudio()),
        onPlayAudio: () => dispatch(actions.playAudio()),
        onStopAudio: () => dispatch(actions.stopAudio()),
        onMute: () => dispatch(actions.mute()),
        onAdjustVolume: (volume) => dispatch(actions.adjustVolume(volume)),
        onStream: (songId) => dispatch(actions.stream(songId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer);

