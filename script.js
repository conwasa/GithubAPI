// github user finder example
$(document).ready(function() {
  $(document).on('keypress', '#username', function(event) {
    if (event.which === 13) { // check the key was <enter>
      var input = $(this);
      var username = input.val();

      console.log('username was: ' + username);
	  getGithubInfo(username);
    }
  });
});
function getGithubInfo(username) {
  var url = 'https://api.github.com/users/' + username;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', url, false);
  xmlhttp.send();

  var data = xmlhttp.responseText;

  // console.log(data);
  console.log('status=' + xmlhttp.status);
  showUser(data, xmlhttp.status);
  };
function showUser(xmlhttp_responseText, xmlhttpStatus) {
	console.log('in fn')
  
  if(xmlhttpStatus === 200) {
    // show the user details
    var json = xmlhttp_responseText;
    var user = JSON.parse(json);
	console.log('user=' + user);
	console.log('user.login=' + user.login);
	$('#profile h2').text(user.login + ' is Github user #' + user.id);
	$('.information').append("<a class='profile' href='" + user.html_url + "'>" + user.url + "</a>");
	$('.avatar').append("<img src='" + user.avatar_url + "'>");

	} else {
		console.log('in else');
      	$('#profile h2').text('no such user');
		$('.information').text("");
		$('.avatar').text("");

  }
};

