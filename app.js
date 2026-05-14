const URL = "https://jsonplaceholder.typicode.com";
const USERS_URL = `${URL}/users`;
const POSTS_URL = `${URL}/posts`;

const $userList = document.querySelector("#userList");
const $searchInput = document.querySelector("#searchInput");
const $status = document.querySelector("#status");
const $getPostsButton = document.querySelector("#getPostsButton");
const $postsList = document.querySelector("#postsList");

function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
// Devuelve un List Item con el email y el nombre
function generateUserHTML({ email, name }) {
    const $listItem = document.createElement("li");
    const $userHeading2 = document.createElement("h2");
    const $userSpan = document.createElement("span");

    $userSpan.innerText = email;
    $userHeading2.innerText = name;

    $listItem.appendChild($userHeading2);
    $listItem.appendChild($userSpan);

    return $listItem;
}

function generatePostHTML({ title }) {
    const $listItem = document.createElement("li");
    const $postTitle = document.createElement("h3");

    $postTitle.innerText = title;
    $listItem.appendChild($postTitle);

    return $listItem;
}

// Devuelve Usuarios [{}, {}]
async function getUsers() {
    try {
        const response = await fetch(USERS_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getPosts() {
    try {
        const response = await fetch(POSTS_URL);

        if (!response.ok) {
            throw new Error("Error al obtener los posts");
        }

        const data = await response.json();
        return data.slice(0, 5);
    } catch (error) {
        console.error(error);
    }
}

// Function de filtro de usuarios
function filterUsers(query, users) {
    return users.filter((user) => user.name.includes(query));
}

// Renderiza todos los usuarios
async function renderUsers(event) {
    $status.innerText = "Buscando usuarios...";
    $userList.replaceChildren();

    await wait(500);

    const users = await getUsers();
    const query = event.target.value;

    const filteredUsers = filterUsers(query, users);

    if (filteredUsers.length === 0) {
        $status.innerText = "No se encontraron usuarios";
        return;
    }

    $status.innerText = `Se encontraron ${filteredUsers.length} usuarios`;

    filteredUsers.forEach((user) => {
        const { name, email } = user;

        const $userListElement = generateUserHTML({ name, email });

        $userList.appendChild($userListElement);
    });
}

async function renderPosts() {
    const posts = await getPosts();
    $postsList.replaceChildren();

    posts.forEach((post) => {
        const $postElement = generatePostHTML(post);
        $postsList.appendChild($postElement);
    });
}

$searchInput.addEventListener("input", renderUsers);
$getPostsButton.addEventListener("click", renderPosts);