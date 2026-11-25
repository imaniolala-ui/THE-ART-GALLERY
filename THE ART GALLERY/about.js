const sections = document.querySelectorAll("section");

sections.forEach(function(section) {

    section.style.opacity = "0";

    section.style.transform = "translateY(20px)";

    section.style.transition = "opacity 1s ease, transform 1s ease";

});

window.addEventListener("load", function() {

    sections.forEach(function(section, index) {

        setTimeout(function() {

            section.style.opacity = "1";

            section.style.transform = "translateY(0)";

        }, index * 200);

    });

});
