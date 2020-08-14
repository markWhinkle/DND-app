//Variables for the whole page
var command = document.getElementById('commandINPUT');
var com_output = document.getElementById('commandOUTPUT');
var commandWords = [
  "roll",
  "help"
];
var apiWords = [
    "ability-scores",
    "classes",
    "conditions",
    "skills",
    "spells"
];

//=====================================================================//
// Get the input field

command.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    //Make the output text area append the newest value to the older value plus a new line
   com_output.innerHTML += this.value + "\n";

   //Manages the command
   determineIfCommandOrApiCall(command.value);

   //clears the command input
   command.value = '';
  }
});

//=====================================================================//
/* This function serves to determine whether the input given from user
is either an API call or a Cammand from the the cammands used on the website
*/

function determineIfCommandOrApiCall(string) {
  var newString = string;
  //Make the output text area append the newest value to the older value plus a new line

  newString.toLocaleLowerCase();
  if(containsCommand(newString) == true) {
    console.log("Input contains an Command call");
    processCommandWord(newString);
  }else if(containsApiCall(newString) == true) {
    console.log("Input contains an API call");
  }
  //Make the output text area append the newest value to the older value plus a new line

};

//=====================================================================//
/*This function serves to see if the input made by the user is
meant to be a command. if finds wether or not a command line can be found
*/

function containsCommand(posCoC) {
  if(posCoC[0] != "/") {
    console.log("The input is not a command");
    return false;
  }
  for(i=0;i<=commandWords.length;i++) {
    if(posCoC.includes(commandWords[i])) {
      return true;
      break;
    }
  }

};

//=====================================================================//
/*This function serves to see if the input made by the user is
meant to be a command. if finds wether or not a command line can be found
*/

function containsApiCall(posCoC) {
  if(posCoC[0] != "/") {
    console.log("The input is not a command");
    return false;
  }
  for(i=0;i<=apiWords.length;i++) {
    if(posCoC.includes(apiWords[i])) {
      return true;
      break;
    }
  }
};

//=====================================================================//
/*
*/

function processCommandWord(strA) {
  //This first loop takes the first word inbetween the two slashes and
  //gives it back as the commandCheck string
  var commandCheck = "";
  var marker = 0;
  for(k=0;k<=strA.length;k++) {
    if(strA.charAt(k) == '/') {
      marker++;
      //console.log("*Found a /");
      if(marker>=2) {
        //console.log("*The marker has reached the value 2 or greater");
        break;
      }
    } else {
      commandCheck += strA.charAt(k);
      //console.log(commandCheck);
      //console.log("*The amount of letters in word check are:" + commandCheck.length);
    }
  }

  console.log(commandCheck);

  var actual = "";
  for(i=0; i<commandWords.length; i++) {
    console.log(commandWords[i].length);

    for(j=0; j<commandWords[i].length; j++) {
        //in here have it read the letters of the string that is inputed
        //and compare it to the letters in the command words array
        //to stop the useage of the command if it appears in a random string
        console.log(commandCheck);
        console.log(commandWords[i].charAt(j));
        if(commandCheck.length == commandWords[i].length) {
          console.log("they have the same length");
          if(commandWords[i].charAt(j) == commandCheck.charAt(j)) {
            console.log("there is a match");
          }
        }
    }

  }

  console.log("*If this happens the loop is over");
};

//=====================================================================//
/*This is the fetch for the api and getting its data*/
function apiCall(string) {
  const apiData = {
    url: 'https://www.dnd5eapi.co/api',
    api_command: string,
  };
 const{url,api_command} = apiData;
 const apiUrl = `${url}${api_command}`;

 console.log("api call has been called")

  fetch(apiUrl)
   .then( (data) => data.json())
   .then( (data) =>  {
     manageData(data)
   })
   .catch(error => {
     com_output.innerHTML += `Invalid Command  \n`
   })
   //the data from above is sent to the manageData function for
   //the data to be handled depending on its outcome
};
 window.addEventListener('error', function(e) {
    console.log(e);
}, true);

//=====================================================================//
/*This manages the data from the apiCall in order to specift the data's
purpose in what data is needed to be displayed*/
function manageData(data) {
  //console.log(data.error == 'Not found');
  console.log('this function manageOutput was called');
  if(data.error == "Not found") {
    com_output.innerHTML += `Invalid Command  \n`
    console.log(data);
  } else {
    com_output.innerHTML += `${data.name}  \n`
  }
};

//=====================================================================//
/*
*/

function rollDice() {

};
