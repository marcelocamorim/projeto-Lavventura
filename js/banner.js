let startX = 0
let endX = 0

const banner = document.querySelector(".banner")
const slides = document.querySelectorAll(".slides picture")
const btnPrev = document.querySelector(".prev")
const btnNext = document.querySelector(".next")
const dotsContainer = document.querySelector(".dots")

let index = 0
let autoSlide = null
let mouseNoBanner = false

//cria dots e listeners deles
slides.forEach((el, i) => {
    const dot = document.createElement("span")

    if (i === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
        index = i
        mostrarSlide(index)

        if (!mouseNoBanner) {
            restartAutoSlide()

        }
    })

    dotsContainer.appendChild(dot)

})

//ativa as classes do banner e dos dots
function mostrarSlide(i) {
    slides.forEach(slide => slide.classList.remove("active"))
    slides[i].classList.add("active")

    document.querySelectorAll(".dots span").forEach(dot => {
        dot.classList.remove("active")
    })

    document.querySelectorAll(".dots span")[i].classList.add("active")
}

// start banner
function startAutoSlide() {
    clearInterval(autoSlide)

    autoSlide = setInterval(() => {
        index = (index + 1) % slides.length
        mostrarSlide(index)
    }, 2000)

}

//para banner
function stopAutoSlide() {
    clearInterval(autoSlide)
}

//restart banner
function restartAutoSlide() {
    stopAutoSlide()
    startAutoSlide()
}

startAutoSlide()


//lister de mouse no banner
banner.addEventListener("mouseenter", () => {
    mouseNoBanner = true
    stopAutoSlide()
})

banner.addEventListener("mouseleave", () => {
    mouseNoBanner = false
    startAutoSlide()
})


//buttons prev e next
btnPrev.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length
    mostrarSlide(index)

    if (!mouseNoBanner) {
        restartAutoSlide()

    }
})

btnNext.addEventListener("click", () => {
    index = (index + 1) % slides.length
    mostrarSlide(index)
    if (!mouseNoBanner) {
        restartAutoSlide()

    }
})


//controle do banner com deslizar (mobile, tablet...)
banner.addEventListener("pointerdown", (evt)=>{
    startX = evt.clientX
})

banner.addEventListener("pointerup",(evt)=>{
    endX = evt.clientX
    swipe()
})

function swipe(){
    const distance = endX - startX
    const minSwipe = 50

    if(Math.abs(distance) < minSwipe) return

    if(distance < 0){
        index = (index +1) % slides.length
    }else{
        index = (index -1 + slides.length) % slides.length
    }

    mostrarSlide(index)

    if(!mouseNoBanner){
        restartAutoSlide()
    }
}
