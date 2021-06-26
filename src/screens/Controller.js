import React, { useState, useEffect } from 'react';
import Home from './home/Home';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Details from './details/Details';
import BookShow from './bookshow/BookShow';
import Confirmation from './confirmation/Confirmation';
export default function Controller() {
    const [moviesList, setMoviesList] = useState([]);
    const dispatch = useDispatch();
    async function loadData() {
        try {
            const rawResponse = await fetch("http://localhost:8085/api/v1/movies");
            const data = await rawResponse.json();
            const releasedMovies = data.movies.filter((upmovies) => upmovies.status === "RELEASED")
            if (rawResponse.ok) {
                dispatch({ "type": "SET_MOVIES", payload: data.movies })
                dispatch({ "type": "SET_RELEASED_MOVIES", payload: releasedMovies })
                setMoviesList(data);
            }

            else {
                const error = new Error();
                error.message = 'Did not fecth movie data';
                throw error;
            }
        } catch (e) {
            alert(`Error: ${e.message}`);
        }

    }

    async function getGenre() {
        try {
            const rawResponse = await fetch("http://localhost:8085/api/v1/genres");
            const data = await rawResponse.json();
            if (rawResponse.ok) {
                dispatch({ "type": "SET_GENRES", payload: data.genres })
            }
            else {
                const error = new Error();
                error.message = 'Did not fecth genre data';
                throw error;
            }
        } catch (e) {
            alert(`Error: ${e.message}`);
        }
    }

    async function getArtist() {
        try {
            const rawResponse = await fetch("http://localhost:8085/api/v1/artists");
            const data = await rawResponse.json();
            if (rawResponse.ok) {
                dispatch({ "type": "SET_ARTIST", payload: data.artists })
            }
            else {
                const error = new Error();
                error.message = 'Did not fecth artist data';
                throw error;
            }
        } catch (e) {
            alert(`Error: ${e.message}`);
        }
    }

    async function movieDetail(movieId) {
        try {
            const rawResponse = await fetch("http://localhost:8085/api/v1/movies/" + movieId);
            const data = await rawResponse.json();
            if (rawResponse.ok) {
                dispatch({ "type": "SET_MOVIE_DETAILS", payload: data });
                dispatch({ "type": "SET_MOVIE_ID", payload: movieId })
            }
            else {
                const error = new Error();
                error.message = 'Did not fecth movie data';
                throw error;
            }
        }
        catch (e) {
            alert(`Error: ${e.message}`);
        }

    }

    useEffect(() => {
        loadData();
        getGenre();
        getArtist();
    }, []);

    return (
        <div>
            <Router>
                <Route exact path="/" render={(props) => <Home {...props} movieDetail={movieDetail} />} />
                <Route exact path='/movie/:id' render={() => <Details />} />
                <Route exact path='/bookshow/:id' render={() => <BookShow />} />
                <Route exact path='/confirm/:id' render={() => <Confirmation />} />
            </Router>
        </div>
    )
}