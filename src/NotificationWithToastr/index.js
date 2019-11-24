/* eslint-disable no-unused-vars */
import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import ee from "event-emitter"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCheckCircle,
  faBell,
  faExclamationTriangle,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons"

const Container = styled.div`
  background: ${props => props.background};
  text-align: left;
  color: #fff;
  max-width: 250px;
  padding: 8px;
  position: fixed;
  top: ${props => props.top}px;
  right: 16px;
  z-index: 999;
  transition: top 0.5s ease;
  border-radius: 5px;
  border: 2px solid ${props => props.background};
  display: flex;
  align-items: top;

  & {
    :before {
      content: " ";
      position: absolute;
      z-index: -1;
      top: 1px;
      left: 1px;
      right: 1px;
      bottom: 1px;
      border: 1px solid #fff;
    }
  }

  & span {
    margin-left: 10px;
  }
`

const IconContainer = styled.div`
  font-size: 22px;
  padding: 0;
`

const ResponseContainer = styled.div`
  margin-left: 10px;
`

const Title = styled.h6`
  margin: 0;
  padding: 0;
  font-size: 16px;
`

const Message = styled.h6`
  margin: 0;
  padding: 0;
`

const emitter = new ee()

export const notify = (msg, type) => {
  emitter.emit("notification", msg, type)
}

const Notification = () => {
  const [top, setTop] = React.useState(-1000)
  const [message, setMessage] = React.useState("")
  const [type, setType] = React.useState("")
  const [icon, setIcon] = React.useState("")
  const [background, setBackground] = React.useState("")

  const [title, setTitle] = React.useState("")

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTop(-1000)
    }, 5000)
    return () => {
      clearTimeout(timer)
    }
  }, [top])

  emitter.on("notification", (msg, type) => showNotification(msg, type))

  const pickedType = type => {
    switch (type) {
      case "success":
        return {
          title: "Success!",
          background: "rgb(90,170,93)",
          icon: faCheckCircle,
          defaultMessage: "The last action that you took was a success."
        }
      case "warning":
        return {
          title: "Warning!",
          background: "rgb(245,152,26)",
          icon: faBell,
          defaultMessage: "The last action that you took caused a warning."
        }
      case "error":
        return {
          title: "Error!",
          background: "rgb(189,70,66)",
          icon: faExclamationTriangle,
          defaultMessage: "The last action that you took caused an error."
        }
      case "info":
        return {
          title: "Information!",
          background: "rgb(68,153,182)",
          icon: faInfoCircle,
          defaultMessage:
            "This is some information about the last action that you took."
        }
      default:
        return {
          background: "rgb(90,170,93)",
          icon: faCheckCircle,
          defaultMessage: "Success!"
        }
    }
  }

  const showNotification = (msg, type) => {
    const picked = pickedType(type)
    msg ? setMessage(msg) : setMessage(picked.defaultMessage)
    setIcon(picked.icon)
    setBackground(picked.background)
    setTitle(picked.title)
    setType(type)
    setTop(16)
  }

  return (
    <>
      <Container top={top} background={background}>
        <IconContainer>
          <FontAwesomeIcon icon={icon} />
        </IconContainer>
        <ResponseContainer>
          <Title>{title}</Title>
          <Message>{message}</Message>
        </ResponseContainer>
      </Container>
    </>
  )
}

Notification.propTypes = {
  msg: PropTypes.string,
  type: PropTypes.string
}

export default Notification
