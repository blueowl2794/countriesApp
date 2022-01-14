import axios from 'axios'
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { getTypes } from '../store/actions/index';
import styles from './ActivCreate.module.css';
import { useNavigate } from "react-router-dom";

export function validate(input) {
  
    let errors = {};
    
    if(!input.name ){
        errors.name = "required field"
    }
    if (!input.difficulty ) {
      errors.difficulty = 'required field';
    } 
    if (!input.duration) {
      errors.duration = 'Duration is required';
    } 
    if (input.season.length === 0) {
        errors.season = 'Season is required';
    }
    if (!input.types) {
        errors.types = 'Country is required';
    }
    return errors;
};

const ActivCreate = () =>{

    const [type, setType] = useState({
        name: '',
        duration:'',
        difficulty:"",
        season:[],
        types:[],
        
        
    });
    const [errors, setErrors] = useState({});
    const history = useNavigate();
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries);
    const country = useSelector((state) => state.filteredCountries);
    useEffect(() => {
		dispatch(getTypes());
	}, []);

    function onInputChange(e){
        e.preventDefault()
        setType( {
            ...type,
            [e.target.name]: e.target.value
        }) 
        setErrors(validate({
            ...type,
            [e.target.name]: e.target.value
          }));
    }

    function handleCheck(e) {
		if (e.target.checked) {
			type.season? setType({
				...type,
				[e.target.name]: [...type.season, e.target.value],
			}):setType({
				...type,
				[e.target.name]:  [...type.season, e.target.value],
			});
            setErrors(validate({
                ...type,
                [e.target.name]: [...type.season, e.target.value],
              }));
		}
		if (!e.target.checked) {
			type.season?setType({
				...type,
				[e.target.name]: type.season.filter((type) => type !== e.target.value),
			}):  setType({
				...type,
				[e.target.name]: '',
			});
            type.season.length < 2 ? setErrors(validate({
                ...type, 
                [e.target.name]: '',
            })) : setErrors(validate({
                ...type, 
                [e.target.name]: e.target.value,
              }));
		}
	}

    function handleCheckCoun(e) {
		if (e.target.checked) {
			type.types?setType({
				...type,
				[e.target.name]: [...type.types, e.target.value]
            }) : setType({
                ...type,
                [e.target.name]:  [...type.types, e.target.value],
            });
                setErrors(validate({
                ...type,
                [e.target.name]: [...type.types, e.target.value],
              }));
		}
		if (!e.target.checked) {
			type.types?setType({
				...type,
				[e.target.name]: type.types.filter((type) => type !== e.target.value),
			}) : setType({
				...type,
				[e.target.name]: '',
			});
            type.types < 2? setErrors(validate({
                ...type,
                [e.target.name]: '',
                
              })): setErrors(validate({
                ...type, 
                [e.target.name]: e.target.value,
              })) 
		}
	}

    function onSubmit(e){
        e.preventDefault()
        errors.name || errors.difficulty || errors.duration || errors.season? alert(`fields in red are needed`) :
        type.types.length > 0?  axios.post('http://localhost:3001/api/types', type)
        .then(() => {
            setTimeout(() => {
                history("/api/country");
              }, 500)
            alert("added tourist activity" );
        }): alert("At least 1 country is needed")
    }

    var arr = ['Verano', 'Otoño', 'Invierno', 'Primavera']

    return (
        <div className={styles.contenedor}>
            <div className={styles.subContenedor}>
                
                <form onSubmit = {onSubmit} className={styles.form} >
                    <div>
                        <label htmlFor="" >name<br/> </label>
                        <input  className={errors.name && 'danger'} 
                            onChange={onInputChange} 
                            name="name" 
                            type="text" 
                            value={type.name}/> {'Turistico'}
                        {errors.name && (
                            <p className="danger">{errors.name}</p>
                        )}{!errors.name && <p> </p>}

                        <label htmlFor="" >duration<br/> </label>
                        <input  className={errors.duration && 'danger'} 
                            onChange={onInputChange} 
                            name="duration" 
                            type="number" 
                            min = {1}
                            value={type.duration}/> {'en horas'}
                        {errors.duration && (
                            <p className="danger">{errors.duration}</p>
                        )}{!errors.duration && <p> </p>}
                    </div>
                    <div>
                        <label htmlFor="" >difficulty<br/> </label>
                        <input className={errors.difficulty && 'danger'} 
                            onChange={onInputChange} 
                            name="difficulty" 
                            type="range" 
                            min = {0}
                            max = {5}
                            value={type.difficulty}/> {'de 1 a 5'}
                        {errors.difficulty && (
                            <p className="danger">{errors.difficulty}</p>
                        )}{!errors.difficulty && <p> </p>}
                    </div>
                    <div>
                        <label htmlFor="" >season<br/> </label>
                        <div id="inSeason">
                            { arr.map((c) => {
                                return  <label >
                                    <input
                                        id="season"
                                        className={errors.season && 'danger'} 
                                        onChange={e => handleCheck(e)} 
                                        type='checkbox'
                                        name='season'
                                        value={c}
                                    />
                                    {c}
                                </label>
                                
                            })
                            }
                            {errors.season && (
                            <p className="danger">{errors.season}</p>
                        )}{!errors.season && <p> </p>}
                        </div>
                    </div>
                    <input className = {styles.btn}  type="submit" value="Send"/>
                </form>
                
                <div className = {styles.lista}>
                    {'Paises en los que se puede realizar esta actividad: '}
                    <div>
                    {
                        countries.length > 0 ?    
                            countries.map((c) => {
                                                return (
                                                    <label >
                                                        <input
                                                            className={errors.types && 'danger'} 
                                                            onChange={e => handleCheckCoun(e)} 
                                                            type='checkbox'
                                                            name='types'
                                                            value={c.id}
                                                        />
                                                        {c.name}
                                                    </label>
                                                );
                                            }) : console.log( country)
                        }
                        {errors.types && (
                                    <p className="danger">{errors.types}</p>
                                )}{!errors.types && <p> </p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivCreate;