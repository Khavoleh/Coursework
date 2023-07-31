const burger = document.querySelector(".navbar-inner-burger");
const navMenu = document.querySelector(".navbar-inner-buttons-list")

burger.addEventListener("click", ()=>{
    burger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".navbar-link").forEach(n => n.addEventListener("click", () => {
    burger.classList.remove("active");
    navMenu.classList.remove("active");
}))
