import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './Details.css';
import YouTube from 'react-youtube';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import HeaderDetails from '../../common/detailsheader/HeaderDetails';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    typographyStyle: {
        marginLeft: 24,
        marginTop: 8,
        marginBottom:0,
        height: 24,
        '&:hover': {
            cursor: "pointer",
        }
    },
    title: {
        fontWeight: 400,
    },
    imageStyle: {
        marginLeft: 24,
        maxWidth: 200,
        maxHeight: 400,
    },
    margin: {
        marginTop: 16,
        fontFamily: "arial"
    },
    colorStyle: {
        color: "primary",
    },
    youTubeStyle: {
        maxHeight: 300,
        marginBottom: 70,
    },
    artistStyle: {
        marginTop: 16,
        marginBottom: 16,
    },

}));

export default function Details() {

    const classes = useStyles();
    const history = useHistory();
    const movieDetailsList = useSelector(state => state.moviedetails)
    const statevalue = useSelector(state => state.statevalue);
    const genre = movieDetailsList.genres;
    const artistsDetails = movieDetailsList.artists;
    var genrelist = '';
    for (let index = 0; index < genre.length; index++) {
        genrelist += genre[index] + ", ";
    }
    var genreList = genrelist.slice(0, -2);
    const date = movieDetailsList.release_date;
    var dateobj = new Date(date);
    const releasedate = dateobj.toDateString();
    const youtubeLink = movieDetailsList.trailer_url;
    const youtubetrailer = youtubeLink.split("=");
    const videoID = youtubetrailer[1];
    const backbutton = "<Back to Home";
    const onBackButtonClickHandler = (e) => {
        history.push("/");
    }
    const [flag1, setFlag1] = useState(true);
    const [flag2, setFlag2] = useState(true);
    const [flag3, setFlag3] = useState(true);
    const [flag4, setFlag4] = useState(true);
    const [flag5, setFlag5] = useState(true);
    const onClickStarHandler1 = (e) => {
        setFlag1(!flag1)
    }
    const onClickStarHandler2 = (e) => {
        setFlag2(!flag2)
    }
    const onClickStarHandler3 = (e) => {
        setFlag3(!flag3)
    }
    const onClickStarHandler4 = (e) => {
        setFlag4(!flag4)
    }
    const onClickStarHandler5 = (e) => {
        setFlag5(!flag5)
    }

    function fullName(firstName, lastName) {
        return firstName + " " + lastName;
    }

    return (
        <div>
            <HeaderDetails />
            <div className="custom-back-btn">
                <Typography className={classes.typographyStyle} variant="button" onClick={onBackButtonClickHandler}>{backbutton}</Typography>
            </div>
            <div className="details-page-container">
                <div className="movie-poster-url">
                    <img className={classes.imageStyle} src={movieDetailsList.poster_url} />
                </div>
                <div className="movie-middle-part">
                    <Typography className={classes.title} variant="headline" component="h2">{movieDetailsList.title}</Typography>
                    <Typography><b>Genre: </b>{genreList}</Typography>
                    <Typography><b>Duration: </b>{movieDetailsList.duration}</Typography>
                    <Typography><b>Release Date: </b>{releasedate}</Typography>
                    <Typography><b>Rating: </b>{movieDetailsList.rating}</Typography>
                    <Typography className={classes.margin}><b>Plot: </b><a href={movieDetailsList.wiki_url} target="_blank">(Wiki Link)</a>{movieDetailsList.storyline}</Typography>
                    <Typography className={classes.margin}><b>Trailer:</b></Typography>
                    <YouTube className={classes.youTubeStyle} videoId={videoID} />
                </div>
                <div className="artist-details-part">
                    <Typography><b>Rate this movie: </b></Typography>
                    <StarBorderIcon onClick={onClickStarHandler1} variant="outlined" style={{ color: flag1 ? "inherit" : "#ffeb3b" }} />
                    <StarBorderIcon onClick={onClickStarHandler2} variant="outlined" style={{ color: flag2 ? "inherit" : "#ffeb3b" }} />
                    <StarBorderIcon onClick={onClickStarHandler3} variant="outlined" style={{ color: flag3 ? "inherit" : "#ffeb3b" }} />
                    <StarBorderIcon onClick={onClickStarHandler4} variant="outlined" style={{ color: flag4 ? "inherit" : "#ffeb3b" }} />
                    <StarBorderIcon onClick={onClickStarHandler5} variant="outlined" style={{ color: flag5 ? "inherit" : "#ffeb3b" }} />
                    <Typography className={classes.artistStyle} ><b>Artists: </b></Typography>
                    <div className={classes.root}>
                        <GridList cols={2}>
                            {artistsDetails.map((tile) => (
                                <GridListTile key={tile.profile_url}>
                                    <img src={tile.profile_url} alt={tile.first_name} />
                                    <GridListTileBar
                                        title={fullName(tile.first_name, tile.last_name)}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>

                </div>
            </div>
        </div>
    )
}
