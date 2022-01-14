import axios from 'axios'
export const FETCH_COUNTRY = 'FETCH_COUNTRY'
export const SEARCH_FETCH_COUNTRY = 'SEARCH_FETCH_COUNTRY'
export const SORT = 'SORT'
export const SORTD = 'SORTD'

export function fetchCountries(){
    return  function(dispatch) {
        axios.get('http://localhost:3001/api/country') 
         
        .then((c) => {
            dispatch({
                type: FETCH_COUNTRY,
                payload: c.data
            })
        })

        .catch((error) => {
            console.error(error)
        })

    }

    
    // return async function(dispatch) {
        //     var eso = await axios.get('http://localhost:3001/api/country')
        //     return dispatch({
            //         type: 'FETCH_COUNTRY',
            //         payload: eso.data
            //     })
            
            //}
            
            
}

export function searchCountries(search){
    return function(dispatch) {
        axios.get('http://localhost:3001/api/Country?name=' + search)
        .then((c) => {
            dispatch({
                type: SEARCH_FETCH_COUNTRY,
                payload: c.data 
            })
        })
        .catch((error) => {
            console.error(error)
        })
    }
}

export function getTypes() {
	return async function (dispatch) {
		const types = await axios.get('http://localhost:3001/api/types');
		dispatch({
			type: 'GET_TYPES',
			payload: types.data,
		});
	};
}
export function filterByContinent(payload) {
	return async function (dispatch) {
		dispatch({
			type: 'FILTER_BY_TYPES',
			payload,
		});
	};
}
export function filterById(payload) {
	return async function (dispatch) {
		dispatch({
			type: 'FILTER_BY_ID',
			payload,
		});
	};
}

export function sort(order){
    return {
        type: SORT,
        payload: order
    }
}

