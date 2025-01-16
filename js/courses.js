const courses = [
    {
        title: "JavaScript Essentials",
        description: "Learn the essentials of JavaScript, build and deploy a website applying what you learned in addition to using HTML and CSS.",
        image: "../images/js-course.jpg",
        link: "/course/?showCourse=js"
    },
    {
        title: "React Bootcamp",
        description: "Learn the basics of React and build two Full Stack applications.",
        image: "../images/react-course.jpeg",
        link: "#"
    },
    {
        title: "Full Stack Web Development | Node",
        description: "Learn the basics of Node JS And build a full stack application to apply the knowledge you learned.",
        image: "../images/nodejs-course.png",
        link: "#"
    }
];

function allCourses() {
    const workList = document.getElementById("work-list");

    courses.forEach(course => {
        const courseDiv = document.createElement("div");
        courseDiv.classList.add("work");

        courseDiv.innerHTML = `
<a href="${course.link}"><img src="${course.image}" alt="${course.title}"></a>
<div class="layer">
<h3>${course.title}</h3>
<p>${course.description}</p>
</div>
`;

        workList.appendChild(courseDiv);
    });
}
// Function to render the last three courses
function renderLastThreeCourses() {
    const workList = document.getElementById("work-list");
    const lastThreeCourses = courses.slice(-3); // Get the last three courses

    lastThreeCourses.forEach(course => {
        const courseDiv = document.createElement("div");
        courseDiv.classList.add("work");

        courseDiv.innerHTML = `
            <a href="${course.link}"><img src="${course.image}" alt="${course.title}"></a>
            <div class="layer">
                <h3>${course.title}</h3>
                <p>${course.description}</p>
            </div>
        `;

        workList.appendChild(courseDiv);
    });
}