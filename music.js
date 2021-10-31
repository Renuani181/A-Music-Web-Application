// Put your Last.fm API key here
var api_key = "70f8a45b2c0e1c90483dc81fe8a0bb9f";
document.getElementById('button').addEventListener('click', sendRequest);

function sendRequest(event){
  
  event.preventDefault();
  let artist = document.getElementById("input").value;
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=http://ws.audioscrobbler.com/2.0/?method=library.getartists&api_key=${api_key}&user=joanofarctan&format=json&format=json`, true);

  xhr.onload = function(){
    if(this.status == 200){
      let users = JSON.parse(this.responseText);
      users = users.artist
      const artistName = users.name
      const artistUrl = users.url
      const artistBio = users.bio.content
      const artistPublishedDate = users.bio.published
      const artistImage = users.image[2]["#text"]
      const similarArtists = users.similar.artist
      let similarArtist = ""
      for (i=0;i<5;i++){
        similarArtist += `
          <li>${similarArtists[i].name}</li>
        `
      }
      document.getElementById('artistName').innerHTML = `<h1>${artistName} </h1>`
      document.getElementById('artistPublishedDate').innerHTML = `<p>Published Date: ${artistPublishedDate} </p>`
      document.getElementById('artistUrl').innerHTML = `<a href=${artistUrl}>Click Here to visit ${artistName}'s Last.fm Profile </a>`
      document.getElementById('artistBio').innerHTML = `<p>${artistBio} </p>`
      document.getElementById('artistImage').innerHTML = `<img src=${artistImage}>`
      document.getElementById('similarArtists').innerHTML = `<h2>Similar Artists </h2>
        <ol>
            ${similarArtist}
        </ol>`
    }
  }

  xhr.send();


  let xhr2 = new XMLHttpRequest();
  xhr2.open('GET', `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=${api_key}&format=json`, true);

  xhr2.onload = function(){
    if(this.status == 200){
      let users = JSON.parse(this.responseText);
      users = users.topalbums.album
      let topalbums = ""
      let hello
      users.length > 20 ? hello = 20 : hello = users.length
        
      for (i=0;i<hello;i++){
        topalbums += `
        <li> ${users[i].name} <img src=${users[i].image[0]["#text"]}>
        </li>
        `
        
      }
      document.getElementById('topAlbums').innerHTML = `<h2>Top Albums </h2>
        <ol>
            ${topalbums}
        </ol>`
    }
  }

  xhr2.send();
}
