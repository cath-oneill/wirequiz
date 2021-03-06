var Quizzy = (function() {

	var currentQ,
		score = 0,
		random,
		length,
		currentIndex = 0,
		highScores;

	var checkAnswer = function(input) {
		var response, total;
		if (input === currentQ.answer) {
			response = true;
			score += 1;
			QuizzyData.correctAnswer(random[currentIndex]);
		} else {
			response = false;
			QuizzyData.incorrectAnswer(random[currentIndex]);
		}
		total = currentIndex + 1;
		percent = currentQ.correct * 100 / (currentQ.incorrect + currentQ.correct);
		endOfTurn(response, score, total, percent);
	};

	var nextQuestion = function() {
		currentIndex ++;
		currentQ = QuizzyData.current(random[currentIndex]);
		QuizzyUI.question(currentQ);
	};

	function startQuiz(quizKey) {
		QuizzyData.load(quizKey, function() {
			header = QuizzyData.header();
			QuizzyUI.header(header);
			length = QuizzyData.length();
			random = _.range(length);
			shuffle(random);
			currentQ = QuizzyData.current(random[currentIndex]);
			QuizzyUI.question(currentQ);
		});
		score = 0;
		currentIndex = 0;
	}

	function highScoreLimit() {
		return highScores[9]["Score"];
	}

	function addHighScore(username, score) {
		highScores[9] = {"Username" : username, "Score" : score};
		highScores = highScores.sort(function(a,b) { return parseFloat(b.Score) - parseFloat(a.Score) } );
		QuizzyData.updateLeaderboard(highScores);
	}

	function shuffle(arr) {
	  for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
	  return arr;
	}

	function endOfTurn(response, score, total, percent) {
		if (currentIndex + 1 === length) {
			QuizzyUI.feedback(response, score, total, percent, function(){
				highScores = QuizzyData.getLeaderboard();
				var percentScore = (score*100)/total;
				if (percentScore >= highScoreLimit()) {
					user = QuizzyUI.getUsername();
					addHighScore(user, percentScore);
				} 
				QuizzyData.save();
				splashImage = QuizzyData.splashImage();
				QuizzyUI.end(percentScore, highScores, splashImage);
			});
		} else {

		QuizzyUI.feedback(response, score, total, percent, Quizzy.nextQ);
		}
	}


	return {
		check: checkAnswer,
		nextQ: nextQuestion,
		start: startQuiz,
	}

})();


