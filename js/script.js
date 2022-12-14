const allPlayers = () => {
  document.getElementById("spinner").style.display = "block";
  const searchInput = document.getElementById("search-box");
  const searchValue = searchInput.value;
  searchInput.value = "";
  if (searchValue === "") {
    document.getElementById("spinner").style.display = "none";
    document.getElementById("errorText").style.display = "block";
    document.getElementById("player-container").innerHTML = "";
    document.getElementById("detailsPlayers").innerHTML = "";
  } else {
    document.getElementById("errorText").style.display = "none";
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => showPlayerDetails(data.player));
  }
};
const showPlayerDetails = (players) => {
  if (players === null) {
    document.getElementById("errorText").style.display = "block";
    document.getElementById("spinner").style.display = "none";
    document.getElementById("player-container").innerHTML = "";
    document.getElementById("detailsPlayers").innerHTML = "";
    // console.log(players);
  } else {
    document.getElementById("spinner").style.display = "none";
    // console.log(players);
    const parent = document.getElementById("player-container");
    parent.textContent = "";
    players.forEach((player) => {
      if (player.strThumb !== null) {
        const div = document.createElement("div");
        div.classList.add("col");
        div.classList.add("my-3");
        div.innerHTML = `
            <div class="card" style="width: 18rem;">
            <img w-50 src="${player.strThumb}" class="card-img-top " alt="...">
            <div class="card-body">
              <h5 class="card-title">Name: ${player.strPlayer}cool</h5>
              <p class="card-text">Country: ${player.strNationality}</p>
              <div class="allbutton ">
                <button class="btn btn-danger">
                    Delete
                </button>
                <button onClick="details('${player.idPlayer}')" class="btn btn-success">
                    Details
                </button>
              </div>
            </div>
          </div>
            `;
        parent.appendChild(div);
      }
    });
  }
};
const details = (info) => {
  const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${info}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => setDetails(data.players[0]));
};

const setDetails = (id) => {
  //   console.log(id);
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = "";
  if (id.strGender == "Male") {
    document.getElementById("maleImage").style.display = "block";
    document.getElementById("femaleImage").style.display = "none";
    const div = document.createElement("div");
    div.innerHTML = `
  <div class="card text-center position-relative top-50 start-50 me-2">
                <div class="card-header">
                Team : ${id.strTeam}
                </div>
                <div class="card-body">
                  <h5 class="card-title">Name : ${id.strPlayer}</h5>
                  <p class="card-text">${id.strDescriptionEN.slice(0, 250)}</p>
                </div>
                <div class="card-footer text-muted">
                Nationality : ${id.strNationality}
                </div>
              </div>
    `;
    detailsContainer.appendChild(div);
  } else {
    const detailsContainer = document.getElementById("details-container");
    document.getElementById("femaleImage").style.display = "block";
    const div = document.createElement("div");
    div.innerHTML = `
  <div class="card text-center position-relative top-50 start-50 me-2">
                <div class="card-header">
                Team : ${id.strTeam}
                </div>
                <div class="card-body">
                  <h5 class="card-title">Name : ${id.strPlayer}</h5>
                  <p class="card-text">${id.strDescriptionEN.slice(0, 250)}</p>
                </div>
                <div class="card-footer text-muted">
                Nationality : ${id.strNationality}
                </div>
              </div>
    `;
    detailsContainer.appendChild(div);
  }
};
