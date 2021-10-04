const burgerMenu = () => {
    const toggleButton = document.querySelector(".toggle-button");
    const navLinks = document.querySelectorAll(".nav-links");



    toggleButton.addEventListener('click', () => {
        for (let i = 0; i<4;i++){
            navLinks[i].classList.toggle("active");
        }
        
    }

    );
}

document.addEventListener('DOMContentLoaded', () => {burgerMenu()});





const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
    if(window.pageYOffset > 100){
        toTop.classList.add("active");
    } else{
        toTop.classList.remove("active");
    }
})