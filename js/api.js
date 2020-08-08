const apiUrl = "https://api.football-data.org/v2/";
const yearUrl = 2021;
const tableUrl = `${apiUrl}competitions/${yearUrl}/standings`;
const teamUrl = `${apiUrl}competitions/${yearUrl}/teams`;

const fetchApi = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': 'fa9409f80f644b728d50435b96e6843a'
        }
    })
}

function status(response) {
    if (response.status !== 200) {
        console.log("error : " + response.status);
        return Promise.reject(new Error(response.status));
    } else {
        return Promise.resolve(response);
    }
}

//Blok kode memparsing json menjadi array javascript
function json(response) {
    return response.json();
}

//Blok kode untuk menghandle kesalahn di blok catch
function error(error) {
    console.log("Error : " + error)
};

//Blok kode untuk melakukan request data json
function getTableTeams() {
    if ('caches' in window) {
        caches.match(tableUrl)
            .then(function (response) {
                if (response) {
                    response.json()
                        .then(function (data) {
                            getInfo(data);
                        })
                }
            })
    }


    fetchApi(tableUrl)
        .then(status)
        .then(json)
        .then(function (data) {
            getInfo(data)
        })
        .catch(error);
}

const getTimnas = () => {
    return fetchApi(teamUrl)
        .then(status)
        .then(json);
}

const getClubBall = () => {
    return fetchApi(tableUrl)
        .then(status)
        .then(json);
}

const getImage = () => {
    let teamsClub = getTimnas();
    teamsClub.then(data => {
        let cardHtml = "";
        dataTeams = data;
        data.teams.forEach(cardImage => {
            cardHtml += `            
                    <div class="card z-depth-3 center-align">                   
                        <div class="card-image">
                            <img src="${cardImage.crestUrl}" alt="tim" style="width: 120px; display: block; margin-left: auto; margin-right: auto;">
                            <a class="btn-floating halfway-fab waves-effect waves-light gray" onclick="insertClickAdd(${cardImage.id})"
                                id="buttonsave"><i class="material-icons"> <img src="img/save.webp" alt="plus"></i></a>
                        </div>
                        <div class="card-content">
                            <p class="sticky">${cardImage.name}</p>
                            <p>liga tertinggi dalam sistem liga sepak bola di Inggris. Kompetisi ini diikuti oleh
                                20 klub.</p>
                            <p>Address : ${cardImage.address}</p>
                            <p>Venue : ${cardImage.venue}</p>
                        </div>
                        <div class="card-action">
                            <a href="${cardImage.website}">This is a Website</a>
                        </div>
                    </div>
            `;
        });
        document.getElementById("cardsinner").innerHTML = cardHtml;
    })
}

function getInfo() {
    let teams = getClubBall();
    teams.then(data => {
        let cardHtml = "";
        data.standings[0].table.forEach(team => {
            cardHtml += `                
                <tr>
                    <td>${team.position}</td>
                    <td><img class="responsive-img" width="20" height="20" src="${team.team.crestUrl}" alt="logo"></td>
                    <td>${team.team.name}</td>
                    <td>${team.playedGames}</td>
                    <td>${team.won}</td>
                    <td>${team.draw}</td>
                    <td>${team.lost}</td>
                    <td>${team.goalsFor}</td>
                    <td>${team.goalsAgainst}</td>
                    <td>${team.goalDifference}</td>
                    <td>${team.points}</td>
                </tr>
            `;
        });
        document.getElementById("tableStandings").innerHTML = cardHtml;
    })
}


function getHistory() {
    let dataDB = getHistoryTeams();
    dataDB.then(function (data) {
        let htmlCards = "";
        data.forEach(function (cardImage) {
            htmlCards += `
                    <div class="card z-depth-3 center-align">
                        <div class="card-image">
                            <img src="${cardImage.crestUrl}" alt="teams"
                                style="width: 120px; display: block; margin-left: auto; margin-right: auto;">
                            <a class="btn-floating halfway-fab waves-effect waves-light gray" onclick="deleteClick(${cardImage.id})"
                                id="delete"><i class="material-icons"> <img src="img/delete.webp" alt="minus"></i></a>
                        </div>
                        <div class="card-content">
                            <p class="sticky">${cardImage.name}</p>
                            <p>liga tertinggi dalam sistem liga sepak bola di Inggris. Kompetisi ini diikuti oleh
                                20 klub.</p>
                            <p>Address : ${cardImage.address}</p>
                            <p>Venue : ${cardImage.venue}</p>
                        </div>
                        <div class="card-action">
                            <a href="${cardImage.website}">This is a Website</a>
                        </div>
                    </div>
            `;
        });
        document.getElementById("cards-history").innerHTML = htmlCards;
    });
}