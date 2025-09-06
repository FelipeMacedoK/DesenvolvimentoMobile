function generateRandomHexColor() {
    const maxVal = 0xFFFFFF;
    let randomNumber = Math.floor(Math.random() * (maxVal + 1));
    let hexColor = randomNumber.toString(16).padStart(6, '0');
    return `#${hexColor.toUpperCase()}`;
}

function refreshBgColor(element) {
    element.style.backgroundColor = generateRandomHexColor();
}

window.onload = function() {
    const divs = document.querySelectorAll('.random-bg');
    divs.forEach(div => {
        div.style.backgroundColor = generateRandomHexColor();
    });
};