import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries, getTypes } from '../store/actions/index';
import CountryCard from "./CountryCard";
import SearchCountry from "./SearchCountry";
import ActContOrder from "./ActContOrder";
import Order from "./order";
import Spinner from './Spiner';
import styles from './CountryCards.module.css';
import axios from "axios";

const ITEMS_PAGE = 9
const ITEMS_PAGE_N = 10

export default  function CountryCards(props) {
    const dispatch = useDispatch()//hook que proporciona la librería React Redux es useDispatch el cual devuelve una función que podremos emplear para enviar acciones a la store de Redux. ... js mucho más limpio y que no necesita de connect para acceder a la store de Redux.
    const countries = useSelector((state)=> state.filteredCountries)//useSelector es un Hook que nos permite extraer datos del store de Redux utilizando una función selectora, ésta debe ser pura ya que es potencialmente invocada múltiples veces. ... Con respecto a useDispatch, no tiene ningún misterio, retorna la función dispatch del almacén de Redux con la cual se pueden emitir acciones.
    const otro = useSelector((state)=> state.otro)

    const [isLoading, setIsLoading] = useState(true);
    const [cargado, setCargado] = useState(null);
    const [current, setCurrent] = useState(0);

    useEffect( () => {//hook que recibe como parámetro una función que se ejecutará cada vez que nuestro componente se renderice, ya sea por un cambio de estado, por recibir props nuevas o, y esto es importante, porque es la primera vez que se monta.
        setIsLoading(true);
        axios.get(`http://localhost:3001/api/country/`).then(data => {
            setIsLoading(false);
            setCargado(data);
        });
        dispatch(fetchCountries()) //función despachadora (o simplemente función dispatch) es una función que acepta una acción o una acción asíncrona; entonces puede o no despachar una o más acciones al store.
        dispatch(getTypes())
        
        
    }, [])
    
    if (isLoading){
        return <Spinner/>;
    }
    if(!cargado){
        return null;//para que cuando se recargue no se rompa
    }
    
    const nextHandler = () =>{
        const next = current + 1;               // 1*10:10,2*10:20,3*10:30,4*10:40,5*10:50,... , 25*10:250
        const firstIndex = next * ITEMS_PAGE_N; //1 * 9: 9, 2 * 9:18, 3 * 9: 27, 4 * 9: 36,... 11*9:99, 12 * 9:108
        if(firstIndex >= countries.length )return;
        setCurrent(next);
    }

    const nextBox = (c) =>{
        const next = c;
        const firstIndex = next * ITEMS_PAGE_N;
        if(countries.length < 10)return
        if(firstIndex >= countries.length )return; 
        setCurrent(next);
    }

    const prevHandler = () =>{
        const prev = current - 1;
        if(prev < 0)return;
        setCurrent(prev);
    }
    
    return (<div className={styles.contein}>

        <div className={styles.div1}>
            <button className={styles.order} onClick={prevHandler}>Prev</button>
            <Order/>
            <SearchCountry/>
            <ActContOrder  setCurrent={setCurrent}/>
            <button className={styles.order} onClick={nextHandler}>Next</button>  
        </div>

        <ul id ='country' className={otro === 'Oceania'?styles.erik : otro ===  'Asia'? styles.asia: otro ===  'Antarctic'? styles.antarctic :  otro ===  'Africa'? styles.africa :  otro ===  'Europe'? styles.europe :  otro ===  'America'? styles.america : styles.country} >

            {current === 0 ?
                [...countries].splice(current*ITEMS_PAGE, ITEMS_PAGE).map((c) => {  
                    return( <CountryCard  id={c.id} name ={c.name} image={c.image} continent={c.continent} /> )
                }): [...countries].splice(current*ITEMS_PAGE_N, ITEMS_PAGE_N).map((c) => {  
                        return( <CountryCard  id={c.id} name ={c.name} image={c.image} continent={c.continent} /> )
                    })
            }
        </ul>

        <button className={styles.order} onClick={prevHandler}>Prev</button>
        <input className={styles.order1} type="button" value={current +1} onClick={() =>nextBox(current) } />
        <input className={styles.order} type="button" value={current +2} onClick={() =>nextBox(current +1)} />
        <input className={styles.order} type="button" value={current +3} onClick={() =>nextBox(current +2)} />
        <button className={styles.order} onClick={nextHandler}>Next</button>

    </div>)

}