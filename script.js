let screen = document.querySelector('.screen');
let operatorSelected = false;
let chained = true;
let equalsJustSelected = false;

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
        equalsJustSelected = false;
        console.log(e.target.id);
        console.log(operatorSelected);
        if(chained){
            compute();
        }
        let allOperators = document.querySelectorAll('.operator');
        for(op of allOperators){
            op.classList.remove('op-selected')
        }
        e.target.classList.toggle('op-selected');
        selectedOperator = e.target.textContent;
        firstNum = parseInt(screen.textContent);
        console.log('fnum', firstNum)
        operatorSelected = true;
        chained = true;
    }
    loadEquals();
}

function loadEquals(){
    equalButton = document.querySelector('.equals');
    equalButton.addEventListener('click', compute)
}

function compute(){
    chained = false;
    if(firstNum==='' || operatorSelected || equalsJustSelected){
        return;
    }
    secondNum = screen.textContent;
    let result = operate(parseInt(firstNum), parseInt(secondNum), selectedOperator);
    console.log(result);
    secondNum = '';
    firstNum = result;
    screen.textContent = result;
    equalsJustSelected = true;
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
selectedOperator=''

loadNumpad();

numBtns = document.querySelectorAll('.num');
for(num of numBtns){
    num.addEventListener('click', selectNum)
}

function selectNum(e){
    equalsJustSelected = false;
    console.log(e.target.id);
    if(operatorSelected){
        screen.textContent = '';
        operatorSelected = false;
    }
    if(screen.textContent.length===10){
        return
    }
    screen.textContent += e.target.textContent;
}
loadOperatorEventLst();