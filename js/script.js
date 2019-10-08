var computer= [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    {
      title :"Which internet company began life as an online bookstore called Cadabra?",
      choices: ["Amazon","eBay","Overstock","Shopify"],
      answer :"Amazon"
    },
    {
      title:"When was the programming language C# released?",
      choices:["1998","1999","2001","2000"],
      answer:"2000",
    },
  ]
  
  
  var film = [
    {
      title :"Which actress danced the twist with John Travolta in Pulp Fiction?",
      choices: ["Kathy Griffin",'Uma Thurman',"Pam Grier","Bridget Fonda"],
      answer: "Uma Thurman",
    },
    {
      title:"This movie contains the quote, 'Houston, we have a problem...'",
      choices:["The Right Stuff","Capricorn One","Apollo 13", "Marooned"],
      answer:"Apollo 13",
    },
    {
      title:"Which of these actors/actresses is NOT a part of the cast for the 2016 movie Suicide Squad?",
      choices:["Scarlett Johansson","Jared Leto","Will Smith","Margot Robbie"],
      answer:"Scarlett Johansson",
    },
  ]

var questions = [ computer , film];
let tl = new TimelineMax()



// the elements and variables
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
const category = document.querySelector('.category');
const allButtons = document.querySelectorAll('.button')


let categoryData=[]
let dataLength=[];
let q;
let answer;
let score;
let time;
let seconds;
let intervalId;
let scoreList=[];

// functions section


function loadData(x){
    if (x === 'Computer Quiz'){
        categoryData=questions[0]
        for ( let i in questions[0]){
            dataLength.push(Number([i].join()))
        }
    }else{
        categoryData=questions[1]
        for ( let i in questions[1]){
            dataLength.push(Number([i].join()))
        }
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
    if (localStorage.getItem('scoreData') === null){
        console.log('!')
        scoreBoard.innerHTML = 'No Scores Yet'
    }else{
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
    score = Math.floor(((score/categoryData.length)*100))
    finalScore.textContent = score;
    doneSubmit.addEventListener('click',writeScore);
    tl.to(timeCounter,0.2,{color:'blue'});
}

function result(e){
    if (e.path[0].textContent === answer){
        let ding = new Audio('./sound/correct.mp3');
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
        let ding = new Audio('./sound/wrong.mp3');
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
                seconds = seconds - 10
                tl.to(timeCounter,0.5,{color:'red',})
                .to(timeCounter,0.2,{color:'black',});
            },1001)
        }else{
            tl.to(timeCounter,0.5,{color:'red',})
            .to(timeCounter,0.2,{color:'black',});
            seconds = seconds - 10
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
    answer = categoryData[q].answer
    questionCardsTitle.textContent = categoryData[q].title;
    but1.textContent = categoryData[q].choices[0]
    but2.textContent = categoryData[q].choices[1]
    but3.textContent = categoryData[q].choices[2]
    but4.textContent = categoryData[q].choices[3]
    but1.addEventListener('click',result)
    but2.addEventListener('click',result)
    but3.addEventListener('click',result)
    but4.addEventListener('click',result)

    questionCards.classList.remove('hide');
}

function startTimer(){
    seconds = 0;
    let minutes = 1;
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

function startQuiz(e){
    reset()
    document.querySelectorAll('.category button')[0].removeEventListener('click',startQuiz);
    document.querySelectorAll('.category button')[1].removeEventListener('click',startQuiz)
    category.classList.add('hide')
    loadData(e.path[0].textContent)
    score=0;
    startTimer()
    loadCard()
}

function chooseCateg(){
    introCard.classList.add('hide');
    category.classList.remove('hide')
    document.querySelectorAll('.category button')[0].addEventListener('click',startQuiz);
    document.querySelectorAll('.category button')[1].addEventListener('click',startQuiz)
};

function color (){
    timeCounter.style.color = 'red';
}


// 1.the listeners
introCard.classList.remove('hide')
startButton.addEventListener('click',chooseCateg)
highScoreLink.addEventListener('click',goToHighscore)

