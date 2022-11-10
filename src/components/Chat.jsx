import React, { useState } from "react"

import { getAuth } from "firebase/auth"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { Avatar, Button, Container, Grid, TextField } from "@mui/material"
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  orderBy,
  query,
} from "firebase/firestore"

const Chat = () => {
  const db = getFirestore()
  const auth = getAuth()
  const [user] = useAuthState(auth)
  const [inputText, setInputText] = useState("")
  const [messages] = useCollectionData(
    query(collection(db, "messages"), orderBy("createdAt"))
  )

  const sendMessage = async () => {
    await addDoc(collection(db, "messages"), {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: inputText,
      createdAt: Timestamp.fromDate(new Date()),
    })
    setInputText("")
  }

  return (
    <Container>
      <Grid
        container
        justifyContent={"center"}
        style={{ height: window.innerHeight - 50 }}
      >
        <div
          style={{
            width: "80%",
            height: "70vh",
            border: "1px solid black",
            overflow: "auto",
          }}
        >
          {messages &&
            messages.map((message) => (
              <div
                style={{
                  margin: "10px",
                  border:
                    user.uid === message.uid
                      ? "2px solid green"
                      : "2px solid blue",
                  marginLeft: user.uid === message.uid ? "auto" : "10px",
                  width: "fit-content",
                  padding: 15,
                }}
              >
                <Grid container>
                  <Avatar src={message.photoURL} />
                  <div>{message.displayName}</div>
                </Grid>
                <div>{message.text}</div>
              </div>
            ))}
        </div>
        <Grid
          container
          direction={"column"}
          alignItems={"flex-end"}
          style={{ width: "80%" }}
        >
          <form
            style={{ width: "100%" }}
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage()
            }}
          >
            <TextField
              fullWidth
              maxRows={2}
              variant={"outlined"}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <Button onClick={sendMessage} variant={"outlined"}>
              Отправить
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Chat
