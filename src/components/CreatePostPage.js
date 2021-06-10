import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Paper,
    Grid,
    ButtonBase,
    Button,
    FormControl,
    Select,
    InputLabel,
    TextField,
    Chip,
    MenuItem,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from "@material-ui/core";

import MockAvatar from "../images/avatar.svg";
import ECoin from "../components/ECoin";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },


    paper: {
        width: "800px",
        padding: theme.spacing(5),
        marginBottom: theme.spacing(7),
        fontSize: 16,
        justifyContent: "center",
        alignItems: "center",

    },


    heading: {
        paddingLeft: theme.spacing(2),
        paddingTop: theme.spacing(1),
        fontSize: theme.typography.pxToRem(20),
        flexBasis: '30%',
        flexShrink: 0,
        fontWeight: "bold",
    },

    secondaryHeading: {

        paddingTop: theme.spacing(1),
        fontSize: theme.typography.pxToRem(18),
        color: theme.palette.text.secondary,
    },

    image: {
        width: 128,
        height: 128,
    },

    avatar: {
        margin: "auto",
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%",
    },

    buttons: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(3),
    },


    secondButton: {
        marginRight: theme.spacing(3),
    },

    formControl: {
        flexWrap: "wrap",
        minWidth: 180,

        marginRight: theme.spacing(2),
        justifyContent: "center",

    },


    box: {
        paddingLeft: theme.spacing(2),
        display: 'flex',
    },
    chips: {
        display: "flex",
        flexWrap: "wrap"
    },
    chip: {
        margin: 2
    },
}));

