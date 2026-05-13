const URL = "https://jsonplaceholder.typicode.com/users";
const $userList = document.querySelector("#userList");
const $searchInput = document.querySelector("#searchInput");
const $status = document.querySelector("#status");

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

// Devuelve Usuarios [{}, {}]
async function getUsers() {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        return data;
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

    await wait(700);

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

$searchInput.addEventListener("input", renderUsers);