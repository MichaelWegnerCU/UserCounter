//Top Donation counter functionality
function animate_user_count_value(id, start, end) {
    var current = start;
    var increment = 1;
    var stepTime = 10;
    var obj = document.getElementById(id);
    var timer = setInterval(function() {
        current += increment;
        obj.innerHTML =("Users: "+current);
        if (current >= end) {
			//obj.innerHTML =("$"+end.toFixed(2));
            clearInterval(timer);
        }
    }, stepTime);
}
//While we wait for the response from DB lets be pretty
var top_counter=document.getElementById('count_actual');
var confetti=document.getElementById('confetti');
function check_donations(){
	fetch('https://vidext-c1d58.firebaseapp.com/api/v1/usercount',{
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			})
			.then(function(response) {
				//If error getting donation we will get a 500 response
				if(response.status==500){
					console.log("Error getting donations");
				}
				else{
					//If the get donations succesful
					response.json().then(function(response) {
                        console.log(response);
                        if(parseInt(response.user_count)>=100){
                            confetti.src="./img/confet.gif";
                        }
						//This will animate the top total contributed value
						animate_user_count_value("count_actual", 0, parseFloat(response.user_count));
					});
				}
				
			// Do stuff with the response
			})
			.catch(function(error) {
				console.log('Looks like there was a problem getting donations: \n', error);
			});
}
check_donations();