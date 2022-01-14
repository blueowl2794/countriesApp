import { Link } from "react-router-dom";
import styles from './CountryCard.module.css'

export default function CountryCard({id, name, image, continent}){
    return (
        <Link to = {`/api/country/${id}`}>
            <li  className={styles.country}>
            
                <img width={350} 
                    height ={250}  
                    className={styles.imgCard}  
                    src={image} alt="images" />
                <h2>Country: {name}</h2>
                
                <h2>Continent: {continent}</h2>
                    
            </li>
        </Link>
    )
}