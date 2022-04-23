let screen = document.querySelector('.screen');
let operatorJustSelected = false;

function loadNumpad(){
    nums = [7,8,9,4,5,6,1,2,3,0,'.','=']
    numpad = document.querySelector('.numpad');
    for(let i of nums){
        numDiv = document.createElement('div');
        numDiv.textContent = i;

        if(i==='.'){
            numDiv.id = 'dot'
            numDiv.classList.add("dot");
        }
        else if(i==='='){
            numDiv.classList.add("equals");
        }
        else{
            numDiv.classList.add("num");
            numDiv.id = `num${i}`;
        }
        numpad.appendChild(numDiv);
    }
}

function loadOperatorEventLst(){
    operators = document.querySelectorAll('.operator');
    for(let op of operators){
        op.addEventListener('click', selectOperator)
    }

    function selectOperator(e){
        console.log(e.target.id);
        console.log(window[numStoreVar]);
        numStoreVar = 'secondNum';
        let allOperators = document.querySelectorAll('.operator');
        for(op of allOperators){
            console.log(op)
            op.classList.remove('op-selected')
        }
        e.target.classList.toggle('op-selected');
        selectedOperator = e.target.textContent;
        operatorJustSelected = true;
    }
    loadEquals();
}

function loadEquals(){
    equalButton = document.querySelector('.equals');
    equalButton.addEventListener('click', compute)

    function compute(){
        let result = operate(parseInt(firstNum), parseInt(secondNum), selectedOperator);
        console.log(result);
        secondNum = '';
        firstNum = result;
        screen.textContent = result;
    }
}

function operate(num1, num2, operator){
    console.log(num1,num2,operator)
    switch(operator){
        case '+':{
            return num1+num2;
        }
        case '-':{
            return num1-num2;
        }
        case '*':{
            return num1*num2;
        }
        case '/':{
            return num1/num2;
        }
    }
}

firstNum='';
secondNum='';
enteredNums=[];
selectedOperator=''
numStoreVar = 'firstNum';

let screenVal = '';

loadNumpad();

numBtns = document.querySelectorAll('.num');
for(num of numBtns){
    num.addEventListener('click', selectNum)
}

function selectNum(e){
    console.log(e.target.id);
    if(screen.textContent.length===10){
        return
    }
    screen.textContent += e.target.textContent;
    screenVal = screen.textContent;
}
loadOperatorEventLst();