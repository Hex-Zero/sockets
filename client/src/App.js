import React, { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Card, Avatar, Input, Typography } from "antd";
import "antd/dist/antd.css";
import "./index.css";

const { Search } = Input;
const { Text } = Typography;
const { Meta } = Card;

const client = new W3CWebSocket("wss://ws-feed.pro.coinbase.com");

class App extends Component {
  state = {
    userName: "",
    isLoggedIn: false,
    messages: [],
  };

  onButtonClicked = (value) => {
    client.send(
      JSON.stringify({
        type: "message",
        msg: value,
        user: this.state.userName,
      })
    );
    this.setState({ searchVal: "" });
  };
  componentDidMount() {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log("got reply! ", dataFromServer);
      if (dataFromServer.type === "message") {
        this.setState((state) => ({
          messages: [
            ...state.messages,
            {
              msg: dataFromServer.msg,
              user: dataFromServer.user,
            },
          ],
        }));
      }
    };
  }
  render() {
    return (
      <div className="main">
        <div>
          <div className="title">
            <Text type="secondary" style={{ fontSize: "36px" }}>
              Websocket
            </Text>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingBottom: 50,
            }}
          ></div>
        </div>
      </div>
    );
  }
}

export default App;
