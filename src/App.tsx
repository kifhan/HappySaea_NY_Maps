import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import PlayScreen from './Routes/PlayScreen';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {
//   // faHome, 
//   faSearch, faUserCircle,
// } from '@fortawesome/free-solid-svg-icons'
import { Avatar, ChakraProvider } from '@chakra-ui/react'
import SignInScreen from './Routes/SignInScreen';

import CSS from 'csstype';
import { useWindowSize } from './Utils/WindowSIze';
import { authService } from './Stores/firebase';
import FeedVideoList from './Routes/FeedVideoList';
import PostVideoScreen from './Routes/PostVideoScreen';

const css = (style: CSS.Properties) => { return style };

function App() {
  const screensize = useWindowSize()
  const clipWidth = (screensize.width > 720) ? "720px" : `${screensize.width}px`

  useEffect(() => {
    // (async function executedb() {
    //   const doc = await dbService.collection("videos").doc("VDQZQun5E6s").get()
    //   if (doc.exists) {
    //     console.log(doc.data())
    //   }
    //   // dbService.collection("videos").doc("VDQZQun5E6s").update()
    // })()

    // dbService.collection("videos").doc("VDQZQun5E6s").collection("markerComments").get().then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     console.log(`${doc.id} => ${doc.data()}`);
    //   });
    // });
    // dbService.collection("videos").doc("VDQZQun5E6s").get().then((doc) => {
    //   console.log(`${doc.id} => ${doc.data()}`);
    //   console.log(doc.data());
    // })

    // async function dataUpload() {
    //   for (let i = 1; i < data.markers.length; i++) {
    //     const marker = data.markers[i];
    //     const markercomment = {
    //       author: "admin",
    //       createdat: Date.now(),
    //       description: marker.description,
    //       position: new firebase.firestore.GeoPoint(marker.position[0], marker.position[1]),
    //       seekto: marker.seekto,
    //       title: marker.title,
    //       type: marker.type,
    //     }
    //     await dbService.collection("videos").doc("VDQZQun5E6s").collection("markerComments").add(markercomment)
    //     console.log(`upload status: ${i + 1} / ${data.markers.length}`)
    //   }
    // }
    // dataUpload();

    return () => {
    }
  }, [])

  return (
    <ChakraProvider resetCSS>
    <Router>
      {/* <Router basename={"/HappySaea_NY_Maps"}> */}
      {/* <span>{process.env.NODE_ENV}</span> */}
      <div style={styles.container}>
        <nav style={{ ...styles.nav, width: clipWidth }}>
          <Link to="/" style={styles.titleWrap}>
            <div className="title-font" style={styles.title}>HappySaea map</div>
          </Link>
          <ul style={styles.menuwrap}>
            <li style={styles.menuitem}>
              <Link to="/login">
                {/* <FontAwesomeIcon icon={faUserCircle} size="2x" style={styles.menuicon} /> */}
                {/* <IconButton icon={<FontAwesomeIcon icon={faUserCircle} />} aria-label="User-Login" rounded="full" fontSize="4xl" color="red" background="transparent" padding="12px"/> */}
                <Avatar name={authService.currentUser?.displayName || undefined} src={authService.currentUser?.photoURL || undefined} margin="4px" />
              </Link>
            </li>
            {/* <li style={styles.menuitem}>
              <Link to="/search">
                <FontAwesomeIcon icon={faSearch} size="2x" style={styles.menuicon} />
              </Link>
            </li> */}
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/search">
            <div style={{ height: "100%", width: clipWidth, backgroundColor: "#FFF8E1" }}><div style={{ margin: "20px", textAlign: "center" }}>search videos</div></div>
          </Route>
          <Route path="/video/:videoId">
            <PlayScreen />
          </Route>
          <Route path="/video/">
            <PostVideoScreen />
          </Route>
          <Route path="/login">
            <SignInScreen />
          </Route>
          <Route path="/">
            <FeedVideoList />
          </Route>
        </Switch>
      </div>
    </Router>
    </ChakraProvider>
  );
}


const styles = {
  container: css({
    height: '100vh', width: '100vw',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8D6E63",
  }),
  nav: css({
    backgroundColor: "#FBC02D",
    width: "720px",
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between"
  }),
  titleWrap: css({
    textDecoration: "none",
    alignSelf: "center",
    marginLeft: "20px",

  }),
  title: css({
    fontSize: "36px",
    fontWeight: "bold",
    color: "#f25022",
    textDecoration: "none"
  }),
  menuwrap: css({
    display: "flex",

  }),
  menuitem: css({
    textDecoration: "none",
    listStyle: "none"
  }),
  menuicon: css({
    textDecoration: "none",
    // fontSize: "18px",
    width: "26px",
    height: "26px",
    paddingRight: "8px",
    color: "#f25022",
  }),

};

export default App;
