fetch("componentes/header.html")
    .then(res => res.text())
    .then(html => {
        document.querySelector("#header").innerHTML = html
        iniciarMenu()

    })




function iniciarMenu() {
    const btnMenu = document.querySelector(".hamburguer")
    const menu = document.querySelector(".menu")

    if (!btnMenu || !menu) return

    //fecha menu
    function removerAtivos() {
        btnMenu.classList.remove("active")
        menu.classList.remove("ativo")
        btnMenu.setAttribute("aria-expanded","false")
    }

    //toggle do menu
    btnMenu.addEventListener("click", (evt) => {
        evt.stopPropagation()

        const ativo = menu.classList.toggle("ativo")
        btnMenu.classList.toggle("active", ativo)
        btnMenu.setAttribute("aria-expanded", ativo)

    })

    //fecha o menu ao clicar em um link
    menu.addEventListener("click",(evt)=>{
        evt.stopPropagation()
        const link = evt.target.closest(".link-menu")
        if(!link)return
        removerAtivos()
    })

    let faixaAtual = getFaixa()

    // evento resize fecha menu
    window.addEventListener("resize", () => {
        let novaFaixa = getFaixa()

        if (novaFaixa !== faixaAtual) {
            removerAtivos()
        }
        faixaAtual = novaFaixa
    })


    //fecha menu clicando fora dele
    document.addEventListener("click",()=>{
        removerAtivos()
    })


    //fecha menu com tecla ESC
    document.addEventListener("keydown",(evt)=>{
        if(evt.key === "Escape" && menu.classList.contains("ativo")){
            removerAtivos()
        }
    })

}

function getFaixa() {
    const largura = window.innerWidth

    if (largura <= 768) return "mobile"
    if (largura <= 1260) return "tablet"
    return "desktop"
}






