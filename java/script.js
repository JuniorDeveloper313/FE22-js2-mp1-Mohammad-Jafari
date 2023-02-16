mainurl="https://sten-sax-pase-c68d4-default-rtdb.europe-west1.firebasedatabase.app/"
let randomNumber = Math.round(Math.random() * 2);
const player = document.querySelector("#spelare");
const computer = document.querySelector("#dator");
const result = document.querySelector("#resultat");
const submit = document.querySelector("#pname");


const sten = document.querySelector("#rock");
const sax = document.querySelector("#sax");
const pose = document.querySelector("#paper");

// These variables will be used later to keep track of the player's and computer's scores.
let spelare;
let datorsumma = 0;
let spelaresumma = 0;
let namn;


// This function runs when the player enters their name and clicks the "submit" button
submit.addEventListener("click", skrivnamn);
function skrivnamn(event) {
  event.preventDefault();
  const el = document.createElement("h1");
  document.body.appendChild(el);
  const textinput = document.querySelector("#name-input");
  player.innerText = textinput.value+":";
  namn = textinput.value;
  textinput.value = " ";
}


// This function runs when the player clicks on one of the game choices
container.addEventListener("click", spel);
function spel(event) {
  if (event.target.tagName == "BUTTON") {
    randomNumber = Math.round(Math.random() * 2);
    console.log(randomNumber);

    if (event.target.id == "rock") {
      spelare = event.target.innerText;
      const ele = document.createElement("h1");
      document.body.appendChild(ele);
      player.innerText = (`${namn}`+":"+ spelare );

      if (randomNumber == 0) {
        computer.innerText = "Cpmputer: Sten";
        result.innerText = "Result: Lika";

      } else if (randomNumber == 1) {
        
        computer.innerText = "Cpmputer: pose";
        result.innerText = "Result: Dator vann";
        datorsumma++

      } else if (randomNumber == 2) {
        computer.innerText = "Cpmputer: sax";
        result.innerText = "Result: Spelare vann";
        spelaresumma++;
        
      }
    } else if (event.target.id == "paper") {
      spelare = event.target.innerText;
      const elem = document.createElement("h1");
      document.body.appendChild(elem);
      player.innerText =  (`${namn}`+":"+ spelare );

      if (randomNumber == 0) {
        computer.innerText = "Cpmputer: Sten";
        result.innerText = "Result: Spelare vann";
        spelaresumma++;
        
        
      } else if (randomNumber == 1) {
        computer.innerText = "Cpmputer: pose";
        result.innerText = "Result: Lika";

      } else if (randomNumber == 2) {
        
        computer.innerText = "Cpmputer: sax";
        result.innerText = "Result: Dator vann";
        datorsumma++
      }

    } else if (event.target.id == "sax") {
      spelare = event.target.innerText;
      const eleme = document.createElement("h1");
      document.body.appendChild(eleme);
      player.innerText = (`${namn}`+":"+ spelare );

      if (randomNumber == 0) {
        computer.innerText = "Cpmputer: Sten";
        result.innerText = "Result: Dator vann";
        datorsumma++

      } else if (randomNumber == 1) {
        computer.innerText = "Computer: pose";
        result.innerText = "Result: spelare vann";
        spelaresumma++;

      } else if (randomNumber == 2) {
        computer.innerText = "Cpmputer: sax";
        result.innerText = "Result: Lika";
      }
    }
    document.querySelectorAll("h2")[0].innerText = `Computer :  ${datorsumma}`;
    document.querySelectorAll("h2")[1].innerText = `${namn} :  ${spelaresumma}`;

    setTimeout(function(){
      if (datorsumma == 1) {
        
        alert(' Dator vann spelet');
        // Create a new object with the user's name and score and send to firebase
        const Userinfo = {
          name: namn,
          score : spelaresumma,
            }
        postinfo(Userinfo);
        resetGame();
      } else if (spelaresumma == 1) {
      
        document.querySelectorAll("h2")[1].innerText = `${namn} :  ${spelaresumma}`;
        
      }

    },200)
  }

  
};

// Get all data from firebase
async function getinfo(){
  const url =mainurl +'Highscore.json';
  const response = await fetch(url);
  const data = await response.json();
  displayScoreInfo(data);
}

// Post the data to firebase
async function postinfo(obj){
  const url =mainurl +'Highscore.json';
  const init = {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
          'Content-type': 'application/json; charset=UTF-8'
      }
  }
  const response = await fetch(url,init);
  const data = await response.json();

};

//displays high score data on the page.
async function displayScoreInfo(data){
  const array = Object.values(data);
  array.sort((a,b) => b.score-a.score)
  for (let i= 0; i<5; i++){

    const scorecontainer=document.querySelector("#Scorediv")
      const info = document.createElement('h3');
      scorecontainer.appendChild(info);
      info.innerText = array[i].name +":"+ array[i].score;
  }
}

const btn = document.querySelector("#score");
btn.addEventListener("click", getdata);
function getdata(event) {
  event.preventDefault();
  getinfo();
  document.getElementById("Scorediv").style.display = "block";
  document.getElementById("Scorediv").innerHTML= " ";
 
}

function resetGame() {
  datorsumma = 0;
  spelaresumma = 0;
  player.innerText = "Player: ";
  computer.innerText = "Computer: ";
  result.innerText = "Result : ";
  document.querySelectorAll("h2")[0].innerText = `Computer: ${datorsumma}`;
  document.querySelectorAll("h2")[1].innerText = `Player: ${spelaresumma}`;
  document.getElementById("Scorediv").style.display = "none";
    
}




