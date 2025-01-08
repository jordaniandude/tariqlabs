function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const showCourse = getQueryParam('showCourse'); // e.g., 'react', 'js', or 'htmlcss'

let dataScript = '';

// Dynamically determine which course data to load
if (showCourse === 'react') {
    dataScript = '../js/reactData.js';
} else if (showCourse === 'js') {
    dataScript = '../js/jsData.js';
} else if (showCourse === 'nodejs') {
    dataScript = '../js/node.js';
} else {
    console.error('Invalid course selected');
}

// Load the appropriate data file dynamically
if (dataScript) {
    const script = document.createElement('script');
    script.src = dataScript;
    script.onload = () => {
        if (typeof jsPlaylist !== 'undefined' && typeof jsCourseDes !== 'undefined') {
            displayCourseDetails(jsCourseDes[0]); // Display course details
            populatePlaylist(jsPlaylist); // Call function after the data is loaded
        } else {
            console.error('Course data is not defined in the loaded script.');
        }
    };
    document.body.appendChild(script);
}

function displayCourseDetails(course) {
    document.getElementById('courseTitle').innerText = course.title;

    document.getElementById('course_targetAudience').innerText = course.targetAudience;
    document.getElementById('course_courseLength').innerText = course.courseLength;
    document.getElementById('course_numberOfLectures').innerText = course.numberOfLectures;
    document.getElementById('course_requirements').innerText = course.requirements;
    // Use querySelector to select the img element with class "course-logo"
    const courseLogo = document.querySelector('.course-logo');
    if (courseLogo) {
        courseLogo.src = course.logo;
    }
}

function populatePlaylist(data) {
    const playlistElement = document.getElementById('playlist');
    data.forEach(section => {
        const sectionItem = document.createElement('div');
        sectionItem.classList.add('section-item');

        const sectionHeader = document.createElement('div');
        sectionHeader.classList.add('section-header');
        sectionHeader.onclick = () => toggleSection(sectionHeader);

        sectionHeader.innerHTML = `
        <div class="section-header-content">
            <span class="lecture-count">Lectures: ${section.sections.length}</span>
            <h4>${section.title}</h4>
        </div>`;


        const lecturesList = document.createElement('ul');
        lecturesList.classList.add('lectures');
        lecturesList.style.display = 'none';

        section.sections.forEach(lecture => {
            const lectureItem = document.createElement('li');
            lectureItem.innerText = lecture.title;
            lectureItem.setAttribute('data-link', lecture.link);
            lectureItem.onclick = () => updateVideo(lecture.link, lecture.title, " ");
            lecturesList.appendChild(lectureItem);
        });

        sectionItem.appendChild(sectionHeader);
        sectionItem.appendChild(lecturesList);
        playlistElement.appendChild(sectionItem);
    });
}

function toggleSection(sectionHeader) {
    const lecturesList = sectionHeader.nextElementSibling;
    lecturesList.style.display = lecturesList.style.display === 'none' ? 'block' : 'none';
}

function updateVideo(link, title, description) {
    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.src = link;

    const videoTitle = document.getElementById('videoTitle');
    videoTitle.innerText = title;

    const videoDescription = document.getElementById('videoDescription');
    videoDescription.innerText = description || " ";
}