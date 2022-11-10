import React from "react"

import { AppBar, Button, Grid, Toolbar } from "@mui/material"
import { createTheme } from "@mui/material/styles"
import { green, teal } from "@mui/material/colors"
import { Link } from "react-router-dom"
import { getAuth, signOut } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"

const theme = createTheme({
  palette: {
    primary: teal,
    secondary: green,
  },
})
const Navbar = () => {
  const auth = getAuth()
  const [user] = useAuthState(auth)

  return (
    <AppBar position="static" theme={theme}>
      <Toolbar variant={"dense"} className="header__wrapper">
        <h2 className="logo">RU-CONNECT</h2>
        <Grid container justifyContent={"flex-end"}>
          {user ? (
            <Button
              onClick={() => signOut(auth)}
              variant="contained"
              color={"secondary"}
            >
              Выйти
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="contained" color={"secondary"}>
                Логин
              </Button>
            </Link>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
