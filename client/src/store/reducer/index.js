import { FETCH_COUNTRY, SEARCH_FETCH_COUNTRY, SORT } from '../actions'
import {ASCENDENTE} from '../../constants/sort'
const initialState = {
    countries: [],
    filteredCountries:[],
    filteredActivities: [],
    types: [],
    otro: []

}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_COUNTRY:
            return {
                ...state,
                countries: action.payload,
                filteredCountries: action.payload
            }
        case SEARCH_FETCH_COUNTRY:
            return {
                ...state,
                countries: action.payload,
                filteredCountries: action.payload
            }

        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload,
            };

        case 'FILTER_BY_TYPES':
            let allCountry = state.countries;
            var a
            let filterTypes =
                action.payload === 'all'
                    ? allCountry
                    : allCountry.filter((r) => r.continent.toLowerCase().includes(action.payload.toLowerCase()));
                    console.log(action.payload.toLowerCase());
                    a = action.payload
                    console.log(a)
            return { ...state, filteredCountries: filterTypes,filteredActivities: filterTypes, otro:a };
        
        case 'FILTER_BY_ID':
            let allCountr = state.filteredCountries;
            let allCount = state.filteredActivities;
            allCount.length === 0?allCount = allCountr : console.log('condicion de actividades false')
            let all = state.countries;
            let filterType = [];
            let buscar = action.payload === 'all'
                    ? allCount
                    : allCountr.filter((r) => r.types.filter( t => t.id.includes(action.payload)? filterType.push(r):console.log(allCountr))  );//.map( t => t.id === action.payload)
                    console.log(action.payload);
                    console.log(filterType)
                    filterType.length === 0? filterType = allCount : console.log(filterType) ;

            return { ...state, filteredCountries: filterType, filteredActivities: allCount};

        case SORT:
            let orderedCountries = [...state.filteredCountries]//let orderedRecipes = [...state.recipes]
            console.log(...state.filteredCountries)
            orderedCountries = orderedCountries.sort((a, b) => {
                if (a.name < b.name ) {
                    return action.payload === ASCENDENTE ? -1 : 1;
                }
                if (a.name > b.name ) {
                    return action.payload === ASCENDENTE ? 1 : -1;
                }
                return 0;
            })
            if (action.payload === 'population-asc') {
                orderedCountries = orderedCountries.sort( (a, b) => {
                    if (a.population > b.population) {
                        return -1;
                    }
                    if (a.population < b.population) {
                        return 1;
                    }
                    return 0;
                })
            }
            if (action.payload === 'population-des') {
                orderedCountries = orderedCountries.sort((a, b)=> {
                    if (a.population > b.population) {
                        return 1;
                    }
                    if (a.population < b.population) {
                        return -1;
                    }
                    return 0;
                })
            }
            return{
                ...state,
                filteredCountries: orderedCountries
            }
            
        default: return state
    }
}