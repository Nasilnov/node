const minimist = require('minimist')
const fs = require('fs');
const util = require('util');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


let argv =  minimist(process.argv.slice(2), {
});

function addLog(str){
    fs.appendFile(argv._[0], str, (err) => {
        if (err) throw err;
    });
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function choiseNumber() {
    rl.on('line', function (cmd) {
        let number = getRandomInt(1, 2);
        if (cmd == 'quit') {
            addLog(`Конец игры \n`);
            rl.close();
        }  else
        {
            if (cmd == number) {
                console.log(`Вы угадали:) Еще разок!`);
            } else {
                console.log(`Вы не угадали:( Еще разок!!!`);
            }
            addLog(`загаданное число - ${number}. Ответ - ${cmd} \n`);
        }
    });
}

console.log('Угадайте число 1 или 2. Выход - quit \n');
addLog('Новая партия \n');
choiseNumber();
