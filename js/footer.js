// Create the footer element
const footer = document.createElement('footer');

footer.innerHTML = `
    <div class="footer-container">
        <div class="footer-brand">
            <img src="/tariqlabs/images/tab_footer_icon.png" alt="tariq photo">
            <p>Tariq Elouzeh, Senior Software Engineer at Apple, Interviews Coach, Coding Instructor and Content Creator.</p>
            <div class="social-icons">
                <a href="https://www.linkedin.com/in/tariqelouzeh/" target="_blank"><img src="/tariqlabs/images/linkedin.png" alt="LinkedIn"></a>
                <a href="https://www.instagram.com/tariqelouzeh/" target="_blank"><img src="/tariqlabs/images/instagram.png" alt="Instagram"></a>
                <a href="https://www.youtube.com/@tariqelouzeh" target="_blank"><img src="/tariqlabs/images/youtube.png" alt="YouTube"></a>
                <a href="https://open.spotify.com/show/0KXiNLus1U3dAD2GwnMATu" target="_blank"><img src="/tariqlabs/images/spotify.png" alt="poadcast"></a>
            </div>
        </div>
        <div class="footer-links">
            <div>
                <h4>Services</h4>
                <ul>
                    <li><a href="https://calendly.com/meettariq/30min">Consultation</a></li>
                    <li><a href="https://calendly.com/meettariq/coding">Coding Mock Interview</a></li>
                    <li><a href="https://calendly.com/meettariq/qa">QA Mock Interview</a></li>
                    <li><a href="https://calendly.com/meettariq/system">System Design Mock Interview</a></li>
                </ul>
            </div>
            <div>
                <h4>Courses</h4>
                <ul>
                    <li><a href="/tariqlabs/html/course.html?showCourse=js">Javascript Essentials</a></li>
                    <li><a href="#">Full Stack Web Development with Node</a></li>
                    <li><a href="#">React Bootcamp</a></li>
                    <li><a href="#">How Tech Companies Work</a></li>
                </ul>
            </div>
            <div>
                <h4>Content</h4>
                <ul>
                    <li><a href="/tariqlabs/html/allInterviews.html">Coding Interviews</a></li>
                    <li><a href="/tariqlabs/html/poadcast.html">Podcast</a></li>
                </ul>
            </div>
             <div>
<a href="https://www.linkedin.com/in/reema-asker" target="_blank" style="text-decoration: none;
color: inherit;     
">
        <div class="floating-container">
            <div class="scrolling-row">
                <img src="/tariqlabs/images/reema_logo.png" alt="Reema" class="profile-image">
                <span>ᴍᴀᴅᴇ ʙʏ 𝓡𝓮𝓮𝓶𝓪 𝓐. 𝓐𝓼𝓴𝓮𝓻</span>
            </div>
        </div>
    </a>
          </div>
        </div>
       
    </div>
`;

// Append the footer to the body
document.body.appendChild(footer);