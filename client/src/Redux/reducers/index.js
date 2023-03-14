import { GET_COUNTRIES, GET_ACTIVITIES, FILTER_BY_CONTINENT, FILTER_BY_ACTIVITY, ORDER_BY_NAME, ORDER_BY_POPULATION, CREATE_ACTIVITY, GET_BY_NAME, GET_COUNTRY_DETAIL} from '../action-types';


const initialState = {
    countries: [],
    countryDetail:[],
    allCountries: [],
    countriesByContinent: [],
    activities: []
};

export default function rootReducer (state = initialState, action){
    switch (action.type){
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload,
                countriesByContinent: action.payload
            };

        case GET_COUNTRY_DETAIL:
            return {
                ...state,
                countryDetail: action.payload
            };

        case GET_BY_NAME:
            return {
                ...state,
                countries:action.payload
            };
        
        case GET_ACTIVITIES:
            return {
                ...state,
                activities:action.payload
            };
        
        case CREATE_ACTIVITY:
            return{
                ...state
            };

        case FILTER_BY_CONTINENT:
            ///que no acumule
            const countr = state.allCountries;
            // console.log(countr);

            const countriesFilteredByContinent = action.continent === 'All' ? countr : countr.filter (c => c.continent === action.continent);
            // console.log(countriesFilteredByContinent)
            return {
                ...state,
                countriesByContinent: countriesFilteredByContinent,
                countries: countriesFilteredByContinent
            };

        case FILTER_BY_ACTIVITY:
            //Tomo el estado para que no me filtre sobre filtrado
            const countriesToFilter = state.countriesByContinent;
            const countriesFilteredByActivity =  action.activity === 'All' ? countriesToFilter : countriesToFilter.filter ((c) =>{return c.activities.some((a) => a.name === action.activity)});
            // console.log(countriesFilteredByActivity)
            return{
                ...state,
                countries: countriesFilteredByActivity
            };

        case ORDER_BY_NAME:
            let sortedList = action.order === 'country_asc' ? 
            state.countries.sort(function(a, b) {
                if (a.name > b.name){
                    return 1;
                }
                if (b.name > a.name){
                    return -1
                }
                return 0;
            }) : 
            state.countries.sort (function (a, b) {
                if (a.name > b.name){
                    return -1;
                }
                if (b.name > a.name){
                    return 1;
                }
                return 0;
            })
            return{
                ...state,
                countries: sortedList
            };

            case ORDER_BY_POPULATION:
                let sortedCountries = action.order === 'population_asc' ? state.countries.sort(function (a, b){
                    if (a.population > b.population){
                        return 1;
                    }
                    if (b.population > a.population) {
                        return -1
                    }
                    return 0;
                }) :
                state.countries.sort(function(a, b){
                    if (a.population > b.population){
                        return -1
                    }
                    if (b.population > a.population) {
                        return 1
                    }
                    return 0;
                })
                return {
                    ...state,
                    countries: sortedCountries
                };

        default: 
        return {...state};
    };

    
};