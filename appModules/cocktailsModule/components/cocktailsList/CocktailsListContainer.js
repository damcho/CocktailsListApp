import { connect } from "react-redux";
import {
  fetchCocktails,
  deleteCocktail
} from "../../actions/cocktailsModuleActions";
import React, { Component } from "react";
import { View, LayoutAnimation, Text, Animated } from "react-native";
import CocktailsList from "./CocktailsList";
import Icon from "react-native-vector-icons/MaterialIcons";
import ActionButton from "react-native-action-button";
import styles from "./CocktailsList.styles.js";

class CocktailsListWrapper extends Component {
  static navigationOptions = ({ navigation }) => {
    const userIcon = navigation.getParam("user") ? (
      <Icon.Button
        name="account-circle"
        backgroundColor="transparent"
        underlayColor="transparent"
        color="black"
        size={30}
        onPress={navigation.getParam("onUserProfileTapped")}
      />
    ) : null;
    return {
      headerTitle: "Cocktails List",
      headerRight: userIcon
    };
  };

  state = {
    fadeAnim: new Animated.Value(0)
  };

  onUserProfileTapped = () => {
    this.props.navigation.navigate("userProfile");
  };

  onAddCocktailTapped = () => {
    this.props.navigation.navigate("createCocktail");
  };

  componentDidMount() {
    this.props.navigation.setParams({
      user: this.props.user,
      onUserProfileTapped: this.onUserProfileTapped
    });
    this.props.fetchCocktails((refreshing = false));

    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 1500
    }).start();
  }

  onRefresh = () => {
    this.props.fetchCocktails((refreshing = true));
  };

  onItemTapped = index => {
    this.props.navigation.navigate("cocktailDetail", {
      cocktailTitle: this.props.cocktails[index].strDrink,
      cocktailId: this.props.cocktails[index].idDrink
    });
  };

  onDeleteItem = cocktailID => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.props.deleteCocktail(cocktailID);
  };

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <CocktailsList
          error={this.props.error}
          data={this.props.cocktails}
          onPressItem={this.onItemTapped}
          onDeleteItem={this.onDeleteItem}
          isLoading={this.props.isLoading}
          onRefreshList={this.onRefresh}
          isRefreshing={this.props.isRefreshing}
        />
        <ActionButton
          style={styles.actionButtonIcon}
          buttonColor="rgba(231,76,60,1)"
          onPress={this.onAddCocktailTapped}
        />
      </Animated.View>
    );
  }
}

const mapStateToProps = state => {
  let cocktailsToList = null;
  if (state.cocktailsRootReducer.cocktailsList.cocktailIds) {
    cocktailsToList = state.cocktailsRootReducer.cocktailsList.cocktailIds.map(
      id => state.cocktailsRootReducer.cocktailsList.cocktails[id]
    );
  }

  return {
    isRefreshing: state.cocktailsRootReducer.cocktailsList.isRefreshing,
    cocktails: cocktailsToList,
    isLoading: state.cocktailsRootReducer.cocktailsList.isFetching,
    error: state.cocktailsRootReducer.error,
    user: state.user.credentials
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteCocktail: cocktailID => dispatch(deleteCocktail(cocktailID)),
    fetchCocktails: refreshing => dispatch(fetchCocktails(refreshing))
  };
};

const CocktailsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CocktailsListWrapper);

export default CocktailsListContainer;
