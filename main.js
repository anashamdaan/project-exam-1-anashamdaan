const hamburger = document.getElementById('hamburger');
const header = document.querySelector('header');

hamburger.addEventListener('click', () => {
    header.classList.toggle('nav-open');
});


const images = [
    "images/data-governance-blog-thumb-1230x692.jpeg",
    "images/data-governance-blog-thumb-1230x692.jpeg",
];

let currentIndex = 0;
const mainImage = document.getElementById('mainImage');

mainImage.src = images[currentIndex];

function changeImage() {
    mainImage.classList.add("fade-out");

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length;
        mainImage.src = images[currentIndex];

        mainImage.classList.remove("fade-out");
    }, 500); 
}

setInterval(changeImage, 3000);


let posts = JSON.parse(localStorage.getItem('posts')) || [];
function displayLastPosts() {
    const postList = document.getElementById('postList');
    postList.innerHTML = '';

    const lastThreePosts = posts.slice(-3);
    lastThreePosts.forEach(post => {
        const isLongContent = post.content.length > 100;
        const postContent = isLongContent ? post.content.substring(0, 100) + '...' : post.content;

        const postElement = `
            <div class="post">
                <img src="${post.image ? post.image : '/images/2232.jpg'}" alt="Profile Picture" class="profile-pic">
                <div class="post-content">
                    <h3>${post.author}</h3>
                    <small>${post.date}</small>
                    <p>${postContent}</p>
                    ${isLongContent ? '<a href="#" class="read-more">Read More</a>' : ''}
                </div>
            </div>
        `;
        postList.innerHTML += postElement;
    });
    document.querySelectorAll('.read-more').forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const fullContent = posts[posts.length - 3 + index].content;
            this.previousElementSibling.textContent = fullContent;
            this.style.display = 'none';
        });
    });
}

document.querySelector('.post-btn').addEventListener('click', function() {
    const postAuthor = document.getElementById('postAuthor').value;
    const postContent = document.getElementById('postContent').value;
    const postDate = new Date().toLocaleDateString();

    if (!postAuthor || !postContent) {
        alert("Please fill out both fields.");
        return;
    }

    posts.push({
        author: postAuthor,
        content: postContent,
        date: postDate
    });

    localStorage.setItem('posts', JSON.stringify(posts));
    document.getElementById('postAuthor').value = '';
    document.getElementById('postContent').value = '';

    displayLastPosts();
});

displayLastPosts();

const fileInput = document.getElementById('postImage');
const customFileBtn = document.getElementById('customFileBtn');
const fileChosen = document.getElementById('fileChosen');

customFileBtn.addEventListener('click', function(e) {
    e.preventDefault(); 
    fileInput.click();
});


fileInput.addEventListener('change', function() {
    if (fileInput.files.length > 0) {
        fileChosen.textContent = fileInput.files[0].name;
    } else {
        fileChosen.textContent = 'No file chosen';
    }
});


async function fetchJokes() {
    const jokesContainer = document.getElementById('jokes-container');

    const response = await fetch('https://v2.jokeapi.dev/joke/Any?amount=5');
    const data = await response.json();

    data.jokes.forEach(joke => {
        const jokeCard = document.createElement('div');
        jokeCard.classList.add('joke-card');

        if (joke.type === 'twopart') {
            jokeCard.innerHTML = `
                <h3>${joke.setup}</h3>
                <p>${joke.delivery}</p>
            `;
        } else {
            jokeCard.innerHTML = `<p>${joke.joke}</p>`;
        }

        jokesContainer.appendChild(jokeCard);
    });
}

window.onload = function() {
    displayLastPosts();
    fetchJokes();
};
