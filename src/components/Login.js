
import React, { Component } from 'react';
import { Image, View, TextInput, Alert, StyleSheet, Text, TouchableOpacity, Keyboard, SafeAreaView } from 'react-native';




export default class Login extends Component {



  validaServer = () => {
    var s = this.state;
    var login = s.usuario;
    var senha = s.senha;
    
    if ((login != '') && (senha != '')) {
      let url = 'https://www.planobusweb.com.br/gethttppage?password=flksdahfuiavj4995u903t9t39&url=http://gps.ipk.com.br/mobile/?acao=login%26login=' + login + '%26' + 'senha=' + senha;
      console.log(url)
      const requestInfo = { method: 'POST', }
      fetch(url, requestInfo).then(r1 => {
        if (r1.ok) return r1.json();
        throw new Error("Não foi possível efetuar o login.");

        
      }).then(r1 => {
        
        this.setState({
          numeroEmpresa:r1.empresa,
        })
      
        if (r1.codigo === '100') {
          this.props.navigation.navigate('Home',  {'codigo':this.state.numeroEmpresa});
        } else if ((r1.codigo === '102') || (r1.codigo === '103')) {
          Alert.alert("Dados Incorretos", "Usuario ou senha digitados nao existem");
        }
      }) //.then(r2 => console.warn(r1));

    }
  }

  constructor(props) {
    super(props);
    this.state = {
      usuario: '',
      senha: '',
      numeroEmpresa:'',
    }
  }

  render() {

    return (

      <SafeAreaView style={styles.boddy} >
        <View style={styles.footer} >
          <Text style={styles.textFooter} >0.0.2</Text>
        </View>
        <View style={styles.container}>
          <View >
            <Image style={styles.image} source={require('../assets/Logo_Login.png')} />
          </View>

          <View style={styles.caixaLogin} >
            <TextInput style={styles.loginEsenha} placeholder="Login" onChangeText={text => this.state.usuario = text} />
            <TextInput style={styles.loginEsenha} placeholder="Senha" secureTextEntry={true} onChangeText={text => this.state.senha = text} />
            <TouchableOpacity style={styles.botao} onPress={this.validaServer}>
              <Text style={styles.txtButtomn}> Login </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

}

const styles = StyleSheet.create({
  boddy: {
    flex: 1,
    backgroundColor: '#BAFEBA',
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
  },
  caixaLogin: {

    flex: 0.5,
    alignSelf: "stretch",
    marginLeft: 50,
    marginRight: 50,

  },
  loginEsenha: {
    borderBottomWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    padding: 10
  },
  botao: {
    height:40,
    backgroundColor: 'green',
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    
  },
  image: {

    width: 100,
    height: 100,
    borderRadius: 20,

  },
  footer: {
  },
  textFooter: {
    textAlign: 'right',
    color: "grey",
    marginRight: 10,
    marginBottom: 5,
  },
  txtButtomn:{color:'white'},
});


