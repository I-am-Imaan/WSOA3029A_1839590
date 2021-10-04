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


