import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';



export default class Home extends Component {
  render() {
    const { navigation } = this.props
    const numeroEmpresa = navigation.getParam('codigo')

    return (
      <View style={styles.boddy}>
        <View style={styles.dashMenu}>
          <Text style={{ marginTop: 20, marginLeft: 20, margin: 20, }}>Acesso Rápido</Text>
          <View style={styles.colunas}>
            <View style={styles.opcoesMenu}>
              <TouchableOpacity style={styles.box} onPress={() => this.props.navigation.navigate('Dashboard', { 'codigo': numeroEmpresa })}>
                <Image style={styles.imagen} source={require('../assets/rota.png')} />
                <Text style={styles.textBox} >Partidas/GPS</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.opcoesMenu2}>
              <TouchableOpacity style={styles.box} onPress={()=>Alert.alert("Em Desenvolvimento")}>
                <Image style={styles.imagen} source={require('../assets/rota.png')} />
                <Text style={styles.textBox}>Frota</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  boddy: {
    flex: 1,
  },
  dashMenu: {
    flex: 1,
    backgroundColor: '#EDFDF1'
  },
  colunas: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 20
  },
  opcoesMenu: {

    //backgroundColor: 'green',
    flexDirection: 'column',
    flexWrap: `wrap`,

  },
  opcoesMenu2: {
    //backgroundColor: 'red',
    flexDirection: 'column',
    flexWrap: `wrap`,
  },
  box: {
    //backgroundColor: 'red', 
    width: 150,
    height: 80,
    margin: 5,
    borderRadius: 30,
    borderColor: `#1E4014`,
    //borderWidth: 2,
    backgroundColor: 'white'


  },
  imagen: {
    width: 30,
    height: 30,
    alignSelf: "flex-start",
    alignContent: 'flex-start',
    margin: 10,
  },
  textBox: {
    marginLeft: 10,
  }


});
