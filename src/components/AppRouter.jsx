import React from "react"

import { getAuth } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"
import { Navigate, Route, Routes } from "react-router-dom"

import Chat from "./Chat"
import Login from "./Login"

const AppRouter = () => {
  const auth = getAuth()
  const [user] = useAuthState(auth)
  console.log(user)
  return (
    <>
      <Routes>
        {user ? (
          <>
            <Route path="/chat/chat" element={<Chat />} />
            <Route path="*" element={<Navigate to="/chat/chat" replace />} />
            {/* в самом конце */}
          </>
        ) : (
          <>
            <Route path="/chat/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/chat/login" replace />} />
            {/* в самом конце */}
          </>
        )}
      </Routes>
    </>
  )
}

export default AppRouter
