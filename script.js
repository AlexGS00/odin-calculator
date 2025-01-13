function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(operator, a, b){
    switch(operator){
        case "+":
            return add(a,b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return undefined;
    }
}

let num1 = "";
let num2 = ""
let op = "";
let lastPressedOperator = document.querySelector(".operator");

let buttons = document.querySelectorAll("button");
let screen = document.querySelector(".screen");
buttons.forEach(button => {
    button.addEventListener("click", event => {
        let input = button.value
        handleInput(event, input)
    })
});

function handleInput(event, input){

    switch(input){
        case "ac":
            num1 = "";
            num2 = "";
            op = "";
            screen.textContent = "";
            break;
        case "change":
            let active =""
            let activeNum = 0;
            if(!op){
                active = num1;
                activeNum = 1;
            } else{
                active = num2;
                activeNum = 2;
            }
            active[0] === "-" ? active = active.slice(1) : active = '-' + active;
            screen.textContent = active;
            activeNum === 1 ? num1 = active : num2 = active;
            break;
        case "del":
            if(!op){
                num1 = num1.slice(0, -1)
                screen.textContent = num1;
            } else{
                num2 = num2.slice(0, -1);
                screen.textContent = num2;
            }
            break;
        case "=":
            if(num1 && num2 && op){
               let ans = operate(op, parseFloat(num1), parseFloat(num2));
               ans = Math.round(ans * 10000) / 10000;
               lastPressedOperator.style.backgroundColor = "rgb(253, 190, 16)";
               screen.textContent = ans;
               num1 = ans;
               num2 = "";
               op = ""
            }
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            op = input;
            let curButton = event.target;
            lastPressedOperator.style.backgroundColor = "rgb(253, 190, 16)";
            curButton.style.backgroundColor = 'rgb(204, 152, 10)';
            lastPressedOperator = curButton;
            break;
        case ".":
            if(!op){
                num1.includes(".") ? num1 = num1 : num1 = num1 + "."
                screen.textContent = num1;
            } else{
                num2.includes(".") ? num2 = num2 : num2 = num2 + "."
                screen.textContent = num2;
            }
        default:
            if(input >= '0' && input <= '9'){
                if(!op){
                    num1 = num1 + input;
                    screen.textContent = num1;
                } else{
                    num2 = num2 + input;
                    screen.textContent = num2;
                }
            } else{
                console.log("Invalid input" + input);
            }
    }

}