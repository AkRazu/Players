const allPlayers = () => {
  const searchValue = document.getElementById("search-box").value;
  const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showPlayerDetails(data.player));
};
const showPlayerDetails = (players) => {
  players.forEach((player) => {
    const parent = document.getElementById("player-container");
    const div = document.createElement("div");
    div.classList.add("col");
    div.classList.add("my-3");
    div.innerHTML = `
    <div class="card text-center">
                <div class="card-header">
                  Featured
                </div>
                <div>
                    <img w-50 src="${player.strThumb}" class="card-img-top " alt="...">
                </div>
                <div class="card-body">
                  <h5 class="card-title">Special title treatment</h5>
                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
                <div class="card-footer text-muted">
                  2 days ago
                </div>
              </div>
    `;
    parent.appendChild(div);
  });
};

const details = (info) => {
  const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${info}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => setDetails(data.players[0]));
};

const setDetails = (id) => {
  console.log(id);
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.textContent = "";
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card text-center">
  <div class="card-header">
    Featured
  </div>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
  <div class="card-footer text-muted">
    2 days ago
  </div>
</div>
    `;
  detailsContainer.appendChild(div);
};
