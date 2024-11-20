const hamburger = document.getElementById('hamburger');
const header = document.querySelector('header');

hamburger.addEventListener('click', () => {
    header.classList.toggle('nav-open');
});


let posts = JSON.parse(localStorage.getItem('posts')) || [];
let editIndex = null;

function displayAdminPosts() {
    const postList = document.getElementById('adminPostList');
    postList.innerHTML = '';

    posts.forEach((post, index) => {
        const postElement = `
            <div class="post">
                <img src="${post.image ? post.image : '/images/2232.jpg'}" alt="Profile Picture" class="profile-pic">
                <div class="post-content">
                    <h3>${post.author}</h3>
                    <p>${post.content}</p>
                    <button class="edit-btn" onclick="editPost(${index})">Edit</button>
                    <button class="delete-btn" onclick="deletePost(${index})">Delete</button>
                </div>
            </div>
        `;
        postList.innerHTML += postElement;
    });
}

function deletePost(index) {
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts)); 
    displayAdminPosts(); 
}

function editPost(index) {
    editIndex = index; 
    const post = posts[index];

    document.getElementById('editPostSection').style.display = 'block';
    document.getElementById('editPostAuthor').value = post.author;
    document.getElementById('editPostContent').value = post.content;
}

document.querySelector('.save-edit-btn').addEventListener('click', function() {
    const updatedAuthor = document.getElementById('editPostAuthor').value;
    const updatedContent = document.getElementById('editPostContent').value;

    if (!updatedAuthor || !updatedContent) {
        alert('Please fill out both the author and content fields.');
        return;
    }

    posts[editIndex].author = updatedAuthor;
    posts[editIndex].content = updatedContent;

    localStorage.setItem('posts', JSON.stringify(posts));

    document.getElementById('editPostSection').style.display = 'none';
    displayAdminPosts();
});

window.onload = displayAdminPosts;



document.addEventListener('DOMContentLoaded', function() {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const userList = document.getElementById('userList');

    function displayUsers() {
        userList.innerHTML = ''; 
        users.forEach((user, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td><button class="delete-btn" data-index="${index}">Delete</button></td>
            `;

            userList.appendChild(row);
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                deleteUser(index);
            });
        });
    }

    function deleteUser(index) {
        users.splice(index, 1); 
        localStorage.setItem('users', JSON.stringify(users)); 
        displayUsers(); 
    }

    displayUsers();
});