function CreatePostPage(props) {
    const classes = useStyles();

    const [gameName, setGameName] = React.useState("");
    const [gameServers, setgameServers] = React.useState([]);
    const [gamePlatforms, setGamePlatforms] = React.useState([]);

    const [price, setPrice] = React.useState(1);
    const [introduction, setIntroduction] = React.useState("");
    const [language, setLanguage] = React.useState([]);
    const [availableTime, setAvailableTime] = React.useState([]);



    //TODO: retrieve from DB game Schema

    const gamenames =
        [
            'a',
            'b',
            'c',
            'd',
            'e',
            'f',
            'g',
        ];

    const gameservers =
        [
            'aa',
            'b',
            'c',
            'd',
            'e',
            'f',
            'g',
        ];

    const gameplatforms =
        [
            'a',
            'b',
            'c',
            'd',
            'e',
            'f',
            'g',
        ];


    const languages =
        [
            'a',
            'b',
            'c',
            'd',
            'e',
            'f',
            'g',
        ];


    const availabletimes =
        [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
        ];


    function getStyles(gamename, gameName) {
        return {
            fontWeight:
                gameName.indexOf(gamename) === -1
                    ? Typography.fontWeightRegular
                    : Typography.fontWeightMedium,
        };
    }

    const handleChange = (event) => {
        setGameName(event.target.value);
    };

    const handleServersChange = (event) => {
        setgameServers(event.target.value);
    };

    const handlePlatformsChange = (event) => {
        setGamePlatforms(event.target.value);
    };


    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleAvailableTimeChange = (event) => {
        setAvailableTime(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleIntroductionChange = (event) => {
        setPrice(event.target.value);
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>

                <Grid container direction={"column"}>
                    <Accordion defaultExpanded={true} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}

                            id="panel-profile"
                        >

                            <Typography className={classes.heading}>Profile</Typography>
                            <Typography className={classes.secondaryHeading}>Your profile will be shown to the gamers.</Typography>

                        </AccordionSummary>
                        <AccordionDetails>

                            <Grid container spacing={4} className={classes.box}>

                                <Grid item>
                                    <ButtonBase className={classes.image}>
                                        <img className={classes.avatar} alt="avatar" src={MockAvatar} />
                                    </ButtonBase>
                                </Grid>
                                <Grid item xs container direction="column" spacing={3}>
                                    <Grid item>Username: {props.user.username}</Grid>
                                    <Grid item>
                                        Age: {props.user.age}

                                    </Grid>
                                    <Grid item>
                                        Gender: {props.user.gender}

                                    </Grid>

                                </Grid>


                            </Grid>

                        </AccordionDetails>
                    </Accordion>

                    <Accordion defaultExpanded={true}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}

                            id="panel-game"
                        >


                            <Typography className={classes.heading}>Game Details</Typography>
                            <Typography className={classes.secondaryHeading}>Please complete the game details.</Typography>

                        </AccordionSummary>



                        <AccordionDetails>
                            <Grid container spacing={4} className={classes.box}>
                                <Grid item xs container direction="column" spacing={3}>


                                    <Grid item className={classes.box}>
                                        <FormControl className={(classes.formControl)}>
                                            Game:
        </FormControl>
                                        <FormControl variant="outlined" className={classes.formControl}>
                                            <InputLabel id="gamename-label">Game</InputLabel>
                                            <Select
                                                labelId="gamename-label"
                                                id="gamename"
                                                value={gameName}
                                                onChange={handleChange}
                                                label="Game"
                                            >
                                                {gamenames.map((gamename) => (
                                                    <MenuItem key={gamename} value={gamename} style={getStyles(gamename, gameName)}>
                                                        {gamename}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>



                                    <Grid item className={classes.box}>
                                        <FormControl className={(classes.formControl)}>
                                            Servers:
        </FormControl>
                                        <FormControl variant="outlined" className={classes.formControl}>
                                            <InputLabel id="gameservers-label">Servers</InputLabel>
                                            <Select
                                                labelId="gameservers-label"
                                                id="gameservers"
                                                multiple
                                                value={gameServers}
                                                onChange={handleServersChange}
                                                label="Gameservers"

                                                renderValue={(selected) => (
                                                    <div className={classes.chips}>
                                                        {selected.map((value) => (
                                                            <Chip key={value} label={value} className={classes.chip} />
                                                        ))}
                                                    </div>
                                                )}
                                            >
                                                {gameservers.map((gameserver) => (
                                                    <MenuItem key={gameserver} value={gameserver} style={getStyles(gameserver, gameServers)}>
                                                        {gameserver}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item className={classes.box}>
                                        <FormControl className={(classes.formControl)}>
                                            Platforms:
        </FormControl>
                                        <FormControl variant="outlined" className={classes.formControl}>
                                            <InputLabel id="gameplatforms-label">Platforms</InputLabel>
                                            <Select
                                                labelId="gameplatforms-label"
                                                id="gameplatforms"

                                                value={gamePlatforms}
                                                onChange={handlePlatformsChange}
                                                label="gameplatforms"
                                                multiple
                                                renderValue={(selected) => (
                                                    <div className={classes.chips}>
                                                        {selected.map((value) => (
                                                            <Chip key={value} label={value} className={classes.chip} />
                                                        ))}
                                                    </div>
                                                )}
                                            >
                                                {gameplatforms.map((gameplatform) => (
                                                    <MenuItem key={gameplatform} value={gameplatform} style={getStyles(gameplatform, gamePlatforms)}>
                                                        {gameplatform}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                </Grid>


                            </Grid>
                        </AccordionDetails>

                    </Accordion>

                    <Accordion defaultExpanded={true}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}

                            id="panel-service"
                        >


                            <Typography className={classes.heading}>Service Details</Typography>
                            <Typography className={classes.secondaryHeading}>Please complete the service you will provide.</Typography>

                        </AccordionSummary>


                        <AccordionDetails>
                            <Grid container spacing={4} className={classes.box}>
                                <Grid item xs container direction="column" spacing={3}>
                                    <Grid item className={classes.box}>
                                        <FormControl className={(classes.formControl)}>
                                            Price / Game:
        </FormControl>
       
                                        <FormControl variant="outlined" className={classes.formControl}>
                                            <TextField
                                                id="outlined-number"
                                                type="number"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                error={price < 1}
                                                variant="outlined"
                                                defaultValue={1}
                                                onChange={handlePriceChange}
                                                InputProps={{ inputProps: { min: 1 } }}
                                            />
                                        </FormControl> 
                                        <FormControl className={(classes.formControl)}>
                                            <ECoin></ECoin> 
        </FormControl>
                                    </Grid>


                                    <Grid item className={classes.box}>
                                        <FormControl className={(classes.formControl)}>
                                            Introduction:
        </FormControl>
                                        <FormControl variant="outlined" className={classes.formControl}>
                                            <TextField
                                                id="outlined-textr"
                                                type="text"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                multiline={true}
                                                rows={3}

                                                error={introduction == null}
                                                variant="outlined"
                                                defaultValue={"Hey, i am using the GameWithMe!"}
                                                onChange={handleIntroductionChange}

                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item className={classes.box}>
                                        <FormControl className={(classes.formControl)}>
                                            Language:
        </FormControl>
                                        <FormControl variant="outlined" className={classes.formControl}>
                                            <InputLabel id="language-label">Language</InputLabel>
                                            <Select
                                                labelId="language-label"
                                                id="language"
                                                value={language}
                                                onChange={handleLanguageChange}
                                                label="Game"
                                                multiple
                                                renderValue={(selected) => (
                                                    <div className={classes.chips}>
                                                        {selected.map((value) => (
                                                            <Chip key={value} label={value} className={classes.chip} />
                                                        ))}
                                                    </div>
                                                )}
                                            >
                                                {languages.map((lan) => (
                                                    <MenuItem key={lan} value={lan} style={getStyles(lan, language)}>
                                                        {lan}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item className={classes.box}>
                                        <FormControl className={(classes.formControl)}>
                                            Available time
        </FormControl>
                                        <FormControl variant="outlined" className={classes.formControl}>
                                            <InputLabel id="availabletime-label">Available Time</InputLabel>
                                            <Select

                                                labelId="availabletime-label"
                                                id="availabletime"
                                                value={availableTime}
                                                onChange={handleAvailableTimeChange}
                                                label="availabletime"
                                                multiple
                                                renderValue={(selected) => (
                                                    <div className={classes.chips}>
                                                        {selected.map((value) => (
                                                            <Chip key={value} label={value} className={classes.chip} />
                                                        ))}
                                                    </div>
                                                )}
                                            >
                                                {availabletimes.map((availabletime) => (
                                                    <MenuItem key={availabletime} value={availabletime} style={getStyles(availabletime, availableTime)}>
                                                        {availabletime}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </AccordionDetails>


                    </Accordion>



                    <Grid className={classes.buttons}>
                        <Button
                            className={classes.secondButton}
                            variant={"contained"}
                            color={"secondary"}
                            size={"large"}
                        >
                            Create
            </Button>
                        <Button variant={"outlined"} color={"secondary"} size={"large"} onClick={props.onCancel}>
                            Cancel
            </Button>
                    </Grid>


                </Grid>
            </Paper>
        </div>
    );
}

export default CreatePostPage;
