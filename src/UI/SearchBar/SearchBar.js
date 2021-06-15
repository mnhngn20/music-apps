import React, {useState, useEffect, useRef} from 'react';

import classes from './SearchBar.module.css';
import SearchItems from './SearchItems/SearchItems';
import SearchIcon from '@material-ui/icons/Search';

const SearchBar = props => {
    const [input, setInput] = useState ('');
    const [searchQuery, setSearchQuery] = useState('');
    const queryRef = useRef()
    const [showItems, setShowItems] = useState(false);
    const [showSearchInput, setShowSearchInput] = useState(false);
    
    useEffect(()=>{
        const timer = setTimeout(() => {
            if(input === queryRef.current.value){
                setSearchQuery(queryRef.current.value)
            }
        }, 500)
        return () => {
            clearTimeout(timer);
        }
    }, [input, queryRef])

    const onChangeHandler = event => {
        setInput(event.target.value)
    }
    let inputClasses = [classes.inputBar__search, classes.inputBar__search_hide];
    if(showSearchInput) inputClasses = [classes.inputBar__search, classes.inputBar__search_show];
    let searchBarClasses = [classes.inputBar, classes.inputBar_hide];
    if(showSearchInput) searchBarClasses = [classes.inputBar, classes.inputBar_show];
    let itemsClasses = [classes.inputBar__items, classes.inputBar__items_hide];
    if(showSearchInput) itemsClasses = [classes.inputBar__items, classes.inputBar__items_show];
    return (
        <div className={classes.searchBar} onMouseLeave = {()=>{setShowItems(false)}}>
            <div className = {searchBarClasses.join(' ')}>
                <input 
                    onFocus = {() => {setShowItems(true)}}
                    className = {inputClasses.join(' ')}
                    placeholder = "Search"
                    ref = {queryRef}
                    type="text" 
                    onChange={(event) => onChangeHandler(event)} 
                    value = {input}/>
                <span 
                    className={classes.inputBar__icon__container} 
                    onClick={()=> {setShowSearchInput(!showSearchInput)}}>
                        <i><SearchIcon className={classes.inputBar__icon} /></i>
                </span>
            </div>
            <div className={itemsClasses.join(' ')}>
                {searchQuery ==='' || !showItems  ? null : <SearchItems query={searchQuery} />}
            </div>
        </div>
    )
}

export default SearchBar;