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