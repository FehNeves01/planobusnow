import React, { Component } from 'react'
import { Text, View, StyleSheet,Alert, FlatList, TouchableOpacity } from 'react-native'

export default class ultimasPartidas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            sentido: '',
            linha: '',
            numeroEmpresa: '',
        }
    }

    preparaDados = (responseJson) => {
        var dados = [];
        if (responseJson.length > 10) {
            for (let index = responseJson.length - 1; index > responseJson.length - 11; index--) {
                dados.push(responseJson[index]);
            }
            dados=(responseJson);
        }else {
            dados=(responseJson);
        }
        this.setState({
            data: dados || []
        })
    }
    componentDidMount = () => {
        const { navigation } = this.props
        const sentido = navigation.getParam('sentido');
        const numeroEmpresa = navigation.getParam('numeroEmpresa');
        const linha = navigation.getParam('linha');
        this.setState({
            linha: linha,
            sentido: sentido,
        });
        const url = 'https://www.planobusweb.com.br/gethttppage?password=flksdahfuiavj4995u903t9t39&url=http://gps.ipk.com.br/mobile/?ee=' + numeroEmpresa + '%26acao=operacao%26lin=' + linha + '%26term=' + sentido;
        console.log(url)
        Alert.alert("Em Desenvolvimento")
        // const method = { method: 'POST' };

        // fetch(url, method)
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //         this.preparaDados(responseJson.viagens);
        //         console.log(preparaDados)
        //     })
        //     .catch((error) => { console.error(error) });
    }

    render() {
        const dados = this.state.data
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.sentidoText}>{this.state.sentido}</Text>
                    <View style={styles.colunas}>
                        <Text style={styles.colunasText}>{'Código'}</Text>
                        <Text style={styles.colunasText}>{'Prog.'}</Text>
                        <Text style={styles.colunasText}>{'Real.'}</Text>
                    </View>
                </View>
                {/* <FlatList
                    style={{ marginBottom: 65 }}
                    data={dados}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.itemDaLista}>
                            <Text style={styles.itemDaListaTxt}>{item.carro}</Text>
                            <Text style={styles.itemDaListaTxt}>{item.horaprev}</Text>
                            <Text style={styles.itemDaListaTxt}>{item.horareal.replace("/", "")}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.codigo}
                >
                </FlatList> */}

            </View>
        )
    }
}
var styles = StyleSheet.create({
    container: { flex: 1, },
    header: { height: 60, backgroundColor: '#B1E89E', },
    sentidoText: { alignSelf: 'center', color: 'white', fontSize: 16, fontWeight: 'bold' },
    colunasText: { color: 'white', fontSize: 16, },
    colunas: { flexDirection: 'row', justifyContent: 'space-around', alignContent: "flex-end", paddingTop: 20, paddingBottom: 10, },
    itemDaLista: { borderBottomColor: 'rgba(0,0,0, 0.05)', borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-around', height: 50, alignContent: 'center' },
    itemDaListaTxt: { alignSelf: "center" }
})