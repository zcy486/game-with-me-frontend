import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonBase,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  GridList,
  IconButton,
} from "@material-ui/core";

import MockAvatar from "../images/avatar.svg";
import ECoin from "../components/ECoin";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PropTypes from "prop-types";
import AddCircleIcon from '@material-ui/icons/AddCircle';

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
        marginBottom: theme.spacing(1.5),
        fontSize: 16,
        justifyContent: "center",
        alignItems: "center",
    },

  heading: {
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(1),
    fontSize: theme.typography.pxToRem(20),
    flexBasis: "30%",
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
    width: "100%",
    height: "100%",
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
    display: "flex",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },

  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    minWidth: 180,
  },
}));

function CreatePostPage(props) {
  const classes = useStyles();

  const [currentGame, setCurrentGame] = React.useState({});
  const [gameServers, setGameServers] = React.useState([]);
  const [gamePlatforms, setGamePlatforms] = React.useState([]);

  const [price, setPrice] = React.useState(1);
  const [serviceType, setserviceType] = React.useState("");
  const [introduction, setIntroduction] = React.useState(
    "Hey, i am using GameWithMe!"
  );
  const [language, setLanguage] = React.useState([]);
  const [availableTime, setAvailableTime] = React.useState([]);

  // for imgSrc
  const [screenshots, setScreenshots] = React.useState([]);

  // for image files
  const [screenshotFiles, setScreenshotFiles] = React.useState([]);

  const languages = [
    "Deutsch",
    "English",
    "Español",
    "Français",
    "한국어",
    "Italiano",
    "日本語",
    "Português",
    "Svenska",
    "Türkçe",
    "Tiếng Việt",
    "中文",
  ];

  const availabletimes = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const serviceTypes = ["Carry", "Chill", "All Types"];

  const onChangeImgs = (event) => {
    const files = event.target.files;
    const screenshot = [];
    if (!files) {
      return;
    }
    for (const file of files) {
      screenshot.push(URL.createObjectURL(file));
    }
    setScreenshotFiles(files);
    setScreenshots(screenshot);
  };

  function getStyles(gamename, gameName) {
    return {
      fontWeight:
        gameName.indexOf(gamename) === -1
          ? Typography.fontWeightRegular
          : Typography.fontWeightMedium,
    };
  }

  const handleGameChange = (event) => {
    setGamePlatforms([]);
    setGameServers([]);
    setCurrentGame(event.target.value);
  };

  const handleServersChange = (event) => {
    setGameServers(event.target.value);
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
    setIntroduction(event.target.value);
  };

  const handleServiceTypeChange = (event) => {
    setserviceType(event.target.value);
  };

  const packPost = () => {
    return {
      price: price,
      postType: serviceType,
      introduction: introduction,
      language: language,
      servers: gameServers,
      platforms: gamePlatforms,
      availableTime: availableTime,
      gameId: currentGame._id,
      companionId: props.user._id,
    };
  };

    const onCreate = (event) => {
        event.preventDefault();
        
        if (screenshots) {
            const formData = new FormData();
            for (const file of screenshotFiles) {
                formData.append("image", file);
            }
            props.onCreate(packPost(), formData );
        }
        else props.onCreate(packPost(), null);
    };
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container direction={"column"}>
                    <Accordion defaultExpanded={true}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            id="panel-profile"
                        >
                            <Typography className={classes.heading}>Profile</Typography>
                            <Typography className={classes.secondaryHeading}>
                                Your profile will be shown to the gamers.
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={4} className={classes.box}>
                                <Grid item>
                                    <ButtonBase className={classes.image}>
                                        <img
                                            className={classes.avatar}
                                            alt="avatar"
                                            src={props.user.avatarUrl ? props.user.avatarUrl : MockAvatar}
                                        />
                                    </ButtonBase>
                                </Grid>
                                <Grid item xs container direction="column" spacing={3}>
                                    <Grid item>Username: {props.user.username}</Grid>
                                    <Grid item>Age: {props.user.age}</Grid>
                                    <Grid item>Gender: {props.user.gender}</Grid>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>

          <Accordion defaultExpanded={true}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel-game">
              <Typography className={classes.heading}>Game Details</Typography>
              <Typography className={classes.secondaryHeading}>
                Please complete the game details.
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Grid container spacing={4} className={classes.box}>
                <Grid item xs container direction="column" spacing={3}>
                  <Grid item className={classes.box}>
                    <FormControl className={classes.formControl}>
                      Game:
                    </FormControl>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="gamename-label">Game</InputLabel>
                      <Select
                        labelId="gamename-label"
                        id="gamename"
                        value={currentGame}
                        onChange={handleGameChange}
                        label="Game"
                      >
                        {props.games.map((game) => (
                          <MenuItem key={game.name} value={game}>
                            {game.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item className={classes.box}>
                    <FormControl className={classes.formControl}>
                      Servers:
                    </FormControl>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
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
                              <Chip
                                key={value}
                                label={value}
                                className={classes.chip}
                              />
                            ))}
                          </div>
                        )}
                      >
                        {currentGame.allServers &&
                          currentGame.allServers.map((gameserver) => (
                            <MenuItem
                              key={gameserver}
                              value={gameserver}
                              style={getStyles(gameserver, gameServers)}
                            >
                              {gameserver}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item className={classes.box}>
                    <FormControl className={classes.formControl}>
                      Platforms:
                    </FormControl>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="gameplatforms-label">
                        Platforms
                      </InputLabel>
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
                              <Chip
                                key={value}
                                label={value}
                                className={classes.chip}
                              />
                            ))}
                          </div>
                        )}
                      >
                        {currentGame.allPlatforms &&
                          currentGame.allPlatforms.map((gameplatform) => (
                            <MenuItem
                              key={gameplatform}
                              value={gameplatform}
                              style={getStyles(gameplatform, gamePlatforms)}
                            >
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
              <Typography className={classes.heading}>
                Service Details
              </Typography>
              <Typography className={classes.secondaryHeading}>
                Please complete the service you will provide.
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Grid container spacing={4} className={classes.box}>
                <Grid item xs container direction="column" spacing={3}>
                  <Grid item className={classes.box}>
                    <FormControl className={classes.formControl}>
                      Price / Game:
                    </FormControl>

                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
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
                    <FormControl className={classes.formControl}>
                      <ECoin />
                    </FormControl>
                  </Grid>

                  <Grid item className={classes.box}>
                    <FormControl className={classes.formControl}>
                      Service Type:
                    </FormControl>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="servicetype-label">Type</InputLabel>
                      <Select
                        labelId="servicetype-label"
                        id="servicetype"
                        value={serviceType}
                        onChange={handleServiceTypeChange}
                        label="ServiceType"
                      >
                        {serviceTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item className={classes.box}>
                    <FormControl className={classes.formControl}>
                      Introduction:
                    </FormControl>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
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
                        defaultValue={"Hey, i am using GameWithMe!"}
                        onChange={handleIntroductionChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item className={classes.box}>
                    <FormControl className={classes.formControl}>
                      Language:
                    </FormControl>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
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
                              <Chip
                                key={value}
                                label={value}
                                className={classes.chip}
                              />
                            ))}
                          </div>
                        )}
                      >
                        {languages.map((lan) => (
                          <MenuItem
                            key={lan}
                            value={lan}
                            style={getStyles(lan, language)}
                          >
                            {lan}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item className={classes.box}>
                    <FormControl className={classes.formControl}>
                      Available time
                    </FormControl>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="availabletime-label">
                        Available Time
                      </InputLabel>
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
                              <Chip
                                key={value}
                                label={value}
                                className={classes.chip}
                              />
                            ))}
                          </div>
                        )}
                      >
                        {availabletimes.map((availabletime) => (
                          <MenuItem
                            key={availabletime}
                            value={availabletime}
                            style={getStyles(availabletime, availableTime)}
                          >
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

          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id="panel-screenshots"
            >
              <Typography className={classes.heading}>Screenshots</Typography>
              <Typography className={classes.secondaryHeading}>
                You can upload some screenshots for your post.
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={4} className={classes.box}>
                <Grid item xs container direction="column" spacing={3}>
                  <Grid item container spacing={4} className={classes.box}>
                    <div>
                      <input
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                        onChange={onChangeImgs}
                        multiple="multiple"
                        style={{ display: "none" }}
                      />
                      <label htmlFor="icon-button-file">
                        <IconButton
                          color="secondary"
                          aria-label="upload picture"
                          component="span"
                        >
                          <AddCircleIcon />
                        </IconButton>
                      </label>
                    </div>
                  </Grid>

                  <Grid item container spacing={4} className={classes.box}>
                    <GridList className={classes.gridList}>
                      {screenshots.map((screenshot) => (
                        <img alt="screenshot" className={classes.avatar} src={screenshot} />
                      ))}
                    </GridList>
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
              disabled={
                Object.keys(currentGame).length === 0 ||
                gameServers.length === 0 ||
                gamePlatforms.length === 0 ||
                language.length === 0 ||
                availableTime.length === 0 ||
                serviceType.length === 0
              }
              onClick={onCreate}
            >
              Create
            </Button>
            <Button
              variant={"outlined"}
              color={"secondary"}
              size={"large"}
              onClick={props.onCancel}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

CreatePostPage.propTypes = {
  games: PropTypes.array.isRequired,
};

export default CreatePostPage;
