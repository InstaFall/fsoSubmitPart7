import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import App from "./App"
import blogReducer from "./reducers/blogReducer"
import notificationReducer from "./reducers/notificationReducer"
import loggedUserReducer from "./reducers/loggedUserReducer"

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    loggedUser: loggedUserReducer,
  },
})
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
)
