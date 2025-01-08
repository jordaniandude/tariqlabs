const scro = document.querySelectorAll(".carousel");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}
function addAnimation() {
    scro.forEach(scroller => {
        scroller.setAttribute('data-animated', true);

        const scrollInner = scroller.querySelector('.carousel-track');
        const scrollContent = Array.from(scrollInner.children);

        scrollContent.forEach(item => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute('aria-hidden', true);
            scrollContent.appendchild(duplicatedItem);
        })
    });
}