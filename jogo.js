var erros = 0;
var listaCartas = ["image1", "image2", "image3", "image4", "image5", "image6", 
"image7", "image8", "logo", "zero"]

var cartasJuntas;
var tabuleiro = [];
var linhas = 4;
var colunas = 5;
var carta1selecionada;
var carta2selecionada;

window.onload = function() {

    cartasEmbaralhadas();
    inicioJogo();

}

function cartasEmbaralhadas () {
    
    cartasJuntas = listaCartas.concat(listaCartas);
    console.log(cartasJuntas);

    for (let i = 0; i < cartasJuntas.length; i++) {
        let j = Math.floor(Math.random() * cartasJuntas.length);

        let tempo = cartasJuntas[i];
        cartasJuntas[i] = cartasJuntas[j];
        cartasJuntas[j] = tempo;
    }
    console.log(cartasJuntas);
}

function inicioJogo () {
    
    for (let l = 0; l < linhas; l++) {
        let linhas = [];
        for (let c = 0; c < colunas; c++) {
            let CardImagem = cartasJuntas.pop();
            linhas.push(CardImagem);

            let card = document.createElement("img");
            card.id = l.toString()+ "-" + c.toString();
            card.src = CardImagem + ".png";
            card.classList.add("carta");
            card.addEventListener("click", selecaoCartas);
            document.getElementById("tabuleiro").append(card);
        }
        tabuleiro.push(linhas);
    }
    console.log(tabuleiro);
    setTimeout(esconderCartas, 1000);
}

function esconderCartas() {
    
    for (let l = 0; l < linhas; l++) {
        for (let c = 0; c < colunas; c++){
            let card = document.getElementById(l.toString() + "-" + c.toString());
            card.src = "caixa.jpg";
        }
    }
}

function selecaoCartas() {

if (this.src.includes("caixa")){
    if (!carta1selecionada) {
        carta1selecionada = this;

        let coordenadas = carta1selecionada.id.split("-");
        let l = parseInt(coordenadas[0]);
        let c = parseInt(coordenadas[1]);

        carta1selecionada.src = tabuleiro [l][c] + ".png";

    } else if (!carta2selecionada && this != carta1selecionada) {

        carta2selecionada = this;

        let coordenadas = carta2selecionada.id.split("-");

        let l = parseInt(coordenadas[0]);
        let c = parseInt(coordenadas[1]);

        carta2selecionada.src = tabuleiro [l][c] + ".png";
        setTimeout(atualizar, 1000);

    }

    }
}

function atualizar() {

    if (carta1selecionada.src != carta2selecionada.src) {
        carta1selecionada.src = "caixa.jpg";
        carta2selecionada.src = "caixa.jpg";
        erros += 1;
        document.getElementById("erro").innerText = erros;
    }
    carta1selecionada = null;
    carta2selecionada = null;
}
