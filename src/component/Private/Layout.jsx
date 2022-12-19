import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../../context/userContext"

function Layout(props) {
  const [state] = useContext(UserContext)
  if (state.user.role == "user") return <Navigate to="/" />
  return props.children
}

export default Layout
