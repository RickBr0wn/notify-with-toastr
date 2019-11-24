import React from "react"
import logo from "./logo.svg"
import "./App.css"
import Notification, { notify } from "./NotificationWithToastr"

function App() {
  return (
    <div className="App">
      <Notification />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button className="App-link" onClick={() => notify(null, "success")}>
          Success Toastr
        </button>
        <button className="App-link" onClick={() => notify(null, "warning")}>
          Warning Toastr
        </button>
        <button className="App-link" onClick={() => notify(null, "info")}>
          Info Toastr
        </button>
        <button
          className="App-link"
          onClick={() =>
            notify(
              "Lorem ipsum dolor sit amet, platonem rationibus mei ea, te homero repudiandae cum. Te vim omnesque lucilius moderatius. Nam fabulas epicuri an, usu eruditi quaestio ei, usu ad choro mentitum recteque. Mei ea paulo docendi elaboraret.",
              "error"
            )
          }
        >
          Error Toastr
        </button>
      </header>
    </div>
  )
}

export default App
