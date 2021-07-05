import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.css';
import Header from '../../common/header/Header';
import { Button, TextField, Typography, FormControl, InputLabel, Input, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { useSelector, useDispatch } from "react-redux";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    formControl: {
        minWidth: 240,
        maxWidth: 240,
        margin: theme.spacing.unit,
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

export default function Home(props) {
    const moviesList = useSelector(state => state.movieslist);
    const releaseList = useSelector(state => state.releaselist);
    const genrelist = useSelector(state => state.genreList);
    const artistlist = useSelector(state => state.artistList);
    const movieId = useSelector(state => state.movieID);
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [movie, setMovie] = useState("");
    const [genres, setGenres] = useState([]);
    const [artists, setArtists] = useState([]);
    const [releaseStartDate, setReleaseStartDate] = useState("");
    const [releaseEndDate, setReleaseEndDate] = useState("");
    const movieClickHandler = (movieId) => {
        props.movieDetail(movieId);
        setTimeout(() => {
            history.push("/movie/" + movieId);
        }, 1000);
    }

    function releaseDate(releasedate) {
        var dateobj = new Date(releasedate);
        return dateobj.toDateString();
    }
    const movieSelectHandler = (event) => {
        setMovie(event.target.value)
    }
    const genreSelectHandler = (event) => {
        setGenres(event.target.value)
    }
    const artistSelectHandler = (event) => {
        setArtists(event.target.value)
    }
    const releaseDateStartHandler = (event) => {
        setReleaseStartDate(event.target.value);
    }
    const releaseDateEndHandler = (event) => {
        setReleaseEndDate(event.target.value);
    }
    const filterApplyHandler = () => {
        let queryString = "?status=RELEASED";
        if (movie !== "") {
            queryString += "&title=" + movie;
        }
        if (genres.length > 0) {
            queryString += "&genres=" + genres.toString();
        }
        if (artists.length > 0) {
            queryString += "&artists=" + artists.toString();
        }
        if (releaseStartDate !== "") {
            queryString += "&start_date=" + releaseStartDate;
        }
        if (releaseEndDate !== "") {
            queryString += "&end_date=" + releaseEndDate;
        }
        let dataFilter = null;
        let xhrFilter = new XMLHttpRequest();
        xhrFilter.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                let data = JSON.parse(this.responseText);
                dispatch({ "type": "SET_RELEASED_MOVIES", payload: data.movies })
            }
        });
        xhrFilter.open("GET", "http://localhost:8085/api/v1/movies" + encodeURI(queryString));
        xhrFilter.setRequestHeader("Cache-Control", "no-cache");
        xhrFilter.send(dataFilter)
    }

    return (
        <div>
            <Header />
            <div className="sub-heading">Upcoming Movies</div>
            <div className={classes.root}>
                <GridList cols={6} className={classes.gridList}>
                    {moviesList.map((tile) => (
                        <GridListTile key={tile.poster_url} cellHeight={250} >
                            <img src={tile.poster_url} alt={tile.title} />
                            <GridListTileBar
                                title={tile.title}
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>

            <div className="page-content">
                <div className="movies-listing">
                    <div className={classes.root}>
                        <GridList cols={4} cellHeight={350}>
                            {releaseList.map((tile) => (
                                <GridListTile key={tile.poster_url} className="released-movie-grid-item" >

                                    <img src={tile.poster_url} onClick={() => movieClickHandler(tile.id)} alt={tile.title} />
                                    <GridListTileBar
                                        title={tile.title}
                                        subtitle={<span>Release Date:{releaseDate(tile.release_date)}</span>}
                                    />
                                </GridListTile>
                            ))
                            }
                        </GridList>
                    </div>
                </div>
                <div className="movies-filtering">
                    <Card >
                        <CardContent>
                            <FormControl>
                                <Typography className={classes.title} color="textSecondary">
                                    FIND MOVIES BY:
                            </Typography>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="movie-name">Movie Name</InputLabel>
                                <Input id="movie-name" value={movie} onChange={movieSelectHandler}/>
                            </FormControl>
                            <br />
                            <FormControl className={classes.formControl} >
                                <InputLabel id="demo-mutiple-checkbox-label">Genres</InputLabel>
                                <Select labelId="demo-mutiple-checkbox-label"
                                    multiple
                                    input={<Input id="demo-mutiple-checkbox" />}
                                    value={genres}
                                    onChange={genreSelectHandler}
                                    renderValue={(selected) => selected.join(", ")}
                                >
                                    {genrelist.map((genre) => (
                                        <MenuItem key={genre.id} value={genre.genre}>
                                            <Checkbox checked={genres.indexOf(genre.genre) > -1}  color="primary"/>
                                            <ListItemText primary={genre.genre} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <br />
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-artist-multiple-checkbox">Artists</InputLabel>
                                <Select labelId="demo-artist-mutiple-checkbox"
                                    multiple
                                    input={<Input id="demo-artist-mutiple-checkbox"/>}
                                    value={artists}
                                    onChange={artistSelectHandler}
                                    renderValue={(selected) => selected.join(", ")}
                                >
                                    {
                                        artistlist.map((artist) => (
                                            <MenuItem
                                                key={artist.id}
                                                value={artist.first_name + " " + artist.last_name}
                                            >
                                                <Checkbox
                                                    checked={artists.indexOf(artist.first_name + " " + artist.last_name) > -1} color="primary" />
                                                <ListItemText primary={artist.first_name + " " + artist.last_name} />
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            <br />
                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="release-date-start"
                                    label="Release Date Start"
                                    type="date"
                                    defaultValue=""
                                    InputLabelProps={{ shrink: true }}
                                    onChange={releaseDateStartHandler}
                                />
                            </FormControl>
                            <br />
                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="release-date-end"
                                    label="Release Date End"
                                    type="date"
                                    defaultValue=""
                                    InputLabelProps={{ shrink: true }}
                                    onChange={releaseDateEndHandler}
                                />
                            </FormControl>
                            <br />
                            <FormControl className={classes.formControl}>
                                <Button variant="contained" color="primary" onClick={() => filterApplyHandler()}>
                                    APPLY
                                </Button>
                            </FormControl>
                        </CardContent>
                    </Card>
                </div>
            </div>


        </div>
    )
}