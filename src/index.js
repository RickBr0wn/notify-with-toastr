import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { NotificationsWithToastrProvider } from "./NotificationWithToastr"

ReactDOM.render(
  <NotificationsWithToastrProvider>
    <App />
  </NotificationsWithToastrProvider>,
  document.getElementById("root")
)
