import { useDispatch } from 'react-redux'
import {ASCENDENTE, DESCENDENTE} from '../constants/sort'
import { sort } from '../store/actions'
import styles from './CountryCards.module.css';

export default function Order(){

    const dispatch = useDispatch();
    
    function onSelectChange(e){
        dispatch(sort(e.target.value));
    } 
    
    return <select className={styles.order} name ='select' onChange={onSelectChange}>
        <option value={ASCENDENTE}>Ascendant</option>
        <option value={DESCENDENTE}>Descendent</option>
        <option value={'population-asc'}>population  max</option>
		<option value={'population-des'}>population  min</option>
    </select>
}