let spanName = document.querySelector('.name span');

document.querySelector('.control-buttons span').onclick = function () {
    let yourName = prompt("أسمك ايه يا عسل ❤️😘 يا قمر");

    if(yourName === null || yourName === ''){
        spanName.innerHTML = '😡 حط اسم يعم';
    }else{
        spanName.innerHTML = yourName;
    }

    document.querySelector('.control-buttons').style.display = "none";

    countTimer(70)

}

let duration = 1000 , count = 1 , countDownInterval;

let blocksConatiner = document.querySelector('.memory-game');

let blocks = Array.from(blocksConatiner.children);

let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange)

blocks.forEach((block , index) => {

    block.style.order = orderRange[index];

    block.addEventListener('click' , function (){

        flibBlock(block)
    })

})

function flibBlock(element){

    element.classList.add('in-fleiped');

    let allFlip = blocks.filter(flip => flip.classList.contains('in-fleiped'))

    if(allFlip.length == 2){

        stopClicking();

        checkMatchedBlocks(allFlip[0] , allFlip[1]);
    }

    let allFlipSuccess = blocks.filter(flip => flip.classList.contains('has-match'));

    if(allFlipSuccess.length == blocks.length){

        winer();

    }
}

function checkMatchedBlocks(firstBlock , secoundBlock){
    let tries = document.querySelector('.tries span');

    if(firstBlock.dataset.sorce === secoundBlock.dataset.sorce){

        firstBlock.classList.remove('in-fleiped')
        secoundBlock.classList.remove('in-fleiped')

        firstBlock.classList.add('has-match')
        secoundBlock.classList.add('has-match')

        document.getElementById('success').play()
    }else{

        tries.innerHTML = count++;

        setTimeout(() => {

            firstBlock.classList.remove('in-fleiped')
            secoundBlock.classList.remove('in-fleiped')

        }, duration)

        document.getElementById('field').play();
    }
}

function stopClicking(){

    blocksConatiner.classList.add('no-clicking');

    setTimeout(() => {

        blocksConatiner.classList.remove('no-clicking');

    }, duration)
}

function shuffle(array){
    let current = array.length 
    , temp 
    , random;

    while(current > 0){
        random = Math.floor(Math.random() * current);

        current--;

        temp = array[current];

        array[current] = array[random];

        array[random] = temp;
    }

    return array;
}

function winer(){
    document.getElementById('success-1').play();
    document.querySelector('.winner').style.display = 'block';

    setTimeout(() => {
        location.reload();
    }, 4000);
}

function field(){
    document.getElementById('field-1').play();
    document.querySelector('.field').style.display = 'block';

    setTimeout(() => {
        location.reload();
    }, 5000);
}

function countTimer(time){
    let first , sec;

    countDownInterval = setInterval(() => {
    
        first = parseInt(time / 60);
        sec = parseInt(time % 60);

        first = first < 10 ? `0${first}` : first;
        sec = sec < 10 ? `0${sec}` : sec;

        document.querySelector('.time span').innerHTML = first +  " : " + sec;

        if(--time < 0){
            clearInterval(countDownInterval)
            field()
        }

    }, duration)
}
