window.onload = () => {
    addCard('01');
    addCard('02');
};

const container = document.getElementById('container');

function addCard(number = '01') {
    const cardWrapper = document.createElement('div');
    cardWrapper.className = 'card-wrapper';

    const flipper = document.createElement('div');
    flipper.className = 'flipper';
    flipper.onclick = () => {
        flipper.className += ' flipped';
        setTimeout(() => {
            flipper.className = 'flipper';
        }, 1000);
    };

    const cardBack = document.createElement('div');
    cardBack.className = 'card back';
    const cardFace = document.createElement('div');
    cardFace.className = 'card face';

    const cardBackImage = document.createElement('img');
    cardBackImage.src = 'cardback.jpg';
    const cardFaceImage = document.createElement('img');
    cardFaceImage.src = `cardface${number}.jpg`;

    cardBack.appendChild(cardBackImage);
    cardFace.appendChild(cardFaceImage);
    flipper.appendChild(cardBack);
    flipper.appendChild(cardFace);
    cardWrapper.appendChild(flipper);
    container.appendChild(cardWrapper);
}