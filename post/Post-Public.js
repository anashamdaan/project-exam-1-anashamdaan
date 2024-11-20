
const hamburger = document.getElementById('hamburger');
const header = document.querySelector('header');

hamburger.addEventListener('click', () => {
    header.classList.toggle('nav-open');
});

let posts = JSON.parse(localStorage.getItem('posts')) || [];

function displayAllPosts() {
    const postList = document.getElementById('publicPostList');
    postList.innerHTML = ''; 

    posts.forEach(post => {
        const postElement = `
            <div class="post">
                <img src="${post.image ? post.image : '/images/2232.jpg'}" alt="Profile Picture" class="profile-pic">
                <div class="post-content">
                    <div class="post-header">
                        <h3 class="post-author">${post.author}</h3>
                        <span class="post-date">${post.date}</span>
                    </div>
                    <p class="post-text">${post.content}</p>
                </div>
            </div>
        `;
        postList.innerHTML += postElement;
    });
}

window.onload = displayAllPosts;




