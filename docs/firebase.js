var firebaseConfig = {
    apiKey: "AIzaSyCHNeZ-DnYx0NgIEJlTtV1TCRGoYupESCY",
    authDomain: "questionarioviamia.firebaseapp.com",
    databaseURL: "https://questionarioviamia.firebaseio.com",
    projectId: "questionarioviamia",
    storageBucket: "questionarioviamia.appspot.com",
    messagingSenderId: "1081072714902",
    appId: "1:1081072714902:web:3f85c129805f39c6"
}

function ConsultaPublicacoes(callback) {
    firebase.initializeApp(firebaseConfig);
    let database = firebase.database();
    let pesquisas = [];


    database.ref().child('pesquisa')
        .orderByKey()
        .once('value')
        .then((snapshot) => {
            snapshot.forEach(element => {
                pesquisas.push(element.val());
            });

            callback(pesquisas);
        })
}

function ConsultAtualizarPublicacoes(callback) {

    let database = firebase.database();
    let pesquisas = [];

    database.ref().child('pesquisa')
        .orderByKey()
        .once('value')
        .then((snapshot) => {
            snapshot.forEach(element => {
                pesquisas.push(element.val());
            });

            callback(pesquisas);
        })
}
