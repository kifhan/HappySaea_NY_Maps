import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import PlayScreen from './Routes/PlayScreen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  // faHome, 
  faSearch,
} from '@fortawesome/free-solid-svg-icons'
import SignInScreen from './Routes/SignInScreen';

import CSS from 'csstype';
import { useWindowSize } from './Utils/WindowSIze';
// import { dbService, firebaseInstance as firebase } from './Stores/firebase';
// import data from './Stores/VideoData.json'

const css = (style: CSS.Properties) => { return style };

function App() {
  const screensize = useWindowSize()
  const clipWidth = (screensize.width > 720) ? "720px" : `${screensize.width}px`

  useEffect(() => {
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
    //     console.log(`upload status: ${i} / ${data.markers.length}`)
    //   }
    // }
    // dataUpload();

    return () => {
    }
  }, [])

  return (
    <Router
      basename={(process.env.NODE_ENV === "development") ? undefined : "/HappySaea_NY_Maps"}>
      {/* <Router basename={"/HappySaea_NY_Maps"}> */}
      {/* <span>{process.env.NODE_ENV}</span> */}
      <div style={styles.container}>
        <nav style={{ ...styles.nav, width: clipWidth }}>
          <Link to="/" style={styles.titleWrap}>
            <div className="title-font" style={styles.title}>HappySaea</div>
          </Link>
          <ul style={styles.menuwrap}>
            {/* <li style={styles.menuitem}>
              <Link to="/">
                <FontAwesomeIcon icon={faHome} size="2x" style={styles.menuicon} />
              </Link>
            </li> */}
            <li style={styles.menuitem}>
              <Link to="/search">
                <FontAwesomeIcon icon={faSearch} size="2x" style={styles.menuicon} />
              </Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/search">
            {/* <About /> */}
            <div style={{ height: "100%", width: clipWidth, backgroundColor: "#FFF8E1" }}><div style={{ margin: "20px", textAlign: "center" }}>search videos</div></div>
          </Route>
          <Route path="/playscreen">
            <PlayScreen />
          </Route>
          <Route path="/">
            <PlayScreen />
            {/* <SignInScreen /> */}
          </Route>
        </Switch>
      </div>
    </Router>
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
