

var Templates = (function(){

	var question = [
		'<div class="row">',
	    '<h3 class="small-12 columns"> <%= question %> </h3>',
	    '</div>',
		'<div class="row">',
		'<ul class="small-block-grid-2 large-block-grid-4">',
	    '<li><img src=<%= A %> class="photo small-6 medium-3 columns" id="A"></li>',
	    '<li><img src=<%= B %> class="photo small-6 medium-3 columns" id="B"></li>',
	    '<li><img src=<%= C %> class="photo small-6 medium-3 columns" id="C"></li>',
	    '<li><img src=<%= D %> class="photo small-6 medium-3 columns" id="D"></li>',
	    '</ul>',
	    "</div>"
	].join("\n");

	var feedback = [
		'<div class="row panel">',
	    '<h3> <%= feedback %> </h3>',
	    '<h4>Current Score: <%= score %>/<%= total %></h4>',
	    '<p>On average, players get this question correct <%= percent %>% of the time.</p>',
	    '<button id="next">NEXT</button>',
	    "</div>"
	].join("\n");

	var finalScore = [
		'<div class="row panel text-centered">',
		'<h2>Your Final Score: <%= score %>%</h2>',
		'</div>'
	].join("\n")

	var leaderBoard = [
		'<div class="row">',
		'<% for (var i=0; i < highScores.length; i++) { %>',
		'<p><%= highScores[i]["Username"] %> -- <%= highScores[i]["Score"] %>',
		'<% } %>',
		'</div>'
	].join("\n");

	return {
		question: question,
		feedback: feedback,
		end: finalScore,
		leaderBoard: leaderBoard
	}

})();

