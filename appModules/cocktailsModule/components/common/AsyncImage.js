/* @flow */

import React, { Component } from "react"; // eslint-disable-line no-unused-vars

import { Image, View } from "react-native";

type Style = number | string | Object | Array<?Style>;

type Props = {
  placeholderColor?: string,
  style: {
    width: number,
    height: number,
    [key: string]: Style
  },
  source: {
    uri: string
  }
};

type State = {
  loaded: boolean
};

export default class AsyncImage extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = { loaded: false };
  }

  render() {
    const { placeholderColor, style, source } = this.props;

    return (
      <View style={style}>
        <Image
          source={
            this.props.source.uri != null
              ? this.props.source
              : require("./img/default-drink.png")
          }
          resizeMode={"contain"}
          style={[
            style,
            {
              resizeMode: "contain"
            }
          ]}
          onLoad={this._onLoad}
        />

        {!this.state.loaded && (
          <View
            style={[
              style,
              {
                backgroundColor: placeholderColor || "#90a4ae",
                position: "absolute"
              }
            ]}
          />
        )}
      </View>
    );
  }

  _onLoad = () => {
    this.setState(() => ({ loaded: true }));
  };
}
