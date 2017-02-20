$(document).ready(function(){
  var timer = 0;

  $('#name').on('keyup', function(e){
    let username = e.target.value;

    clearTimeout(timer);
    timer = setTimeout(function () {
      getUser(username);
    }, 700);

    function getUser(username) {
      if (username == '') {
        $('#profile').html(`
          <span class="fa fa-github"></span>
        `);
        return;
      }
      $.ajax({
        url:'https://api.github.com/users/'+username,
        data:{
          client_id:'4b6f66bf4fad2ccd687c',
          client_secret:'f3c8f45c9ab502cb167c3ebef243e2a628da184f'
        }
      }).done(function(user){
        $('#profile').html(`
        <div class="panel panel-default">
          <div class="panel-body">
            <div class="row">
              <div class="col-md-4 p-0">
                <img class="thumbnail avatar" src="${user.avatar_url}">
                <button class="btn btn-custom btn-block">
                <a href="${user.html_url}">View Profile</a>
                </button>
              </div>
              <div class="col-md-8">
              <h3 class="panel-title">${user.name}</h3>
              <span class="label label-default">Public Repos: ${user.public_repos}</span>
              <span class="label label-primary">Public Gists: ${user.public_gists}</span>
              <span class="label label-success">Followers: ${user.followers}</span>
              <span class="label label-info">Following: ${user.following}</span>
              <br>
              <ul class="list-group list-user-data">
                <li class="list-group-item">Company: ${user.company}</li>
                <li class="list-group-item">Website/blog: ${user.blog}</li>
                <li class="list-group-item">Location: ${user.location}</li>
                <li class="list-group-item">Member Since: ${user.created_at}</li>
              </ul>
              </div>
            </div>
          </div>
        </div>
      `);
      }).fail(function() {
        $('#profile').html(`
          <p class="not-found">(>_<)</p>
          <p class="not-found">Profile not found!</p>
        `);
      });
    }
  });
});