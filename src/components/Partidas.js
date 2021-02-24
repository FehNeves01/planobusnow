import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import Header from '../components/partidas/header'
export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      numeroEmpresa: '',
      s: '',
      dados: [],
      isLoading: 0,
    }
  }


  buscarJson(numero, data) {
    var request = new XMLHttpRequest();


    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        this.transformaJson(request.responseText);
      } else {
        console.warn('error');
      }
    };
    // const urlHttps ='https://www.planobusweb.com.br/gethttppage?password=flksdahfuiavj4995u903t9t39&url=http://gps.ipk.com.br/mobile/?acao=saidas%26ee=' + numero + '%26dt=' + data
    const urlHttps = 'https://www.planobusweb.com.br/gethttppage?password=flksdahfuiavj4995u903t9t39&url=http://gps.ipk.com.br/mobile/?acao=saidas%26ee=' + numero + '%26dt=' + '12/02/2020'
    console.log(urlHttps)
    request.open('POST', urlHttps);
    request.send();
  }
  transformaJson(request) {

    var dadosParaJson = JSON.parse(request);

    this.setState({
      dados: dadosParaJson.linhas || [],
      isLoading: 1
    });


  }
  componentDidMount() {
    const { navigation } = this.props
    const numeroEmpresa = navigation.getParam('numeroEmpresa');
    this.setState({
      numeroEmpresa: numeroEmpresa,
    })
    const data = navigation.getParam('data');
    this.buscarJson(numeroEmpresa, data);
  }



  render() {
    const dados = this.state.dados
    {
      if (this.state.isLoading === 1) {
        return (
          <SafeAreaView style={styles.container}>
            <View style={styles.header}>
              <View style={styles.headerColLinha}><Text style={{ fontWeight: 'bold', alignSelf: 'center', color: 'white' }}>Linha</Text><Text style={{ alignSelf: 'center', color: 'white' }}>Código.</Text></View>
              <View style={styles.headerColTP}><Text style={{ fontWeight: 'bold', alignSelf: 'center', color: 'white' }}>TP</Text><Text style={{ alignSelf: 'center', color: 'white' }}>Prog. Real.</Text></View>
              <View style={styles.headerColTS}><Text style={{ fontWeight: 'bold', alignSelf: 'center', color: 'white' }}>TS</Text><Text style={{ alignSelf: 'center', color: 'white' }}>Prog. Real.</Text></View>
            </View>
            <View>
              <FlatList
                style={{ marginBottom: 65 }}
                data={dados}
                renderItem={({ item }) => (

                  <View style={styles.itemPartidas}>
                    <View style={styles.itemPartidasColLinha}>
                      <Text >{item.codigo}</Text>
                    </View>
                    <TouchableOpacity style={styles.itemPartidasColTP} onPress={() => this.props.navigation.navigate('UltimasPartidas', { 'numeroEmpresa': this.state.numeroEmpresa, 'sentido': 'TP', 'linha': item.codigo })}>
                      <View style={styles.itemPartidasColProgRel}>
                        <Text style={styles.textList}>{item.tpvgprog}</Text>
                        {/* <Text style={styles.textList} >{item.tpvgreal}</Text> */}
                        <Text style={styles.textList} >{item.tpvgprog}</Text>
                      </View>
                      <View style={styles.itemPartidasIndices}>
                        {/* <Text style={styles.textList}>{((item.tpvgreal / item.tpvgprog) * 100).toFixed(0) + '%'}</Text> */}
                        <Text style={styles.textList}>{((item.tpvgprog / item.tpvgprog) * 100).toFixed(0) + '%'}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemPartidasColTS} onPress={() => this.props.navigation.navigate('UltimasPartidas', { 'numeroEmpresa': this.state.numeroEmpresa, 'sentido': 'TS', 'linha': item.codigo })}>
                      <View style={styles.itemPartidasColProgRel}>
                        <Text style={styles.textList}>{item.tsvgprog}</Text>
                        {/* <Text style={styles.textList} >{item.tsvgreal}</Text> */}
                        <Text style={styles.textList} >{item.tsvgprog}</Text>
                      </View>
                      <View style={styles.itemPartidasIndices}>
                        <Text style={styles.textList}>{((item.tsvgprog / item.tsvgprog) * 100).toFixed(0) + '%'}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={item => item.codigo}
              >
              </FlatList>
            </View>

          </SafeAreaView>
        );
      }else{
        return (
          <SafeAreaView style={styles.loading}>
          <Image style={styles.image} source={require('../assets/Blocks.gif')} />
          </SafeAreaView>
        );
      }
    }

  }
}
var styles = StyleSheet.create({
  container: { flex: 1, },
  header: { height: 60, backgroundColor: '#B1E89E', flexDirection: 'row', justifyContent: 'space-around', paddingRight: 10, paddingLeft: 10, color: 'white' },
  headerColLinha: { justifyContent: 'center', alignContent: 'center' },
  headerColTP: { justifyContent: 'center', },
  headerColTS: { justifyContent: 'center', },
  loading: {flex: 1, alignItems: `center`, justifyContent:`center`, backgroundColor: '#EDFDF1'},
  itemPartidas: { borderBottomColor: 'rgba(0,0,0, 0.05)', borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-around', paddingRight: 10, paddingTop: 10, },
  itemPartidasColProgRel: { flexDirection: 'row', alignSelf: 'baseline', },
  itemPartidasColLinha: { width: 60, justifyContent: 'center' },
  itemPartidasIndices: { alignSelf: 'center', paddingBottom: 5, },
  textList: { fontSize: 15, alignSelf: 'center', marginLeft: 20 },
  image:{width:50,height:50},
})