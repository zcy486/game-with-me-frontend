import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
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
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import PostService from "../services/PostService";

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

function EditPostPage(props) {
  const classes = useStyles();

  // game-relevant
  const [gameName, setGameName] = React.useState("");
  const [allServers, setAllServers] = React.useState([]);
  const [allPlatforms, setAllPlatforms] = React.useState([]);
  // post-relevant
  const [postId, setPostId] = React.useState("");
  const [price, setPrice] = React.useState(1);
  const [serviceType, setserviceType] = React.useState("");
  const [introduction, setIntroduction] = React.useState("");
  const [language, setLanguage] = React.useState([]);
  const [availableTime, setAvailableTime] = React.useState([]);
  const [gameServers, setGameServers] = React.useState([]);
  const [gamePlatforms, setGamePlatforms] = React.useState([]);

  const languages = [
    "Čeština",
    "Dansk",
    "Deutsch",
    "English",
    "Ελληνικά",
    "Español",
    "Filipino",
    "Français",
    "한국어",
    "Italiano",
    "Íslenska",
    "Latviski",
    "Magyar",
    "Norsk",
    "日本語",
    "Polski",
    "Português",
    "Русский",
    "Română",
    "Suomi",
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

  let { match } = props;

  function getStyles(gamename, gameName) {
    return {
      fontWeight:
        gameName.indexOf(gamename) === -1
          ? Typography.fontWeightRegular
          : Typography.fontWeightMedium,
    };
  }

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

  // reload post
  useEffect(() => {
    if (match.params.postId) {
      (async () => {
        const post = await PostService.reloadOnEdit(match.params.postId);
        if (props.user._id === post.companionId) {
          if (post) {
            // game
            setGameName(post.gameId.name);
            setAllServers(post.gameId.allServers);
            setAllPlatforms(post.gameId.allPlatforms);
            // post
            setPostId(post._id);
            setPrice(post.price);
            setserviceType(post.postType);
            setIntroduction(post.introduction);
            setLanguage(post.language);
            setAvailableTime(post.availableTime);
            setGameServers(post.servers);
            setGamePlatforms(post.platforms);
          }
        } else {
          // Handle attempt to edit other user's post
          props.history.push(`/posts/${props.user._id}`);
        }
      })();
    }
  }, [match.params]);

  const packPost = () => {
    return {
      _id: postId,
      price: price,
      postType: serviceType,
      introduction: introduction,
      language: language,
      servers: gameServers,
      platforms: gamePlatforms,
      availableTime: availableTime,
    };
  };

  const onSave = (event) => {
    event.preventDefault();
    props.onSave(packPost());
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
                      src={
                        props.user.avatarUrl ? props.user.avatarUrl : MockAvatar
                      }
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
                      {gameName}
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
                        {allServers.map((gameserver) => (
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
                        {allPlatforms.map((gameplatform) => (
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
                        value={price}
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

          <Grid className={classes.buttons}>
            <Button
              className={classes.secondButton}
              variant={"contained"}
              color={"secondary"}
              size={"large"}
              disabled={
                gameServers.length === 0 ||
                gamePlatforms.length === 0 ||
                language.length === 0 ||
                availableTime.length === 0 ||
                serviceType.length === 0
              }
              onClick={onSave}
            >
              Save
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

export default withRouter(EditPostPage);
