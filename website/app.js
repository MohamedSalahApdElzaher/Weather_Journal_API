/* Global Variables */
const generate = document.getElementById('generate')
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?"
const apiKey = "1a7f82b9ebe24d248e837c987e4df64d"

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.'+ d.getDate()+'.'+ d.getFullYear();

//Helper functions
function getUrl(){
    return baseUrl + "zip=" + zip + "&appid=" + apiKey;
}

// get data from api
const getData = async ( url = '')=>{
      const response = await fetch(url);
      try {
        const newData = await response.json();
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }
 
  // function post data to server
  const postData = async ( url = '', data = {})=>{
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
       body: JSON.stringify(data) 
    });
      try {
        const newData = await response.json();
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

// perform generate function
  function preformAction(){
    const feelingToday =  document.getElementById('feelings').value;
    const zipCode = document.getElementById('zip').value;
    if(zipCode !== ""){
        zip = zipCode;
    }    
    getData(getUrl())
    .then(function(data){
        postData('../add', {temperature: data.main.temp, date: newDate, user_response: feelingToday})
    })
    .then(function(){
        updateUI();
    });
  }

  // update ui view
  const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const new_data = await request.json();
      const lastIndex = new_data.length -1; 
      document.getElementById('date').innerHTML = new_data[lastIndex].date;
      document.getElementById('temp').innerHTML = new_data[lastIndex].temperature;
      document.getElementById('content').innerHTML = new_data[lastIndex].user_response;
     }catch(error){
      console.log("error", error);
    }
  }

//events
generate.addEventListener('click', function(){
  preformAction();
});