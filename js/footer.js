fetch("componentes/footer.html")
    .then(res => res.text())
    .then(html => {
        document.querySelector("#footer").innerHTML = html

    })