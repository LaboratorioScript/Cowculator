var display = document.getElementById("display");

var listenerBtn = [];

// Botões de operador
listenerBtn.push(document.getElementById("sum"));
listenerBtn.push(document.getElementById("subtraction"));
listenerBtn.push(document.getElementById("division"));
listenerBtn.push(document.getElementById("multiplication"));

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
listenerBtn.push(document.getElementById("point"));

var pointCounter = 0;
var pointLimit = 1;

for (var i = 0; i < listenerBtn.length; i++) {
    listenerBtn[i].addEventListener("click", writeOnDisplay);
}

btnResult.onclick = function () {
    calculateResult();
};

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

function verifyOperator(operatorValue) {
    switch (operatorValue) {
        case "*":
            return true;
        case "/":
            return true;
        case "+":
            return true;
        case "-":
            return true;
        default:
            return false;
    }
}

function calculateArray(exp) {
    exp = exp.toString().split("+");
    for (a = 0; a < exp.length; a++) {
        exp[a] = exp[a].split("-");
        for (b = 0; b < exp[a].length; b++) {
            exp[a][b] = exp[a][b].split("*");
            for (c = 0; c < exp[a][b].length; c++) {
                exp[a][b][c] = exp[a][b][c].split("/");
                exp[a][b][c] = divideArray(exp[a][b][c]);
            }
            exp[a][b] = multiplyArray(exp[a][b]);
        }
        exp[a] = subtractArray(exp[a]);
    }
    exp = sumArray(exp);

    return exp;
}

function multiplyArray(parameter) {
    var resultMult = 1;
    for (var x = 0; x < parameter.length; x++) {
        resultMult *= parameter[x];
    }
    return resultMult;
}

function divideArray(parameter) {
    var resultDiv = parameter[0];
    for (var x = 1; x < parameter.length; x++) {
        resultDiv /= parameter[x];
    }
    return resultDiv;
}

function subtractArray(parameter) {
    var resultSub = parameter[0];
    for (var x = 1; x < parameter.length; x++) {
        resultSub -= parameter[x];
    }
    return resultSub;
}

function sumArray(parameter) {
    var resultSum = 0;
    for (var x = 0; x < parameter.length; x++) {
        resultSum += parameter[x];
    }
    return resultSum;
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
                "Divisão": "../img/divisao.png", 
                "Multiplicação": "../img/multiplicacao.png", 
                "Subtração": "../img/subtracao.png", 
                "Adição": "../img/adicao.png"
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

