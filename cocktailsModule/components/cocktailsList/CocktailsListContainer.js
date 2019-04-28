import { connect } from "react-redux";
import {
  fetchCocktails,
  deleteCocktail
} from "../../actions/cocktailsModuleActions";
import React, { Component } from "react";
import { View, LayoutAnimation } from "react-native";
import CocktailsList from "./CocktailsList";
import Icon from "react-native-vector-icons/MaterialIcons";
import ActionButton from "react-native-action-button";
import styles from "./CocktailsList.styles.js";

class CocktailsListWrapper extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Cocktails List"
  });

  onAddCocktailPress = () => {
    this.props.navigation.navigate("createCocktail");
  };

  componentDidMount() {
    this.props.fetchCocktails((refreshing = false));
  }

  onRefresh = () => {
    this.props.fetchCocktails((refreshing = true));
  };

  onPressItem = index => {
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
    return (
      <View style={styles.mainContainerView}>
        <CocktailsList
          error={this.props.error}
          data={this.props.cocktails}
          onPressItem={this.onPressItem}
          onDeleteItem={this.onDeleteItem}
          isLoading={this.props.isLoading}
          onRefreshList={this.onRefresh}
          isRefreshing={this.props.isRefreshing}
        />
        <ActionButton
          style={styles.actionButtonIcon}
          buttonColor="rgba(231,76,60,1)"
          onPress={this.onAddCocktailPress}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  let cocktailsToList = null;
  if (state.cocktailsList.cocktailIds) {
    cocktailsToList = state.cocktailsList.cocktailIds.map(
      id => state.cocktailsList.cocktails[id]
    );
  }

  return {
    isRefreshing: state.cocktailsList.isRefreshing,
    cocktails: cocktailsToList,
    isLoading: state.cocktailsList.isFetching,
    error: state.error
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
