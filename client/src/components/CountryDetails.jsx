import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import Spinner from "./Spiner"
import styles from './CountryDetails.module.css'

export default function CountryDetails(){
    const [isLoading, setIsLoading] = useState(true);//estado inicial true
    const [country, setCountry] = useState(null)

    let {id} = useParams()//useParams devuelve un objeto de pares clave / valor de parámetros de URL. Úselo para acceder match.paramsa la corriente <Route>.

    useEffect(() => {
        setIsLoading(true);
        axios.get('http://localhost:3001/api/country/' + id)
        .then((response) => {
            setIsLoading(false);
            setCountry(response.data)
        })
        
        // return () => {
        //     setCountry(null)
        // }// cleanup, si trabajan con redux
    }, [])

    if (isLoading){
        return <Spinner/>;
    }

    if(!country){
        return null;//para que cuando se recargue no se rompa
    }

    return <div className={styles.detailsContainer}>
        {       
            <>
                <img className={`${styles.colum}  ${styles.countryimg}`} src={country.image} alt="imagen" />
                <div className={`${styles.colum} ${styles.countryDetails}`}>
                    <p><strong>Country: </strong>{" "}{country.name}</p>
                    <p><strong>Country code: </strong>{" "}{country.id}</p>
                    <p><strong>Continent:</strong>{" "}{country.continent}</p>
                    <p><strong>Capital:</strong>{" "}{country.capital}</p>
                    <p><strong>Subregion:</strong>{" "}{country.subregion}</p>
                    <p><strong>Area: </strong>{" "}{country.area}  km2</p>
                    <p><strong>population of </strong>{" "}{country.population}{" "} people</p>
                    
                    <div className={styles.container} >
                        <p><strong>Activities</strong>{" "}</p>
                        {console.log(country)}
                        {Array.isArray(country.types) ?
                        country.types.map((t) => <div className={styles.dContainer} ><div className={styles.interno} >{( " Activity " + t.name) }</div> <div className={styles.interno}>{(" Season: " + t.season) }</div> <div className={styles.interno}>{ ( `duration   ${t.duration}  Horas, `) + (` difficulty:   ${t.difficulty}`)}</div></div>) :
                        country.types.map(t => t.name)}
                    </div>
                </div>
            </> 
        }
    </div>
}