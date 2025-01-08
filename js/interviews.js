// Video playlist data
const videos = [
    {
        title: "  شركات التكنولوجيا (مع مصطفى من مصر)",
        link: "https://www.youtube.com/embed/k1v5oF8AeLE",
    },
    {
        title: "Palindrome   | مع الياس من لبنان",
        link: "https://www.youtube.com/embed/XAKmmBK3Ttc",
    },
    {
        title: "  مع عبدالرحمن من فلسطين | APIs",
        link: "https://www.youtube.com/embed/frshwrtUFzo",
    },
    {
        title: " مع فراس من سوريا | Basic Chat App ",
        link: "https://www.youtube.com/embed/AkdHO1iBiTw",
    },
    {
        title: "   مع سندس من الأردن | Foreign language sorting",
        link: "https://www.youtube.com/embed/2rhTBIXhY6s",
    },
    {
        title: "   النسخة المدرسية | مع فايز من فلسطين",
        link: "https://www.youtube.com/embed/DWdRUnvK3fY",
    },
    {
        title: "   مع محمد رأفت من مصر | binary search",
        link: "https://www.youtube.com/embed/SKfC1vPeijw",
    },

    ,
    {
        title: "   مع ألطاف من تونس | Troubleshooting",
        link: "https://www.youtube.com/embed/zueQ_Oc9YjU?si=tSDbVaGoJ4YxKwdb",
    },
    {
        title: " البرمجة  مع سيف من الأردن | Careem Rides",
        link: "https://www.youtube.com/embed/8pf5QH2Ob20?si=aUonwp_J2NUbmpyVw",
    },
    {
        title: "مقابلة تصميم النظم | مع إحسان من السعودية | Design Chat App",
        link: "https://www.youtube.com/embed/AoycQJz9d14?si=2RYQv4LSJvlFN6BS",
    },
    {
        title: "   مع محمد آغا | Command Design Pattern",
        link: "https://www.youtube.com/embed/XhLSKBhqKK4?si=rkp0FUjsSU7J21B4",
    },
    {
        title: "  مع عبدالله أحمد | Recursion",
        link: "https://www.youtube.com/embed/Ry2fl3SI4kM?si=MH83V7pRjMoLi3Hl",
    },
    {
        title: "مقابلة   مع محمد دبساوي | Top Hashtags",
        link: "https://www.youtube.com/embed/ubKK8DGyn5M?si=W2wQ2UNp3A8G9VmW",
    }

];



// Populate the playlist
const playlist = document.getElementById("playlist");
const videoPlayer = document.getElementById("videoPlayer");
const videoTitle = document.getElementById("videoTitle");

videos.forEach((video, index) => {
    const videoItem = document.createElement("div");
    videoItem.className = "video-item";

    // // Thumbnail
    // const img = document.createElement("img");
    // img.src = video.thumbnail;
    // img.alt = video.title;

    // Title
    const title = document.createElement("h4");
    title.textContent = video.title;

    // Add click event to load the video
    videoItem.onclick = () => {
        videoPlayer.src = video.link;
        videoTitle.textContent = video.title;
    };

    videoItem.appendChild(title);
    // videoItem.appendChild(img);

    playlist.appendChild(videoItem);
});

// Set the first video as default
videoPlayer.src = videos[0].link;
videoTitle.textContent = videos[0].title;