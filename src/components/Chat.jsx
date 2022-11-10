import React, { useEffect, useRef, useState } from "react"

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
  const scrollToLastMessage = useRef(null)
  const db = getFirestore()
  const auth = getAuth()
  const [user] = useAuthState(auth)
  const [inputText, setInputText] = useState("")
  const [messages] = useCollectionData(
    query(collection(db, "messages"), orderBy("createdAt"))
  )

  useEffect(() => {
    console.log(user)
    scrollToLastMessage?.current?.scrollIntoView()
  }, [messages])

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
      <div className="onlineUsersBlock">
        {/* {user &&
          user?.map((item) => (
            <div className="onlineUsersBlock__user">
              <div
                style={{
                  margin: "10px",
                  width: "fit-content",
                  padding: 15,
                }}
              >
                <Grid container>
                  <Avatar src={item.photoURL} />
                  <div>{item.displayName}</div>
                </Grid>
                <div>{item.text}</div>
              </div>
            </div>
          ))} */}
      </div>
      <Grid
        container
        justifyContent={"center"}
        style={{ height: window.innerHeight - 50 }}
      >
        <div
          className="container"
          style={{
            width: "80%",
            height: "80vh",
            boxShadow: "0 0 31px #ccc",
            overflow: "auto",
            marginTop: "20px",
          }}
        >
          {messages &&
            messages.map((message) => (
              <>
                <div
                  className="user"
                  style={{
                    margin: "10px",
                    marginLeft: user.uid === message.uid ? "auto" : "10px",
                    width: "fit-content",
                    padding: 15,
                  }}
                >
                  <div
                    className="user__item"
                    style={{
                      flexDirection:
                        user.uid === message.uid ? "row-reverse" : "row",
                    }}
                  >
                    <Avatar src={message.photoURL} className="user__avatar" />
                    <div
                      className="user__text"
                      style={{
                        background:
                          user.uid === message.uid
                            ? "rgb(34, 134, 255)"
                            : "rgb(140 91 255)",
                      }}
                    >
                      {/* <div>{message.displayName}</div> */}
                      <div style={{ fontSize: "16px" }}>{message.text}</div>
                    </div>
                  </div>
                </div>
                <div ref={scrollToLastMessage}></div>
              </>
            ))}
        </div>
        <Grid
          container
          direction={"column"}
          alignItems={"flex-end"}
          style={{ width: "80%" }}
        >
          <form
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              height: "30px",
              alignItems: "baseline",
              marginBottom: "20px",
            }}
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage()
            }}
          >
            <input
              type="text"
              className="form__input"
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
