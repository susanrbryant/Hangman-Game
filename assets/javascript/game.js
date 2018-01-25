	/***********************************
		Global Variables 
	***********************************/
	var numOfWins = 0; // Count Number of Wins
	
	var numDefaultMaxGuesses = 12; // Number of MAX Wrong letter guesses
		
	var numGuessesRemaining = 12; // Default - Number of remaining letter guesses
	
	var gameMessage = "";
	
	var wrongLettersGuessed = "";
	
	var theWordArr; // Word returned from the getRandom() 
	
	var guessedLettersArr = [];// array to hold correct guesses


	/***********************************
	Get the random word from the array and place it into its own array 
	***********************************/
	var getRandom = function() {
			
		// Correct array
		var arrayGuessWords = ["Dog", "Monkey", "Horse", "Cat", "Elephant", "Bird"]; // Create an array - of one words

		var getRandomWord = arrayGuessWords[Math.floor(Math.random() * arrayGuessWords.length)]; // Random word chosen	 
		
		var theWord = getRandomWord.toLowerCase(); // Change all letters to lower case - does not change original word

		theWordArr = theWord.split(""); // Split the letters of the word into an array

	};


	getRandom(); // Get the random word


	/***********************************
	START NEW GAME
	***********************************/
	var startNew = function() {
	
		numGuessesRemaining = 12;
		wrongLettersGuessed = "";
		gameMessage = "";
		guessedLettersArr = [];
		
		getRandom();
	
	}


	/***********************************
	CHECK FOR LETTERS in the word
	***********************************/
	var testLetterPressed = function(playerGuessed) {
		
		var playerFlag = 0;		
	
		// Iterate over the choosen word to check letters
		for ( var i = 0; i < theWordArr.length; i++ ) {
				
			var aLetter = String(theWordArr[i]);
				
			if(playerGuessed === aLetter) {		
							
				// Add FOUND letters add to guessedLettersArr Array
				guessedLettersArr[i] = aLetter; 
				
				playerFlag = 1;
			
			}; 
		};
			
		
		if(theWordArr.length === guessedLettersArr.length) {
		
			var flag = 1;		
		
			// Check if user has won
			for ( var i = 0; i < theWordArr.length; i++ ) {
					
				if (!(i in guessedLettersArr)) {	
	
					flag = 0
	
				};		
					
			};			
		
			if (flag === 1) {
				
				numOfWins = numOfWins + 1;
	
				gameMessage = "You WIN";
				
				startNew();
				
			};
						
		};
			
	
		/* Check if user has run out of guesses */
		if(playerFlag === 0) {
			
			numGuessesRemaining = numGuessesRemaining - 1;
			
			wrongLettersGuessed = wrongLettersGuessed + playerGuessed + ", ";
			
			if (numGuessesRemaining === 0) {
				
				gameMessage = "Sorry you lost!";
				
				startNew();
				
			};		
					
		};
	
	};


	/***********************************
	Function RUN WHEN USER PRESSES A KEY 
	***********************************/
	var hangman = function (event) {
	
		var userGuess = event.key; // Get the key the user pressed
	
		testLetterPressed(userGuess);
				
		// Render/Display Results on page
		var render = function() {
	
		document.getElementById("game-message").innerHTML = gameMessage;
		document.getElementById("num-of-wins").innerHTML = "<span>" + numOfWins + "</span>";
		document.getElementById("correct-letter-guesses").innerHTML = "<span>" + guessedLettersArr + "</span>";
		document.getElementById("num-guesses-remaining").innerHTML = "<span>" + numGuessesRemaining + "</span>";
		document.getElementById("wrong-letters-guessed").innerHTML = "<span>" + wrongLettersGuessed + "</span>";	
		
		}; 
	
		render();
		
	};	



document.addEventListener("keyup", hangman);