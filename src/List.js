import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import Fab from "@material-ui/core/Fab";
import Footer from "./Footer";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Welcome from "react-welcome-page";
import { auth } from "./firebase"; // Import auth from firebase.js
// Import auth from firebase.js
import Snackbar from "@material-ui/core/Snackbar";
import Signup from "./Signup";
import Detail from "./Detail";
import { Link, useNavigate } from "react-router-dom";
const List = ({ history }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [stext, setstext] = useState("bheem");
  const navigate = useNavigate();
  const [result, setresult] = useState([]);
  const [result2, setresult2] = useState([]);
  const [open, setOpen] = React.useState(false);

  const [detailbool, setdetailbool] = useState(false);
  const [imval, setimval] = useState();

  const showChange = (event) => {
    setstext(event.target.value.toLowerCase());
  };
  const show = () => {
    axios
      .get(`https://www.omdbapi.com/?apikey=4eb65943&s=${stext}`)
      .then((res) => {
        setresult(res.data.Search.map((p) => p));
      })
      .catch((error) => {
        //alert("No search results found!! check for spelling ");
        setOpen(true);
      });
    show2();
  };

  const show2 = () => {
    axios
      .get(`https://www.omdbapi.com/?apikey=5fcb333a&s=${stext}&page=2`)
      .then((res) => {
        setresult2(res.data.Search.map((s) => s));
      })
      .catch((error) => {});
  };
  function showDetail(i) {
    setdetailbool(true);
    setimval(i);
  }
  //to toggle boolean
  function funsetdetailbool() {
    setdetailbool(false);
  }

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is logged in
        setLoggedIn(true);
      } else {
        // User is not logged in
        setLoggedIn(false);
      }
      setLoading(false); // Set loading to false after checking auth state
    });

    // Cleanup function
    return () => unsubscribe(); // Unsubscribe from auth state change listener
  }, []);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleLogout = () => {
    auth.signOut(); // Call signOut method from firebase auth
    // Redirect to login page or any other page after logout
    navigate("/signin"); // Replace "/login" with the path of your login page
  };
  const currentUser = auth.currentUser;
  const userEmail = currentUser ? currentUser.email.split("@")[0] : "";

  return (
    <>
      {loggedIn ? (
        // Render the list content
        <>
          <Welcome
            loopDuration={2000}
            data={[
              {
                image: require("./WatchAnyMovieLogo.png"),
                imageAnimation: "flip",
                backgroundColor: "#212121",
              },

              // },
              // {
              //   image: require('./watchanymovie-logo.PNG') ,
              // imageAnimation: 'rotateIn',
              // backgroundColor: '#212121',
              // textAnimation: "fadeInUp",
              // textColor: 'white',
              // text:'Watch Any Movie'
              // },
              // {
              //   image: require('./watchanymovie-logo.PNG') ,
              // imageAnimation: 'rotateIn',
              // backgroundColor: '#212121',
              // textAnimation: "fadeInUp",
              // textColor: 'white',
              // text:'Watch Any Movie'
              // }
            ]}
          />

          <div className="navigation">
            <a className="button" href="/">
              <ExitToAppIcon fontSize="large" />
              <div className="logout" onClick={handleLogout}>
                <div>{userEmail.split("@")[0]}</div>
              </div>
            </a>
          </div>
          <center>
            <div className="navbar-dark bg-dark">
              <br />
              <input
                type="text"
                value={stext}
                onChange={showChange}
                placeholder="Search movies/series"
                style={{
                  height: "57px",
                  width: "250px",
                  borderRadius: "5px",
                  paddingLeft: "30px",
                  color: "white",
                  background: "#212121",
                  border: "2px",
                }}
              />
              <Fab
                color="primary"
                aria-label="add"
                style={{
                  background: "#b71c1c",
                  borderRadius: "7px",
                }}
                onClick={show}
              >
                <SearchIcon />
              </Fab>
              <br />
              <br />
            </div>
            <br />
            {/* <Display result={result}/> */}
            <center>
              <div className="resultContainer">
                {result.map((p) => (
                  <div key={p.imdbID} onClick={() => showDetail(p.imdbID)}>
                    <Card className="movieCard">
                      <CardActionArea>
                        <img
                          className="moviePoster"
                          src={p.Poster}
                          alt={p.Title}
                        />

                        <span
                          variant="contained"
                          style={{
                            position: "absolute",
                            top: "0px",
                            right: "0px",
                            background: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            borderRadius: "4px",
                          }}
                        >
                          {p.Year}
                        </span>
                        <div className="middle">
                          <div className="text">
                            <PlayCircleFilledIcon
                              className="playHoverIcon"
                              fontSize="large"
                              style={{ color: "#aa2e25", fontSize: "60px" }}
                            />
                          </div>
                        </div>
                        <div className="overlay">{p.Title}</div>
                      </CardActionArea>
                    </Card>
                  </div>
                ))}

                {/* result2 */}
                {result2.map((s) => (
                  <div key={s.imdbID} onClick={() => showDetail(s.imdbID)}>
                    <Card className="movieCard">
                      <CardActionArea>
                        <img
                          className="moviePoster"
                          src={s.Poster}
                          alt={s.Title}
                        />

                        <span
                          variant="contained"
                          style={{
                            position: "absolute",
                            top: "0px",
                            right: "0px",
                            background: "rgba(0, 0, 0, 0.5)",
                            color: "black",
                            borderRadius: "4px",
                          }}
                        >
                          <b> {s.Year}</b>
                        </span>
                        <div className="middle">
                          <div className="text">
                            <PlayCircleFilledIcon
                              className="playHoverIcon"
                              fontSize="large"
                              style={{ color: "#aa2e25", fontSize: "60px" }}
                            />
                          </div>
                        </div>
                        <div className="overlay">{s.Title}</div>
                      </CardActionArea>
                    </Card>
                  </div>
                ))}
              </div>
            </center>
            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={open}
              autoHideDuration={1500}
              onClose={handleClose}
              style={{ marginTop: "20vh" }}
              message="No search results found !!"
            />

            {detailbool ? (
              <Detail imval={imval} funsetdetailbool={funsetdetailbool} />
            ) : null}
          </center>
          <Footer />
        </>
      ) : (
        // Render signup page
        // You can replace this with your actual signup page component
        <Signup />
      )}
    </>
  );
};
export default List;
