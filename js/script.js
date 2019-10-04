import 

function init(){





    let initButton = document.querySelector('#initButton')
    let counter = document.getElementById('counter');
    let data;
    let timeReduct = document.getElementById('timeReduct') // THIS WILL SHOW A -5 REDUCTION FROM TIME


    function startQuiz(){
        // get the data first
        // then start the quiz

        async function getData(){
            let rawData = await fetch('/js/questions.js')
            .then(res=>{return res.json()})
            .then(res=>{console.log(res)});
        }



        initButton.removeEventListener('click',startQuiz);
        let wrongAnswer = false;

        // start time (count down && negative point system)
        // change screen to quiz (questions & buttons & answer response)

        const startTimer = () => {
            let minute = 1;
            let second = '60';
  
            
            const wrongAnswerTimeReducer = setInterval(()=>{
                if (wrongAnswer === true && second !== 0) {
                    second = second - 5;
                    wrongAnswer = false;
                }
            },100);


            const timeConstructor = setInterval(()=>{
                second--;
                if (minute === 0 && second == 0) {
                    console.log('DONE!')
                    stopTimeConstructor()
                } else if (second == 0){
                    minute--
                    second = 60
                };
                counter.textContent =  minute+':'+second;
            },1000)

            function stopTimeConstructor() {
                clearInterval(timeConstructor);
                clearInterval(wrongAnswerTimeReducer);
            }
            
            initButton.addEventListener('click',stop)
        }



        function second(){
            setInterval(()=>{
                console.log('sss')
            },1000)
        }


        
        startTimer(getData())
        second()
    }



    initButton.addEventListener('click',startQuiz)
}

init()

