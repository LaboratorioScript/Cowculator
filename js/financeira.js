var display = document.getElementById("display");
var valor = document.getElementById("valorReais");
var tempo = document.getElementById("mes/ano");
var juros = document.getElementById("valorJuros");

var listenerBtn = [];

// Botões de operador
listenerBtn.push(document.getElementById("valorReais"));
listenerBtn.push(document.getElementById("mes/ano"));
listenerBtn.push(document.getElementById("valorJuros"));

// Botões de números
listenerBtn.push(document.getElementById("num0"));
listenerBtn.push(document.getElementById("num1"));
listenerBtn.push(document.getElementById("num2"));
listenerBtn.push(document.getElementById("num3"));
listenerBtn.push(document.getElementById("num4"));
listenerBtn.push(document.getElementById("num5"));
listenerBtn.push(document.getElementById("num6"));
listenerBtn.push(document.getElementById("num7"));
listenerBtn.push(document.getElementById("num8"));
listenerBtn.push(document.getElementById("num9"));

// Botões adicionais
var btnResult = document.getElementById("result");
var btnCleanDisplay = document.getElementById("cleanDisplay");
var btnDeleteDigit = document.getElementById("deleteDigit");


var pointCounter = 0;
var pointLimit = 1;

for (var i = 0; i < listenerBtn.length; i++) {
    listenerBtn[i].addEventListener("click", writeOnDisplay);
}

btnDeleteDigit.onclick = function () {
    deleteLastDigit();
};

btnCleanDisplay.onclick = function () {
    display.value = "";
    pointCounter = 0;
};

function calculateResult() {
    if (verifyOperator(display.value.substring(display.value.length - 1, display.value.length))) {
        deleteLastDigit(); // Ignora operador se estiver no final
    }

    var calculatedValue = calculateArray(display.value);

    if (calculatedValue || calculatedValue == "0") {
        display.value = calculatedValue;
    }
}

function deleteLastDigit() {
    if (display.value.length > 0) {
        if (display.value[display.value.length - 1] === ".") { // Reseta contador de pontos decimais
            pointCounter = 0;
        }
        display.value = display.value.substring(0, display.value.length - 1);
    }
}

function writeOnDisplay() {
    lastDigit = this.value;

    if (verifyOperator(lastDigit)) {
        pointCounter = 0;
        if (verifyOperator(display.value.substring(display.value.length - 1, display.value.length))) { // Substitui operador anterior
            deleteLastDigit();
        }
    }

    if (verifyDecimalPoint(lastDigit) === true) {
        pointCounter++;
        if (pointCounter > pointLimit) {
            return;
        }
    }
    display.value += lastDigit;
}

function verifyDecimalPoint(valorDigitado) {
    if (valorDigitado === ".") {
        return true;
    } else {
        return false; // Limita o número de pontos decimais
    }
}

function verifyOperator(value) {
    return ["valor", "valorJuros", "tempo"].includes(value);
}
function calcular() {
    //valores do formulário
    let capital = parseFloat(valor.value);   // valor inicial
    let taxaDeJuros = parseFloat(juros.value)/100;      // taxa de juros
    let quantidadeMeses = parseInt(tempo.value);    // tempo em meses

    // Validação de entrada
    if (isNaN(capital) || isNaN(taxaDeJuros) || isNaN(quantidadeMeses) || capital <= 0 || taxaDeJuros < 0 || quantidadeMeses <= 0) {
        console.log("Por favor, insira valores válidos.");
        display.value = "Erro: Valores inválidos";
        return;
    }

    // Cálculo do montante usando Math.pow()
    let montante = capital * Math.pow(1 + taxaDeJuros, quantidadeMeses);

    // Exibe o resultado formatado
    console.log("Montante: " + montante.toFixed(2));
    display.value = montante.toFixed(2);  // Mostra o montante com 2 casas decimais
}

// Função para exibir o modal com a imagem
function showModal(imageSrc) {
    const modal = document.getElementById('infoModal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = imageSrc;
    modal.style.display = 'flex'; // Exibe o modal
}

// Função para fechar o modal
function closeModal() {
    const modal = document.getElementById('infoModal');
    modal.style.display = 'none'; // Oculta o modal
}

// Adicionando eventos de clique aos ícones de informação
document.addEventListener("DOMContentLoaded", function () {
    const infoIcons = document.querySelectorAll(".info-icon");

    infoIcons.forEach(icon => {
        icon.addEventListener("click", function (event) {
            event.stopPropagation(); // Impede que o clique no ícone feche o botão
            const operation = icon.title; // Obtém o texto do atributo title

            // Mapeia operações para imagens
            const imageMap = {
                "valor": "../img/valor.png", 
                "tempo": "../img/tempo.png", 
                "juros": "../img/juros.png", 
            };

            const imageSrc = imageMap[operation] || ""; // Obtém o caminho da imagem
            if (imageSrc) {
                showModal(imageSrc);
            }
        });
    });

    // Fecha o modal ao clicar fora da imagem
    const modal = document.getElementById('infoModal');
    modal.addEventListener("click", closeModal);
});

