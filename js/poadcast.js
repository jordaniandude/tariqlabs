// Video playlist data
const videos = [
    {
        title: "١ واقع الأمن السيبراني في الوطن العربي | مع أيمن حمودة",
        link: "https://www.youtube.com/embed/a_p75ghXBFQ",
    },
    {
        title: "٢ كيف تحول فكرتك لشركة رابحة | فادي الجبالي ومهند طوبال",
        link: "https://www.youtube.com/embed/QW-4EDd7CBA",
    },
    {
        title: "٣ مستقبل إنترنت الأشياء والمدن الذكية | الدكتور عبدالله خنفور",
        link: "https://www.youtube.com/embed/_467SAsVJqk",
    },
    {
        title: "٤ كيف تكون جاهزاً لسوق العمل | الأستاذ محمد أبو هدهود",
        link: "https://www.youtube.com/embed/K0wjC-R5Wm0",
    },
    {
        title: "٥ التكنولوجيا في غزة | المهندسة ريما عسكر",
        link: "https://www.youtube.com/embed/xj_ZBrTvS4k",
    },
    {
        title: "٦ الفرق بين هندسة وعلم وتحليل البيانات | د. رغد خوالدة",
        link: "https://www.youtube.com/embed/X928LVRNIrI",
    },

];



// Populate the playlist
const playlist = document.getElementById("playlist");
const videoPlayer = document.getElementById("videoPlayer");
const videoTitle = document.getElementById("videoTitle");

videos.forEach((video, index) => {
    const videoItem = document.createElement("div");
    videoItem.className = "video-item";


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