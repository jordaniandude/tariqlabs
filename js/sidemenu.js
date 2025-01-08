// Create nav element
const nav = document.createElement('nav');
nav.innerHTML = `
<nav>
    <div class="logo-menu">
        <div class="logo">
            <img src="../images/logo-light.png" alt="Logo">
        </div>
        <div class="menu-icon">
            <i class="fa-solid fa-bars" id="menu-icon" onclick="toggleMenu()"></i>
            <i class="fa-solid fa-xmark" id="close-icon" onclick="toggleMenu()" style="display: none;"></i>
        </div>
    </div>
    <ul id="sidemenu" class="menu-closed">
        <li><a href="index.html">Home</a></li>
        <li><a href="courses.html">Courses</a></li>
        <li><a href="allInterviews.html">Coding Interviews</a></li>
        <li><a href="poadcast.html">Podcast</a></li>
    </ul>
</nav>
`;

// Append the nav to the body
document.body.appendChild(nav);

// Function to toggle menu
function toggleMenu() {
    const sidemenu = document.getElementById("sidemenu");
    const menuIcon = document.getElementById("menu-icon");
    const closeIcon = document.getElementById("close-icon");

    // Toggle menu visibility
    sidemenu.classList.toggle("menu-open");
    sidemenu.classList.toggle("menu-closed");

    // Toggle icons
    const isOpen = sidemenu.classList.contains("menu-open");
    if (isOpen) {
        sidemenu.classList.add("active");

    } else {
        sidemenu.classList.remove("active");

    }
    menuIcon.style.display = isOpen ? "none" : "inline-block";
    closeIcon.style.display = isOpen ? "inline-block" : "none";

    // Accessibility attribute
    sidemenu.setAttribute("aria-expanded", isOpen);
}