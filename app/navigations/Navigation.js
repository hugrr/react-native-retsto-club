import React from "react";
import { icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import RestaurantsScreenStacks from "./RestaurantsStacks";

const NavigationStacks = createBottomTabNavigator({
  Restaurants: {
    screen: RestaurantsScreenStacks,
    navigationOptions: () => ({
      tabBarLabel: "Restaurantes",
      tabBarIcon: ({ tintColor }) => (
        <Icon
          Type="material-community"
          name="compass-outline"
          size={22}
          color={tintColor}
        />
      )
    })
  }
});

export default createAppContainer(NavigationStacks);
