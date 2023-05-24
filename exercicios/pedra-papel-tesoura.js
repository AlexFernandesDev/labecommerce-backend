/* Para rodar, digite o comando node pedra-papel-tesoura.js + a sua escolha entre pedra, papel ou tesoura. EX: node pedra-papel-tesoura.js pedra */

const userChoice = process.argv[2];
const choices = ['pedra', 'papel','tesoura']
const computerChoice = choices[Math.floor(Math.random() * choices.length)];


if(!choices.includes(userChoice)){
    console.log("Opção inválida. Escolha entre 'pedra', 'papel' ou 'tesoura'.");
}else if(userChoice === computerChoice){
    console.log("Empate");
}else if(
    (userChoice === 'pedra' && computerChoice === 'tesoura') ||
    (userChoice === 'tesoura' && computerChoice === 'papel') ||
    (userChoice === 'papel' && computerChoice === 'pedra')
){  
    console.log(userChoice + " ganha de " + computerChoice)
    console.log("Você ganhou!");
}else{
    console.log(computerChoice + " ganha de " + userChoice)
    console.log("Você perdeu!");
}






                