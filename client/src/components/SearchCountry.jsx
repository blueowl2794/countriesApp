import { useDispatch } from 'react-redux';
import {  useState } from 'react';
import { searchCountries } from '../store/actions';
import { Link } from 'react-router-dom';
import styles from './SearchCountry.module.css'

export default function SearchCountry(){

    const [search, setSearch] = useState('')
    const dispatch = useDispatch();
    
    function onSubmit(e){
        e.preventDefault()
        var id = document.getElementById('search')
        id.value = ''
        dispatch(searchCountries(search))
    }

    function onInputChange(e){
        e.preventDefault()
        setSearch(e.target.value)
    }

    return <div>
        <form onSubmit={onSubmit}>
            <input id = 'search' type="text" onChange={onInputChange} name = "texto" />
            <input className={styles.but} type="submit" value="Search" />
        </form>
        <div className={styles.div} > <Link to ='/api/country/create'>Add Activity</Link></div>
    </div>
   
}