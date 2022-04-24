let screen = document.querySelector('.screen');
let clearBtn = document.querySelector('#clear');
let operatorSelected = false;
let chained = true;
let equalsJustSelected = false;
let firstNum='';
let secondNum='';
let selectedOperator=''

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
        if(chained){
            compute();
        }
        let allOperators = document.querySelectorAll('.operator');
        for(op of allOperators){
            op.classList.remove('op-selected')
        }
        e.target.classList.toggle('op-selected');
        selectedOperator = e.target.textContent;
        firstNum = Number(screen.textContent);
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
    deselectOperator();
    chained = false;
    if(firstNum==='' || operatorSelected || equalsJustSelected){
        return;
    }
    secondNum = screen.textContent;
    let result = operate(Number(firstNum), Number(secondNum), selectedOperator);
    result = Number(result.toPrecision(10)); //to deal with javascript floating point bugs
    if(result.toString().length>9){
        result=NaN;
    }
    secondNum = '';
    firstNum = result;
    screen.textContent = result;
    equalsJustSelected = true;
}

function operate(num1, num2, operator){
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
            let decimalWidth = 8-parseInt(num1/num2).toString().length;
            return Number((num1/num2).toFixed(decimalWidth));
        }
    }
}

function deselectOperator(){
    operators = document.querySelectorAll('.operator');
    for(op of operators){
        op.classList.remove('op-selected');
    }
}

clearBtn.addEventListener('click', clearAll);
function clearAll(){
    operatorSelected = false;
    chained = true;
    equalsJustSelected = false;
    firstNum='';
    secondNum='';
    selectedOperator='';
    screen.textContent='';
    deselectOperator();
}

loadNumpad();

numBtns = document.querySelectorAll('.num');
for(num of numBtns){
    num.addEventListener('click', selectNum)
}

dotOperator = document.querySelector('.dot');
dotOperator.addEventListener('click', ()=>{
    if(screen.textContent==='' || screen.textContent.includes('.')){
        return;
    }
    screen.textContent += '.'
})

function selectNum(e){
    if(equalsJustSelected){
        clearAll();
    }
    equalsJustSelected = false;
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

document.addEventListener('keypress', (e)=>{
    allBtns = document.querySelectorAll('.num,.equals,.operator');
    for(btn of allBtns){
        if(btn.textContent==='=' && e.key==='Enter'){
            btn.click()
        }
        else if(btn.textContent===e.key){
            btn.click();
        }
    }
})