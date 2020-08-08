document.addEventListener("DOMContentLoaded", function () {
    let element = document.querySelectorAll(".sidenav");
    M.Sidenav.init(element);
    mainNav();

    function mainNav() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status !== 200)
                    return;

                document.querySelectorAll(".right, .sidenav").forEach(function (elem) {
                    elem.innerHTML = xhttp.responseText;
                });

                document.querySelectorAll(".right, .sidenav").forEach(function (elem) {
                    elem.addEventListener("click", function (event) {
                        let navv = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(navv).close();
                        pagehal = event.target.getAttribute("href").substr(1);
                        loadPage(pagehal);
                    })
                });
            }
        };

        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }

    let pagehal = window.location.hash.substr(1);
    loadPage(setup(pagehal));

    function setup(pagehal) {
        if (pagehal == "" || pagehal == "#") {
            pagehal = "teams";
        } else if (pagehal == "klasemen") {
            pagehal = "klasemen";
        } else if (pagehal == "history") {
            pagehal = "history";
        }
        return pagehal;
    }

    function loadPage(pagehal) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                let bodyContent = document.querySelector("#body-content");
                if (pagehal === "teams") {
                    getImage();
                } else if (pagehal === "klasemen") {
                    getInfo();
                } else if (pagehal === "history") {
                    getHistory();
                }

                if (this.status == 200) {
                    bodyContent.innerHTML = xhttp.responseText;
                } else if (this.status == 404) {
                    bodyContent.innerHTML = `<p>Halaman gagal dimuat</p>`;
                } else {
                    bodyContent.innerHTML = `<p>Akses halaman gagal</p>`;
                }
            }
        };
        xhttp.open("GET", `pages/${pagehal}.html`, true);
        xhttp.send();
    }
});