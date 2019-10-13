import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Root } from "native-base"
import { Router, Scene } from 'react-native-router-flux'
import { Font } from 'expo'
import store from './src/store/store'

import Home from './src/components/home/home.js'
import Welcome from './src/components/welcome/welcome.js'
import Login from './src/components/login/login.js'
import Register from './src/components/register/register.js'
import Linechart from './src/components/charts/linechart.js'
import Barchart from './src/components/charts/barchart.js'
import Ringchart from './src/components/charts/ringchart.js'
import Animals from './src/components/animals/animals.js'
import Monthly from './src/components/monthly/monthly.js'
import Daily from './src/components/daily/daily.js'
import Profile from './src/components/profile/profile.js'
import VariedChart from './src/components/variedchart/variedchart.js'
import Mapdemo from './src/components/mapdemo/mapdemo.js'

export default class App extends Component{
    constructor() {
      super();
      this.state = {
        isReady: false
      };
    }
    componentWillMount() {
      this.loadFonts();
    }
    async loadFonts() {
      await Expo.Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
      });
      this.setState({ isReady: true });
    }
    render() {
      if (!this.state.isReady) {
        return <Expo.AppLoading />;
      }
      return(
        <Provider store={ store }>
          <Root>
            <Router hideNavBar= "true">
              <Scene key="root">
                <Scene key="Welcome" component={Welcome} title="Welcome" initial={true} />
                <Scene key="Home" component={Home} title="Home" />
                <Scene key="Login" component={Login} title="Login" />
                <Scene key="Register" component={Register} title="Register" />
                <Scene key="Linechart" component={Linechart} title="Linechart" />
                <Scene key="Ringchart" component={Ringchart} title="Ringchart" />
                <Scene key="Barchart" component={Barchart} title="Barchart" />
                <Scene key="Animals" component={Animals} title="Animals" />
                <Scene key="Monthly" component={Monthly} title="Monthly" />
                <Scene key="Daily" component={Daily} title="Daily" />
                <Scene key="Profile" component={Profile} title="Profile" />
                <Scene key="VariedChart" component={VariedChart} title="VariedChart" />
                <Scene key="Mapdemo" component={Mapdemo} title="Mapdemo" />
              </Scene>
            </Router>
          </Root>
        </Provider>
      );
  }
}
