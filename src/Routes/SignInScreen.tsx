// Import FirebaseAuth and firebase.
import React, { CSSProperties, useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Button } from '@chakra-ui/react'
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// import { background } from '@chakra-ui/react';
const css = (style: CSSProperties) => { return style };

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    // FacebookAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

function SignInScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = getAuth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
      <div style={styles.container}>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth()} />
      </div>
    );
  }
  return (
    <div style={styles.container}>
      <p>Welcome {getAuth().currentUser?.displayName}! You are now signed-in!</p>
      <br/>
      <br/>
      <Button onClick={() => getAuth().signOut()}>Sign-out</Button>
    </div>
  );
}

const styles = {
  container: css({
      height: '100%', width: '720px',
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
      background: "#fff",
      padding: "20px",
  }),
  content: css({

  })
};

export default SignInScreen;