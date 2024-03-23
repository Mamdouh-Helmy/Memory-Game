let nameTable = document.querySelector('#name tbody');

window.onload = function() {
    let getLocalstorge1 = JSON.parse(localStorage.getItem("name")) || [];
    let getLocalstorge2 = JSON.parse(localStorage.getItem("score")) || [];
    let getLocalstorgecheckWinner = JSON.parse(localStorage.getItem("winner")) || [];
    
    let tableData = ""; 
    
    for (let i = 0; i < getLocalstorge1.length; i++) {
        tableData += `
            <tr class="text">
                <td class="one">${getLocalstorge1[i]}</td>
                <td class="two">${getLocalstorge2[i]}</td>
                <td class="three">${getLocalstorgecheckWinner[i]}</td>
                <td><button class="remove">أحذف</button></td>
            </tr>
        `;
    }
    nameTable.innerHTML += tableData;


    document.querySelectorAll('.remove').forEach(button => {
        button.addEventListener('click', function(event) {
            
            const row = event.target.closest('tr');
            const oneValue = row.querySelector('.one').innerText;
            const twoValue = row.querySelector('.two').innerText;
            const threeValue = row.querySelector('.three').innerText;

            let stordItems1 = JSON.parse(localStorage.getItem('name')) || [];
            let stordItems2 = JSON.parse(localStorage.getItem('score')) || [];
            let stordItems3 = JSON.parse(localStorage.getItem('winner')) || [];
            
            let index1 = stordItems1.indexOf(oneValue);
            let index2 = stordItems2.indexOf(parseInt(twoValue));
            let index3 = stordItems3.indexOf(threeValue);

            if(index1 > -1 && index2 > -1 && index3 > -1){

                stordItems1.splice(index1 , 1)
                localStorage.setItem('name' , JSON.stringify(stordItems1))

                stordItems2.splice(index2 , 1)
                localStorage.setItem('score' , JSON.stringify(stordItems2))

                stordItems3.splice(index3 , 1)
                localStorage.setItem('winner' , JSON.stringify(stordItems3))
            }

            row.remove();
        });
    });
    

}


let spanName = document.querySelector('.name span');

document.querySelector('.control-buttons span').onclick = function () {
    let yourName = prompt("أسمك ايه يا عسل ❤️😘 يا قمر");

    if(yourName === null || yourName === ''){
        spanName.innerHTML = '😡 حط اسم يعم';
    }else{
        spanName.innerHTML = yourName;
    }

    document.querySelector('.control-buttons').style.display = "none";

    document.getElementById('start').play()

    countTimer(80)
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
    document.getElementById('start').pause();
    document.getElementById('field-1').pause();

    setTimeout(() => {
        location.reload();
    }, 4000);

    if(spanName.innerHTML != '😡 حط اسم يعم'){

        let getLocalstorge = JSON.parse(localStorage.getItem("name")) || [];
        getLocalstorge.push(spanName.innerHTML);
        localStorage.setItem('name' , JSON.stringify(getLocalstorge));

        if(count === 1){
            count = 0;
    
            let getLocalstorge = JSON.parse(localStorage.getItem("score")) || [];
            getLocalstorge.push(count);
            localStorage.setItem('score' , JSON.stringify(getLocalstorge));
        }else{
            count -= 1;
            let getLocalstorge = JSON.parse(localStorage.getItem("score")) || [];
            getLocalstorge.push(count);
            localStorage.setItem('score' , JSON.stringify(getLocalstorge));
        }

        let getLocalstorgecheckWinner = JSON.parse(localStorage.getItem("winner")) || [];
        getLocalstorgecheckWinner.push("🤗فائز");
        localStorage.setItem('winner' , JSON.stringify(getLocalstorgecheckWinner));
    }

    clearInterval(countDownInterval)
}

function field(){
    document.getElementById('field-1').play();
    document.querySelector('.field').style.display = 'block';
    document.getElementById('start').pause();
    document.getElementById('success-1').pause();

    setTimeout(() => {
        location.reload();
    }, 5000);

    if(spanName.innerHTML != '😡 حط اسم يعم'){

        let getLocalstorge = JSON.parse(localStorage.getItem("name")) || [];
        getLocalstorge.push(spanName.innerHTML);
        localStorage.setItem('name' , JSON.stringify(getLocalstorge));

        if(count === 1){
            count = 0;
    
            let getLocalstorge = JSON.parse(localStorage.getItem("score")) || [];
            getLocalstorge.push(count);
            localStorage.setItem('score' , JSON.stringify(getLocalstorge));
        }else{
            count -= 1;
            let getLocalstorge = JSON.parse(localStorage.getItem("score")) || [];
            getLocalstorge.push(count);
            localStorage.setItem('score' , JSON.stringify(getLocalstorge));
        }

        let getLocalstorgecheckWinner = JSON.parse(localStorage.getItem("winner")) || [];
        getLocalstorgecheckWinner.push("😡خاسر");
        localStorage.setItem('winner' , JSON.stringify(getLocalstorgecheckWinner));
    }

    clearInterval(countDownInterval)
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

document.getElementById('clear').onclick = function () {
    nameTable.remove();
    localStorage.clear();
}

