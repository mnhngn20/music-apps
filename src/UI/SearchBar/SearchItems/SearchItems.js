import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import classes from './SearchItems.module.css';
import axios from 'axios';
import SearchItem from './SearchItem/SearchItem';
import * as actions from '../../../store/actions/index';

const SearchItems = props => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const {query, onUpdateSearchPlaylist} = props;
    const searchRef = useRef()
    let items = null;

    useEffect(() => {
        console.log(searchRef)
        setLoading(true);
        const options = {
        method: 'GET',
        url: 'https://api.spotify.com/v1/search',
        params: {q: query, 
            type: "track",
            limit: 10
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('SpotifyToken')}`
        }
        };
        axios.request(options).then(res=> {
            let result = null;
            let results = [];
            for(let key in res.data.tracks.items){
                result = {
                    id: res.data.tracks.items[key].id,
                    name: res.data.tracks.items[key].name,
                    img: res.data.tracks.items[key].album.images[0].url,
                    artists: res.data.tracks.items[key].artists,
                    view: res.data.tracks.items[key].duration_ms,
                    audioUrl: res.data.tracks.items[key].preview_url,
                };
                results.push(result);
            }
            onUpdateSearchPlaylist(results)
            setResults(results)
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            console.log(err);
        });
    }, [query, onUpdateSearchPlaylist])
    if(loading){
        items = <p>Loading</p>
    }
    items = results.map(result => {
        return  <Link key={result.id} to={`/tracks/${result.id}`}>
                    <SearchItem  result={result} blur={props.blur}/>
                </Link>
    })

    return (
        <div 
            ref = {searchRef}
            className={classes.searchItems} 
            onBlur={props.blur}>
            {items}
        </div>
    )
}

const mapDispatch = dispatch => {
    return {
        onUpdateSearchPlaylist: (playlist) => dispatch(actions.updatePlaylistSearch(playlist))
    }
}

export default connect(null, mapDispatch)(SearchItems);