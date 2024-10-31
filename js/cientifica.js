var display = document.getElementById("display");

var listenerBtn = [];

// Botões de operador
listenerBtn.push(document.getElementById("seno"));
listenerBtn.push(document.getElementById("cosseno"));
listenerBtn.push(document.getElementById("tangente"));
listenerBtn.push(document.getElementById("raiz"));
listenerBtn.push(document.getElementById("raizn"));
listenerBtn.push(document.getElementById("log"));
listenerBtn.push(document.getElementById("divs"));
listenerBtn.push(document.getElementById("pot2"));
listenerBtn.push(document.getElementById("pot"));

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
    if (verifyOperator(display.value.slice(-1))) {
        deleteLastDigit(); // Ignora operador se estiver no final
    }

    var calculatedValue = calculateArray(display.value);

    if (calculatedValue !== undefined) {
        display.value = calculatedValue;
    }
}

function deleteLastDigit() {
    if (display.value.length > 0) {
        if (display.value[display.value.length - 1] === ".") {
            pointCounter = 0; // Reseta contador de pontos decimais
        }
        display.value = display.value.slice(0, -1);
    }
}

function writeOnDisplay() {
    var lastDigit = this.value;

    if (verifyOperator(lastDigit)) {
        pointCounter = 0;
        if (verifyOperator(display.value.slice(-1))) {
            deleteLastDigit(); // Substitui operador anterior
        }
    }

    if (verifyDecimalPoint(lastDigit)) {
        pointCounter++;
        if (pointCounter > pointLimit) {
            return; // Limita o número de pontos decimais
        }
    }
    display.value += lastDigit;
}

function verifyDecimalPoint(valorDigitado) {
    return valorDigitado === ".";
}

function verifyOperator(value) {
    return ["/", "^", "seno", "cosseno", "tangente", "raiz", "raizn", "log", "divs", "pot2", "pot"].includes(value);
}

var verificador;

function verificaRaizN(){
    verificador = 1;
}
function verificaSeno(){
    verificador = 2;
}
function verificaCosseno(){
    verificador = 3;
}
function verificaTan(){
    verificador = 4;
}
function verificaLog(){
    verificador = 5;
}

function calculateArray(expression) {

    try {
        // Substituições para funções
        expression = expression.replace(/raiz\(([^)]+)\)/g, (match, p1) => Math.sqrt(eval(p1)));
        expression = expression.replace(/raizn\(([^)]+),(\d+)\)/g, (match, p1, p2) => Math.pow(eval(p1), 1 / eval(p2)));
        expression = expression.replace(/(\d+)\^(\d+)/g, (match, base, exponent) => Math.pow(eval(base), eval(exponent)));
        console.log(expression);

             if(verificador == 1){
                expression = expression+")";
                console.log(expression);
                verificador = 0;    

             }else if(verificador == 2){
                expression = expression+")"
                console.log(expression);
                expression = expression.replace(/seno\(([^)]+)\)/g, (match, p1) => Math.sin(eval(p1) * Math.PI / 180));
                verificador = 0;
             }
             else if(verificador == 3){
                expression = expression+")"
                console.log(expression);
                expression = expression.replace(/cosseno\(([^)]+)\)/g, (match, p1) => Math.cos(eval(p1) * Math.PI / 180));
                verificador = 0;
             }
             else if(verificador == 4){
                expression = expression+")"
                console.log(expression);
                expression = expression.replace(/tangente\(([^)]+)\)/g, (match, p1) => Math.tan(eval(p1) * Math.PI / 180));
                verificador = 0;
             }
             else if(verificador == 5){
                expression = expression+")"
                console.log(expression);
                expression = expression.replace(/log\(([^)]+)\)/g, (match, p1) => Math.log10(eval(p1)));
                verificador = 0;
             }
             

        // Usa eval para calcular o resultado final
        return eval(expression).toFixed(4);
    } catch (error) {
        console.error("Erro ao calcular:", error);
        return "Erro"; // Retorna mensagem de erro se o cálculo falhar
    }
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
                "Seno": "../img/seno.png",
                "Cosseno": "../img/cosseno.png", 
                "Tangente": "../img/tangente.png", 
                "Raiz Quadrada": "../img/raiz.png", 
                "Raiz N-ésima": "../img/raiz n.png", 
                "Logaritmo": "../img/log.png", 
                "Potência": "../img/potencia.png", 
                "Potência ao Quadrado": "../img/potencia n.png", 
                "DivX": "../img/1 por x.png" 
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
