import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { Button, Container, Grid } from "@mui/material"
import { Box } from "@mui/system"

import React from "react"

const Login = () => {
  const auth = getAuth()
  const provider = new GoogleAuthProvider()

  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        // The signed-in user info.
        const user = result.user
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
      })
  }

  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50 }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid
          style={{ width: 400, background: "lightgray" }}
          container
          alignItems={"center"}
          direction={"column"}
        >
          <Box p={5}>
            <Button onClick={login}>Войти с помощью Google</Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
