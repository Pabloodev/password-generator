const slider = document.getElementById('slider');
const numberLength = document.getElementById('number-length');
const difficult = document.getElementById('diff');
const copiedBtn = document.getElementById('copied-button');
const copiedMsg = document.getElementById('copied-text');

numberLength.innerHTML = slider.value;

const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

function updateSliderBackground(slider) {
    const { min, max, value } = slider;
    const percentage = ((value - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(90deg, rgb(117,252,117) ${percentage}%, #18171F ${percentage}%)`;
}

function generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
    let characterPool = [
        ...(includeUppercase ? uppercaseLetters : ''),
        ...(includeLowercase ? lowercaseLetters : ''),
        ...(includeNumbers ? numbers : ''),
        ...(includeSymbols ? symbols : '')
    ].join('');

    if (!characterPool) return 'You need to choose a rule';

    let password = Array.from({ length }, () => 
        characterPool[Math.floor(Math.random() * characterPool.length)]
    ).join('');

    return password;
}

function copyPassword() {
    const passwordText = document.querySelector('.password').textContent;

    navigator.clipboard.writeText(passwordText).then(() => {
        copiedMsg.classList.remove('hidden');
        console.log('Senha copiada com sucesso!');
    }).catch(err => {
        console.error('Erro ao copiar a senha: ', err);
    });
}


function passwordStrong() {
    let strength;
    if (slider.value == 0) strength = "empty";
    else if (slider.value < 5) strength = "weak";
    else if (slider.value <= 10) strength = "medium";
    else strength = "strong";
    
    difficult.src = `assets/images/${strength}.png`;
}

slider.addEventListener('input', function () {
    numberLength.innerHTML = this.value;
    updateSliderBackground(this);
    passwordStrong();
});

copiedBtn.addEventListener('click', () => {
    copyPassword();
});

document.getElementById('generate').addEventListener('click', () => {
    copiedMsg.classList.add('hidden');

    const length = parseInt(slider.value);
    const includeUppercase = document.getElementById('upper').checked;
    const includeLowercase = document.getElementById('lower').checked;
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeSymbols = document.getElementById('include-symbols').checked;

    const password = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);

    document.querySelector('.password').textContent = password;
});
