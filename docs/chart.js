google.charts.load('current', { packages: ['corechart', 'bar'] });
google.charts.setOnLoadCallback(CarregarDados);

let QuantidadeParaPorcentagem = function (qtd, total) {
    return ((qtd / total) * 100);
}

let CalculaSatisfacao = function (pesquisas) {
    let qtdMuitoSatisfeito = 0;
    let qtdSatisfeito = 0;
    let qtdInsastifeito = 0;
    let qtdMuitoInsastifeito = 0;

    for (let index = 0; index < pesquisas.length; ++index) {

        if (pesquisas[index].IndiceSatisfacao == 3)
            qtdMuitoSatisfeito++;
        if (pesquisas[index].IndiceSatisfacao == 2)
            qtdSatisfeito++;
        if (pesquisas[index].IndiceSatisfacao == 1)
            qtdInsastifeito++;
        if (pesquisas[index].IndiceSatisfacao == 0)
            qtdMuitoInsastifeito++;
    }

    qtdMuitoSatisfeito = QuantidadeParaPorcentagem(qtdMuitoSatisfeito, pesquisas.length);
    qtdSatisfeito = QuantidadeParaPorcentagem(qtdSatisfeito, pesquisas.length);
    qtdInsastifeito = QuantidadeParaPorcentagem(qtdInsastifeito, pesquisas.length);
    qtdMuitoInsastifeito = QuantidadeParaPorcentagem(qtdMuitoInsastifeito, pesquisas.length);

    let satisfacao = [qtdMuitoSatisfeito, qtdSatisfeito, qtdInsastifeito, qtdMuitoInsastifeito];
    drawSatisfacao(satisfacao);
}

let CalculaChanceIndicacao = function (pesquisas) {

    let total = 0;

    for (let index = 0; index < pesquisas.length; ++index) {

        total += pesquisas[index].ChanceIndicacao;
    }

    let porcentagem = (total / pesquisas.length) * 10;
    $("#chanceIndicacao").html(Number(Math.round(porcentagem + 'e2') + 'e-2') + '%');

}

function CarregarDados() {

    ConsultaPublicacoes(function (pesquisas) {
        CalculaSatisfacao(pesquisas);
        CalculaChanceIndicacao(pesquisas);
    });
}

function AtualizaDados() {
    ConsultAtualizarPublicacoes(function (pesquisas) {
        CalculaSatisfacao(pesquisas);
        CalculaChanceIndicacao(pesquisas);
    });
}

function drawSatisfacao(satisfacao) {

    var data = google.visualization.arrayToDataTable([
        ['Indice', 'Porcentagem', { role: 'style' }],
        ['Muito Satisfeito', satisfacao[0], '#5cb85c'],
        ['Satisfeito', satisfacao[1], '#0275d8'],
        ['Insatisfeito', satisfacao[2], '#f0ad4e'],
        ['Muito Insatisfeito', satisfacao[3], '#d9534f']
    ]);

    var options = {
        title: 'Indice de Satisfação',
    };

    var materialChart = new google.visualization.ColumnChart(document.getElementById('chart_satisfacao'));
    materialChart.draw(data, options);
}


$(document).ready(function () {
    setInterval(() => {
        AtualizaDados();
    }, 15000);
})
