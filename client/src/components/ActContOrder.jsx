import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import {filterByContinent, fetchCountries, getTypes, filterById} from '../store/actions/index'
import styles from './CountryCards.module.css'

export default function ActContOrder({setCurrent}) {
    var arr = [ 'Africa','America','Antarctic','Asia','Europe','Oceania'  ]
    const types = useSelector((state) => state.types);
    const dispatch = useDispatch();

    function handleFilterContinent(e) {
		e.preventDefault();
		dispatch(filterByContinent(e.target.value));
        setCurrent(0);

	}

    function handleFilterActivity(e) {
		e.preventDefault();
		dispatch(filterById(e.target.value));
        setCurrent(0);
	}

    useEffect(() => {
		dispatch(fetchCountries());
		dispatch(getTypes());
	}, [dispatch]);

    return <div>
        <select className={styles.order}  name ='select' onChange={(e) => handleFilterContinent(e)}>
            <option value='all'>All Continent</option>
            {arr?.map((type) => {
                return (
                    <option
                        value={`${type}`}
                    >{`${type}`}</option>
                );
            })}
        </select>
        <select className={styles.order}  name ='select' onChange={(e) => handleFilterActivity(e)}>
            <option value='all'>All Activities</option>
            {types?.map((type) => {
                return (
                    <option
                        value={`${type.id}`}
                    >{`${type.name}`}</option>
                );
            })}
        </select>
    </div>

}