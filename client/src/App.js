import React, { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Typography, message } from "antd";
import "antd/dist/antd.css";
import "./index.css";

const { Text } = Typography;

const client = new W3CWebSocket("wss://ws-feed.pro.coinbase.com");

class App extends Component {
  state = {
    userName: "",
    isLoggedIn: false,
    message: [],
  };

  onButtonClicked = () => {
    client.send(
      JSON.stringify({
        type: "subscribe",
        product_ids: ["ETH-USD", "ETH-EUR"],
        channels: [
          "level2",
          "heartbeat",
          {
            name: "ticker",
            product_ids: ["ETH-BTC", "ETH-USD"],
          },
        ],
      })
    );
  };
  onClickedShowData = () => {
    console.log(this.state.message[0]);
  };
  onClickedStop = () => {
    client.onclose = () => {};
  };
  componentDidMount() {
    client.onopen = () => {};
    client.onmessage = (message) => {
      this.state.message.push(message);
    };
    // console.log(client._readyState());

    // client.onmessage = (message) => {
    //   const dataFromServer = JSON.parse(message.data);
    //   console.log("got reply! ", dataFromServer);
    //   if (dataFromServer.type === "message") {
    //     this.setState((state) => ({
    //       messages: [
    //         ...state.messages,
    //         {
    //           msg: dataFromServer.msg,
    //           user: dataFromServer.user,
    //         },
    //       ],
    //     }));
    //   }
    // };
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
          >
            <button id="start-button" onClick={() => this.onButtonClicked()}>
              Start
            </button>
            <button id="start-button" onClick={() => this.onClickedShowData()}>
              Print
            </button>{" "}
            <button id="start-button" onClick={() => this.onClickedStop()}>
              Stop
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
