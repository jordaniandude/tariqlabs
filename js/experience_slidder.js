
const images_root_link = "/tariqlabs";

const careerHighlights = [
    {
        title: "Senior Software Automation Engineer",
        company: "Apple",
        icon: `${images_root_link}/images/apple.png`,
        duration: "2022 - Current",
    },
    {
        title: "Senior Test Engineer",
        company: "Twitter",
        icon: `${images_root_link}/images/twitter.png`,
        duration: "2019 - 2022",
    },
    {
        title: "Senior Software Engineer",
        company: "IBM Turbonomic",
        icon: `${images_root_link}/images/turbo-logo.png`,
        duration: "2019",
    },
    {
        title: "Soccer Referee",
        company: "United States Soccer Federation",
        icon: `${images_root_link}/images/us-ref.png`,
        duration: "2022 - Current",
    },
    {
        title: "Coding Instructor",
        platform: "Udemy",
        icon: `${images_root_link}/images/udemy.png`,
        duration: "2020 - Present",
    },
    {
        title: "Software Engineer",
        platform: "ProgressSoft",
        icon: `${images_root_link}/images/ps-logo.png`,
        duration: "2006 - 2013",
    },
    {
        title: "MSc in Cloud Computing",
        platform: "Stevens Institute of Technology",
        icon: `${images_root_link}/images/stevens-logo.png`,
        duration: "2013 - 2015",
    },
    {
        title: "Masters in Business Administration",
        platform: "New York Institute of Technology",
        icon: `${images_root_link}/images/nyit-logo.png`,
        duration: "2008 - 2010",
    },
    {
        title: "BSc in Software Engineering",
        platform: "Balqa' Applied University",
        icon: `${images_root_link}/images/bau-logo.png`,
        duration: "2002 - 2006",
    },
];

const carouselTrack = document.getElementById("carousel-track");

careerHighlights.forEach((highlight) => {
    const box = document.createElement("div");
    box.className = "box";
    box.innerHTML = `
    <div class="icon" style="font-size: 40px;">
        <img src="${highlight.icon}" style="max-height:50px; max-width=100%; height:auto; width:auto">
    </div>
    <div class="box-content">
        <h3>${highlight.title}</h3>
        <h4>${highlight.company || highlight.platform}</h4>
        <p>${highlight.duration}</p>
    </div>
    `;
    carouselTrack.appendChild(box);
});

const scrollContent = Array.from(carouselTrack.children);
scrollContent.forEach((item) => {
    const duplicate = item.cloneNode(true);
    carouselTrack.appendChild(duplicate);
});

carouselTrack.style.display = "flex";
carouselTrack.style.width = "max-content";
carouselTrack.style.animation = "scroll-left 50s linear infinite";

