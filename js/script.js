import questions from './questions.mjs'

// the element variables
const timeCounter = document.getElementById('timeCounter');
const startButton = document.getElementById('startButton');
const introCard = document.querySelector('.introCard')
const questionCards = document.querySelector('.questionCards');
const questionCardsTitle = document.querySelector('#questionCardsTitle')
const but1 = document.querySelector('#but1')
const but2 = document.querySelector('#but2')
const but3 = document.querySelector('#but3')
const but4 = document.querySelector('#but4')
const correct = document.querySelector('.correct')
const wrong = document.querySelector('.wrong');
const allDone = document.querySelector('.allDone');
const finalScore = document.querySelector('#finalScore');
const doneSubmit = document.querySelector('#doneSubmit');
const highScores = document.querySelector('.highScores');
const inputInit = document.querySelector('#inputInit');
const scoreBoard = document.querySelector('#scores');
const clearButton = document.querySelector("#clearButton");
const highScoreLink = document.querySelector('#highScoreLink');
const goBackButton = document.querySelector('#goBackButton');
const line = document.querySelector('.line')

let dataLength=[];
let q;
let answer;
let score;
let time;
let seconds;
let intervalId;
let scoreList=[];

// functions section
function loadData(){
    for (let i in questions){
        dataLength.push(i)
    }
}

function updateScore(x){
    let str;
    if (localStorage.getItem('scoreData') === null){
        if (typeof x === typeof undefined ){
        } else{
            scoreList.push( {name : `${x}`, score : `${score}` })
            str = JSON.stringify(scoreList)
            localStorage.setItem('scoreData', str); 
        }
    } else{
        str = localStorage.getItem('scoreData'); 
        str = JSON.parse(str);
        str.push( {name : `${x}`, score : `${score}` })
        scoreList = str;
        str = JSON.stringify(str);
        localStorage.setItem('scoreData',str)
    }

};

function clearScore(){
    scoreBoard.innerHTML = 'Emptied' ;
    scoreList=[];
    localStorage.clear()
}

function reset(){
    dataLength=[];
    loadData()
    clearInterval(intervalId);
}

function goHome(){
    highScores.classList.add('hide')
    questionCards.classList.add('hide');
    correct.classList.add('hide');
    wrong.classList.add('hide');
    allDone.classList.add('hide');
    introCard.classList.remove('hide');
}

function showScoreList(){
    let virtualBoard='';
    let x;
    scoreList=localStorage.getItem('scoreData');
    scoreList = JSON.parse(scoreList);
    x = scoreList.sort(function(b,a){
        return a.score - b.score
    })
    scoreList=[];
    for (let i in x ){
        scoreList.push(`<p>${(Number(i)+1)}. Name: ${x[i].name}, Score: ${x[i].score}%</p>`)
    }
    for (let i in scoreList){
        virtualBoard = virtualBoard + scoreList[i]
    }
    scoreBoard.innerHTML = virtualBoard;
}

function goToHighscore(){
    questionCards.classList.add('hide');
    correct.classList.add('hide');
    wrong.classList.add('hide');
    allDone.classList.add('hide');
    introCard.classList.add('hide');
    highScores.classList.remove('hide')
    showScoreList()
    clearButton.addEventListener('click', clearScore )
    goBackButton.addEventListener('click',goHome)
}

function writeScore(){
    if (inputInit.value !== ''){
        allDone.classList.add('hide');
        highScores.classList.remove('hide')
        updateScore(inputInit.value)
        goToHighscore();
    }
}

function done(){
    clearInterval(intervalId)
    questionCards.classList.add('hide');
    allDone.classList.remove('hide');
    score = ((score/questions.length)*100)
    finalScore.textContent = score;

    doneSubmit.addEventListener('click',writeScore);
}

function result(e){
    if (e.path[0].textContent === answer){
        let ding = new Audio('../sound/correct.mp3');
        ding.play();
        setTimeout(()=>{
            correct.classList.remove('hide');
            line.classList.remove('hide')
            setTimeout(()=>{
                correct.classList.add('hide');
                line.classList.add('hide')
            },1000)
        },0)
        wrong.classList.add('hide');
        score++;
        if (dataLength.length ===0 ){
            done()
        } else {
            loadCard()
        }
    } else {
        let ding = new Audio('../sound/wrong.mp3');
        ding.play();
        setTimeout(()=>{
            wrong.classList.remove('hide');
            line.classList.remove('hide')
            setTimeout(()=>{
                wrong.classList.add('hide');
                line.classList.add('hide')
            },1000)
        },0)
        if (seconds === 0){
            setTimeout(()=>{
                seconds = seconds - 5
            },1001)
        }else{
            seconds = seconds - 5
        }
        correct.classList.add('hide');
        if (dataLength.length ===0 ){
            done()
        } else {
            loadCard()
        }
    }
}

function loadCard(){
    questionCards.classList.remove('hide')
    wrong.classList.add('hide');
    correct.classList.add('hide');
    q = dataLength.shift()
    answer = questions[q].answer
    questionCardsTitle.textContent = questions[q].title;
    but1.textContent = questions[q].choices[0]
    but2.textContent = questions[q].choices[1]
    but3.textContent = questions[q].choices[2]
    but4.textContent = questions[q].choices[3]
    but1.addEventListener('click',result)
    but2.addEventListener('click',result)
    but3.addEventListener('click',result)
    but4.addEventListener('click',result)

    questionCards.classList.remove('hide');
}

function startTimer(){
    seconds = 0;
    let minutes = 2;
    time = minutes+':'+seconds;
    timeCounter.textContent = time
    intervalId = setInterval(()=>{
        if (seconds == 0){
            seconds = 60;
            minutes--;
        }
        seconds --;
        time = minutes+':'+seconds;
        timeCounter.textContent = time
        if (time === '0:0' ){
            clearInterval(intervalId);
            clearInterval(setInterval);
            done();
        }
    },1000);
}

function startQuiz(){
    score=0;
    introCard.classList.add('hide');
    reset()
    startTimer()
    loadCard()
}

function color (){
    timeCounter.style.color = 'red';
}

// 1.preparing functions
loadData()
updateScore()



// 2.the listeners
introCard.classList.remove('hide')
startButton.addEventListener('click',startQuiz)
highScoreLink.addEventListener('click',goToHighscore)