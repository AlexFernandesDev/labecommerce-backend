/* use o comando node par-ou-impar.js e depois informe "par" ou "impar", seguido de um número de 0 a 5  OU use o comando do script parOuImpar seguido do "par" ou "impar" e depois o número de 0 a 5*/

const oddOrEven = process.argv[2];
const chosenNumber = +process.argv[3];
const computerNumber = Math.floor(Math.random() * 5) + 1;
const sum = chosenNumber + computerNumber;


if (oddOrEven != "par" && oddOrEven != "impar") {
    console.log("Informe  'par' ou 'impar' ");
}else if(chosenNumber < 0 || chosenNumber > 5){
    console.log("Informe um número entre 0 e 5");  
}else if (oddOrEven === "par" && sum % 2 === 0){
     console.log("O Total é: " + sum + "\n O computador escolheu o número " + computerNumber + " e você escolheu o número " + chosenNumber + ". Você ganhou!");    
}else{
    console.log("O Total é: " + sum + "\nO computador escolheu o número " + computerNumber + " e você escolheu o número " + chosenNumber + ". Você perdeu!");
}

