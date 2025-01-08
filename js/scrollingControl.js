
function applyScrollBehavior() {
    const sidemenu = document.getElementById("sidemenu");
    if (!sidemenu) return; // Ensure the sidemenu exists

    let scrollHandlerAttached = false; // Track if the scroll listener is attached

    // Function to handle scrolling for large screens
    function scrollHandler() {
        const sidemenuTop = sidemenu.offsetTop;

        if (window.pageYOffset >= sidemenuTop) {

            sidemenu.style.right = "calc(50% - 20%)";
            sidemenu.classList.add("fixed");
            sidemenu.classList.remove("absolute", "relative");
            sidemenu.style.position = "fixed";
            sidemenu.style.top = "0";
        } else {

            sidemenu.style.right = "calc(-25%)";
            sidemenu.classList.add("relative");
            sidemenu.classList.remove("fixed", "relative");
            sidemenu.style.position = "relative";
            sidemenu.style.top = "";
        }
    }

    // Function to apply relative styles for small screens
    function applySmallScreenStyles() {
        sidemenu.style.right = "0";

        // Remove the scroll event listener if it exists
        if (scrollHandlerAttached) {
            window.removeEventListener("scroll", scrollHandler);
            scrollHandlerAttached = false;
        }

        // Apply relative styles if sidemenu is fixed
        if (window.getComputedStyle(sidemenu).position === "fixed") {
            sidemenu.classList.remove("fixed", "absolute");
            sidemenu.classList.add("relative");
            sidemenu.style.position = "relative";
            sidemenu.style.top = "";
            sidemenu.style.left = "";

        }
    }

    // Function to handle screen size changes
    function handleResize() {
        if (window.innerWidth >= 1200) {
            document.getElementById("menu-icon").style.display = "none";
            document.getElementById("close-icon").style.display = "none";

            // Large screen behavior
            if (!scrollHandlerAttached) {
                window.addEventListener("scroll", scrollHandler);
                scrollHandlerAttached = true;
            }
            sidemenu.classList.remove("relative"); // Ensure small screen styles are removed
        } else {

            document.getElementById("menu-icon").style.display = "";
            document.getElementById("close-icon").style.display = "";
            if (document.getElementById("menu-icon").style.display !== "none") {
                sidemenu.classList.remove("active");
            }


            // Small screen behavior
            applySmallScreenStyles();
        }
    }

    // Initialize the behavior
    handleResize();

    // Attach resize event listener to reapply styles on window resize
    window.addEventListener("resize", handleResize);
}

// Call the function on page load
applyScrollBehavior();
