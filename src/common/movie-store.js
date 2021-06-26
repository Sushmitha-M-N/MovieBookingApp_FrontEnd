import { createStore } from "redux";

const initialState= {
    "movieslist":[],
    "releaselist":[],
    "moviedetails":[],
    "statevalue": true,
    "movieID" : '',
    "genreList" : [],
    "artistList" : [],
}

function movielistReducer(state=initialState,action){
    switch(action.type){
        case "SET_MOVIES" :
            return {...state, "movieslist":action.payload}
        case "SET_RELEASED_MOVIES" :
            return {...state, "releaselist":action.payload}
        case "SET_MOVIE_DETAILS" :
            return {...state, "moviedetails":action.payload}
        case "SET_STATE" :
            return {...state, "statevalue":action.payload} 
        case "SET_MOVIE_ID" :
            return {...state, "movieID" : action.payload}
        case "SET_GENRES" :
             return {...state, "genreList":action.payload}
        case "SET_ARTIST" :
            return {...state, "artistList" : action.payload}
        default :
            return state;
    }
    
    
}

export default createStore(movielistReducer);