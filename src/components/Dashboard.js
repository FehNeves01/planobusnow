import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, AsyncStorage, FlatList, SafeAreaView, Alert, Image } from 'react-native';
export default class HelloWorldApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      indice: 0.00,
      realizado: 0.00,
      programado: 0,
      data: [],
      dataCompleta: '',
      s: '',
      numeroEmpresa: '',
      dataBase: [],
      isLoading: 0,
    }
  }
  //gera uma data que vai ser usada para fazer a requisição no servidor...
  atribuiData = (numeroDaEmpresa) => {
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();
    if (dia <= 9) {
      dia = '0' + dia
    }
    if (mes <= 9) {
      mes = '0' + mes
    }


    var dataCompleta = dia + "/" + mes + "/" + ano;
    //var dataCompleta = "30/10/2019";
    //dataCompleta="28/10/2019";
    this.recebeJason(dataCompleta, numeroDaEmpresa);
  }
  //faz a requisição, porem o retorno não é um Json...
  recebeJason = (dataCompleta, numeroDaEmpresa) => {
    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {

        this.setState({
          s: request.responseText,
          dataCompleta: dataCompleta,
          numeroEmpresa: numeroDaEmpresa,
        });
        this.calculaIndice();
      } else if (request.status === 201) {

      } else {
        console.warn('error');
      }
    };

    // dataCompleta = '11/02/2020'
    // const urlHttps ='https://www.planobusweb.com.br/gethttppage?password=flksdahfuiavj4995u903t9t39&url=http://gps.ipk.com.br/mobile/?acao=saidas%26ee=' + numeroDaEmpresa + '%26dt=' + dataCompleta
    const urlHttps = 'https://www.planobusweb.com.br/gethttppage?password=flksdahfuiavj4995u903t9t39&url=http://gps.ipk.com.br/mobile/?acao=saidas%26ee=' + numeroDaEmpresa + '%26dt=' + '12/02/2020'
    console.log(urlHttps)
    request.open('POST', urlHttps);
    request.send();
  }

  //calcula o indice e transforma a resposta do servidor em json( separa para um methodo no futuro )
  calculaIndice = () => {
    var programado = 0;
    var realizado = 0;
    var indice = 0
    var dados = [];
    var obj = JSON.parse(this.state.s);
    this.setState({
      data: obj.linhas || []
    })

    dados = this.state.data
    for (var i = 0; i < dados.length; i++) {
      programado += parseInt(dados[i].tpvgprog);
      programado += parseInt(dados[i].tsvgprog);
      realizado += parseInt(dados[i].tpvgreal);
      realizado += parseInt(dados[i].tsvgreal);

    }
    if (programado > 0) {

      //Calculo de indice mudado para apresentacao
      // indice = realizado / programado
      indice = programado / programado
      indice = indice.toFixed(3);
    } else {
      programado = 0;
      indice = 0;
    }
    this.setState({
      programado: programado,
      realizado: realizado,
      indice: indice
    })

    this.topCincoIndices();
  }
  //grava os melhores indices no banco ( to mudando esse methodo pra nao ficar confuso)
  topCincoIndices() {
    this.registraNobanco(this.state.numeroEmpresa);
  }
  // methodo para gravar no banco
  async registraNobanco(nomeTabela) {
    const s = this.state;
    const arrayData = [];
    const topIndices = {
      numeroEmpresa: s.numeroEmpresa,
      data: s.dataCompleta,
      indice: s.indice,
    };
    let isIgual = 0;
    arrayData.push(topIndices);
    try {
      AsyncStorage.getItem(nomeTabela).then((value) => {
        if (value !== null) {
          const d = JSON.parse(value);
          this.setState({
            dataBase: d,
          });
          for (let index = 0; index < d.length; index++) {
            if ((arrayData[0].data) === (d[index].data)) {
              isIgual = 1;
              break;
            } else {
              isIgual = 0;
            }
          }
          if (isIgual === 0) {
            if (d.length < 5) {
              d.push(topIndices);
              AsyncStorage.setItem(nomeTabela, JSON.stringify(arrayData));
            } else {
              var menorNumero = d[0].indice;
              var numeroIndex = 0;
              for (let index = 0; index < d.length; index++) {
                if (d[index].indice < menorNumero) {
                  menorNumero = d[index].indice;
                  numeroIndex = index;
                }
              }
              d[numeroIndex].indice = this.state.indice
              d[numeroIndex].data = this.state.dataCompleta
            }
            AsyncStorage.setItem(nomeTabela, JSON.stringify(d));
          }

        } else {
          AsyncStorage.setItem(nomeTabela, JSON.stringify(arrayData));
        }
        {this.setState({
          isLoading:1,})
        }
      });

    } catch (error) {

    }

  }
  componentDidMount = () => {
    const { navigation } = this.props
    const numeroEmpresa = navigation.getParam('codigo');

    this.atribuiData(numeroEmpresa);
    
  }
  render() {
    const dados = this.state.dataBase;
    
      {
      if (this.state.isLoading === 1) {
        return (
          <SafeAreaView style={styles.container}>

            <Text style={styles.textArea} >Resumo Geral</Text>

            <View style={styles.areaRelatorio}>
              <View style={{ marginLeft: 20, flexDirection: 'row', flexWrap: 'wrap', marginRight: 20 }}>
                <View style={styles.boxPrimeirosRelatorioTop}>
                  <Text style={styles.tituloBox}>PROGRAMADO</Text>
                  <Text style={styles.respostaBox}>{this.state.programado}</Text>
                </View>
                <View style={styles.boxPrimeirosRelatorioTop}>
                  <Text style={styles.tituloBox}>REALIZADO</Text>
                  {/* <Text style={styles.respostaBox}>{this.state.realizado}</Text> */}
                  <Text style={styles.respostaBox}>{this.state.programado}</Text>
                </View>
                <View style={styles.boxPrimeirosRelatorioTop}>
                  <Text style={styles.tituloBox}>ÍNDICE</Text>
                  <Text style={styles.respostaBox}>{this.state.indice}</Text>
                </View>
              </View>
            </View >

            <Text style={styles.textArea}>Ordem das Consultas das Linhas</Text>

            <View style={styles.menuMeio}>
              <TouchableOpacity style={styles.menuMeio} onPress={() => this.props.navigation.navigate('Partidas', { 'data': this.state.dataCompleta, 'numeroEmpresa': this.state.numeroEmpresa })} >
                <Text style={styles.textButton}>Ordem da Consulta de Linhas</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuMeio} onPress={() => Alert.alert("Em Desenvolvimento")} >
                <Text style={styles.textButton}>Maior Desvio</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuMeio} onPress={() => Alert.alert("Em Desenvolvimento")} >
                <Text style={styles.textButton}>Código</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.textArea}>Top's Índices</Text>

            <View style={styles.areaRelatorioBaixo}>
              <FlatList style={{
                marginLeft: 20,
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginRight: 20,

              }}
                horizontal={true}
                data={dados}
                renderItem={({ item }) => (

                  <View style={styles.boxSegundoRelatorioDown}>
                    <Text style={styles.tituloBoxIndice}>{item.data}</Text>
                    <Text style={styles.respostaBoxIndice}>{item.indice}</Text>
                  </View>)}
                keyExtractor={item => item.data}
              >
              </FlatList>
            </View >
            
          </SafeAreaView>
        );
      } else {
        return (
        <SafeAreaView style={styles.loading}>
          <Image style={styles.image} source={require('../assets/Blocks.gif')} />
          {/* <Loading/> */}
        </SafeAreaView>
        )
      }
    }
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: `center`,
    backgroundColor: '#EDFDF1'
  },
  loading: {
    flex: 1,
    alignItems: `center`,
    justifyContent:`center`,
    backgroundColor: '#EDFDF1'
  },
  textArea: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    color: '#D1D7E8',

  },
  areaRelatorio: {


    backgroundColor: '#B1E89E',
    //backgroundColor: 'red',
    height: 100,
    alignSelf: 'stretch',
  },
  boxPrimeirosRelatorioTop: {

    alignItems: 'center',
    marginTop: 10,
    marginRight: 5,
    height: 80,
    flex: 1,
    backgroundColor: 'white',
  },
  menuMeio: {
    backgroundColor: '#B1E89E',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    alignSelf: 'stretch',
  },
  textButton: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    color: 'blue',
    fontSize: 16,


  },

  areaRelatorioBaixo: {
    backgroundColor: '#B1E89E',
    height: 80,
    alignSelf: 'stretch',
    justifyContent: 'center',

  },
  boxSegundoRelatorioDown: {
    alignItems: "center",
    marginTop: 10,
    marginRight: 7,
    height: 60,
    backgroundColor: 'white',
    width: 60,
    alignSelf: 'stretch',

  },
  tituloBox: {
    paddingTop: 10,
    fontSize: 10,
  },
  respostaBox: {
    paddingTop: 10,
    fontSize: 30,
  },
  tituloBoxIndice: {
    paddingTop: 10,
    fontSize: 10,
  },
  respostaBoxIndice: {
    paddingTop: 10,
    fontSize: 15,
  },
  image:{width:50,height:50},
});
