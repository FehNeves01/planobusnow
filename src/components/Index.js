import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';

import Login from './Login';
import Home from './Home';
import Dashboard from './Dashboard';
import Partidas from './Partidas';
import UltimasPartidas from './UltimasPartidas';

const MainNav = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }

    },
    Home: {
      screen: Home,
      navigationOptions: {
        headerBackTitleVisible: 'true',
        headerTitle: 'Home',
        headerStyle: {
          backgroundColor: '#B1E89E',
          height: 150,
        },
      }
    },
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        headerBackTitleVisible: 'true',
        headerTitle: 'Dashboard',
        headerStyle: {
          backgroundColor: `#B1E89E`,
          borderBottomColor:'#EAFF68',
          borderBottomWidth:2,
        }
      }
    },
    Partidas: {
      screen: Partidas,
      navigationOptions: {
        headerBackTitleVisible: 'true',
        headerTitle: 'Partidas',
        headerStyle: {
          backgroundColor: `#B1E89E`,
          borderBottomColor:'#EAFF68',
          borderBottomWidth:2,
        }
      }
    },
    UltimasPartidas:{
      screen: UltimasPartidas,
      headerBackTitleVisible: 'true',
      headerTitle: 'Partidas',
      navigationOptions:{
        headerStyle: {
          backgroundColor: `#B1E89E`,
          borderBottomColor:'#EAFF68',
          borderBottomWidth:2,
        }
      }
    },
  },
  {
    initialRouteName: 'Login'
  }
)

export default createAppContainer(MainNav);