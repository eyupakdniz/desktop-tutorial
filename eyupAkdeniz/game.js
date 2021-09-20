const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progresstext = document.getElementById('progresstext');
const scoretext = document.getElementById('score');
const progressbarfull= document.getElementById("progressbarfull");

let currentquestion = {};
let acceptingAnswers = false;
let score = 0;
let counter = 0;
let availablequestions =[];


let questions = [
    {
        question: "1, 4 veya 7 rakamları kullanılarak yazılan iki basamaklı"+
		"bir doğal sayının rakamlarının toplamından elde edilen"+
		"sayı da 1, 4 veya 7 rakamlarından oluşuyorsa bu doğal"+
		"sayıya dosdoğru sayı denir."+
		"Buna göre, kaç tane dosdoğru sayı vardır?",
        choice1: "1",
        choice2: "2",
        choice3: "3",
        choice4: "4",
        
        answer: 2
    },

    {
        question:   "Faruk, 2020 yılında ziyaret ettiği bir müzede gördüğü bir"+
					"vazoya ait bilgileri okurken vazonun bulunduğu yıl ile"+
					"kendi doğduğu yılın aynı olduğunu ve vazonun,"+
					"bulunduğunda 300 yaşında olduğunu öğrenmiştir."+
					"Ayrıca bu ziyareti sırasında kendi yaşının 39 katının"+
					"vazonun yapıldığı yıla eşit olduğunu hesaplamıştır."+
					"Buna göre, 2020 yılında Faruk kaç yaşındadır?",
        choice1: "41",
        choice2: "42",
        choice3: "43",
        choice4: "44",
        
        answer: 4
    },

    {
        question: "AAB ve ABA doğal sayıları 9’a tam bölünen"+
				   "üç basamaklı birer sayı olmak üzere, bu sayılardan"+
				   "biri 5’e diğeri ise 12’ye tam bölünmektedir."+
				   "Buna göre, toplamı kaçtır?",
        choice1: "7",
        choice2: "8",
        choice3: "9",
        choice4: "10",
        
        answer: 2
    },

    {
        question:  "Bir okuldaki 135 öğrenci, bir bayram tatilinde evlerine"+
				   "gidiş ve evlerinden dönüş için A veya B otobüs firmaları"+
				   "ile seyahat etmiştir. Öğrencilerin 75 tanesi gidişte"+
				   "A firmasını, 90 tanesi dönüşte B firmasını tercih ederken"+
				   "86 öğrenci gidiş ve dönüşte farklı firmalar ile seyahat etmiştir."+
				   "Buna göre, B firması ile gidip A firması ile dönen"+
				   "toplam öğrenci sayısı kaçtır?",
        choice1: "22",
        choice2: "25",
        choice3: "28",
        choice4: "32",
        
        answer: 4
    },

   

    {
        question: "1, 4 veya 7 rakamları kullanılarak yazılan iki basamaklı"+
		"bir doğal sayının rakamlarının toplamından elde edilen"+
		"sayı da 1, 4 veya 7 rakamlarından oluşuyorsa bu doğal"+
		"sayıya dosdoğru sayı denir."+
		"Buna göre, kaç tane dosdoğru sayı vardır?",
        choice1: "9th",
        choice2: "10th",
        choice3: "11th",
        choice4: "12th",
        
        answer: 3
    },

    {
        question: "Her gün mesainin olduğu bir iş yerinde esnek çalışma"+
				   "sistemine geçilmiştir. Bu iş yerinin sahibi, çalışanların"+
			      "bir kısmından iki günde bir, diğerlerinden ise üç günde"+
					"bir iş yerine gelmelerini istemiştir. Bu sisteme"+
					"geçildikten sonra ilk dört günde bu iş yerine gelen"+
					"çalışan sayılarının sırasıyla 22, 19, 28 ve 26 olduğu görülmüştür."+
					"Buna göre, bu sisteme geçildikten sonra beşinci"+
					"gün bu iş yerine kaç çalışan gelmiştir?",
        choice1: "12",
        choice2: "15",
        choice3: "18",
        choice4: "21",
        
        answer: 1
    },


   
];

const correct_bonus = 10;
const max_questions = 5
 
startgame = () => {

    counter = 0;
    score = 0;
    availablequestions = [...questions];
    getnew();
};

getnew = () => {
    if (availablequestions.length === 0 || counter >= max_questions) {
        localStorage.setItem('mostrecentscore', score);
        return window.location.assign("end.html");
      }

    counter++;
    
    progresstext.innerText = 'Sorular ' + counter + '/' + max_questions;
    const x = (counter/max_questions)*100;
    progressbarfull.style.width = x + "%";

    const questionindex = Math.floor(Math.random() * availablequestions.length);
    currentquestion = availablequestions[questionindex];
    question.innerText = currentquestion.question;
    

    choices.forEach( choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentquestion["choice" + number];
    });

    availablequestions.splice(questionindex,1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e=> {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedchoice = e.target;
        const selectedanswer = selectedchoice.dataset['number'];
        
        const classtoapply  = selectedanswer == currentquestion.answer ? 'correct' : 'incorrect' ;

        if(classtoapply === 'correct')
        {
            incrementscore(correct_bonus);
        }

        selectedchoice.parentElement.classList.add(classtoapply);

        setTimeout(() => {
            selectedchoice.parentElement.classList.remove(classtoapply);
            getnew();
        }, 1000);
    });
});

incrementscore = num => {
    score += num;
    scoretext.innerText = score;
};

startgame();
