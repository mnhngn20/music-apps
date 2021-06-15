import React from 'react';
import { connect } from 'react-redux';

import classes from './SearchItem.module.css';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import * as actions from '../../../../store/actions/index';
import PauseIcon from '@material-ui/icons/Pause';
import HeadsetIcon from '@material-ui/icons/Headset';
import { convertArtistNames } from '../../../../shared/Ultility'

const SearchItem = props => {
    const {isPlaying, playingTrack, onStream} = props;
    let view = '';
    let cal = props.result.view;
    if(props.result.view < 1000){
        view = cal;
    } else if (props.result.view >= 1000 && props.result.view <= 1000000){
        cal /= 1000;
        view = cal.toFixed(1) + 'k';
    } else if (props.result.view > 1000000){
        cal /= 1000000;
        view = cal.toFixed(1) + 'M';
    }


    const checkIsPlaying = (songId, playSongId) => {
        if(songId === playSongId) return true;
        else return false; 
    }

    const fetchAudio = () => {
        onStream(props.result.id);
    }

    return (
        <div className={classes.itemContainer}>
            <div className={classes.searchItem} onBlur={props.blur}>
                <div className={classes.searchItem__info}>
                    <p className={classes.searchItem__title} >{props.result.name}</p>
                    <p className={classes.searchItem__artist}>{convertArtistNames(props.result.artists)}</p>
                    <div className={classes.searchItem__info__bottom}> 
                        <div className={classes.searchItem__info__bottom__vp}>
                            <p className={classes.searchItem__info__bottom__view}>{view}</p>
                            {
                                playingTrack && checkIsPlaying(props.result.id, playingTrack.id) && isPlaying
                                    ?  <PauseIcon 
                                            style={{width: "10px", height: "10px"}}
                                            className={classes.searchItem__info__bottom__playicon}/> 
                                    : <PlayArrowIcon 
                                            style={{width: "10px", height: "10px"}}
                                            className={classes.searchItem__info__bottom__playicon}/>
                            }
                        </div>
                        <HeadsetIcon onClick={() => fetchAudio()} 
                            style={{height: '20px', width: '20px', color: isPlaying && checkIsPlaying(props.result.id, playingTrack.id) ? 'var(--color4)' : 'black'}} />
                    </div>
                </div>
                <div>
                    <img src={props.result.img} alt={props.result.name}/>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isPlaying: state.streamState.isPlaying,
        playingTrack: state.streamState.playingTrack
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onStream: (songId) => dispatch(actions.stream(songId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchItem);