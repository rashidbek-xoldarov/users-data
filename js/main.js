const elUserList = document.querySelector(".hero__users-list");
const elPostList = document.querySelector(".hero__posts-list");
const elCommentList = document.querySelector(".hero__comments-list");
const userTemplate = document.querySelector(".users-template").content;
const postTemplate = document.querySelector(".posts-template").content;
const commentTemplate = document.querySelector(".comments-template").content;

const fragment = new DocumentFragment();

async function getUserData(url) {
  const response = await fetch(url);
  const data = await response.json();
  renderUsers(data);
}
getUserData("https://jsonplaceholder.typicode.com/users");

function renderUsers(data) {
  elUserList.innerHTML = "";

  data.forEach((item) => {
    const template = userTemplate.cloneNode(true);

    template.querySelector(".hero__user-id").textContent = item.id;
    template.querySelector(".hero__users-title").textContent = item.name;
    template.querySelector(".hero__users-username").textContent = item.username;
    template.querySelector(
      ".user-info-link-location"
    ).href = `https://www.google.com/maps/place/${item.address.geo.lat},${item.address.geo.lng}`;
    template.querySelector(".user-info-link-phone").href = `tel:${item.phone}`;
    template.querySelector(
      ".user-info-link-website"
    ).textContent = `${item.website}`;
    template.querySelector(
      ".user-info-link-website"
    ).href = `https://${item.website}`;
    template.querySelector(
      ".user-info-link-email"
    ).href = `mailto: ${item.email}`;
    template.querySelector(".hero__company-name").textContent =
      item.company.name;
    template.querySelector(".hero__company-text").textContent =
      item.company.catchPhrase;
    template.querySelector(".hero__users-btn").dataset.userId = item.id;

    fragment.appendChild(template);
  });
  elUserList.appendChild(fragment);
}

elUserList.addEventListener("click", function (evt) {
  if (evt.target.matches(".hero__users-btn")) {
    elCommentList.innerHTML = "";
    const userId = evt.target.dataset.userId;
    getPostData(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  }
});

async function getPostData(url) {
  const response = await fetch(url);
  const data = await response.json();
  renderPost(data);
}

function renderPost(data) {
  elPostList.innerHTML = "";

  data.forEach((item) => {
    const template = postTemplate.cloneNode(true);

    template.querySelector(".hero__posts-number").textContent = item.id;
    template.querySelector(".hero__posts-title").textContent = item.title;
    template.querySelector(".hero__posts-text").textContent = item.body;
    template.querySelector(".hero__posts-btn").dataset.postId = item.id;

    fragment.appendChild(template);
  });

  elPostList.appendChild(fragment);
}

elPostList.addEventListener("click", function (evt) {
  if (evt.target.matches(".hero__posts-btn")) {
    const postId = evt.target.dataset.postId;
    getCommentData(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
  }
});

async function getCommentData(url) {
  const response = await fetch(url);
  const data = await response.json();
  renderComment(data);
}

function renderComment(data) {
  elCommentList.innerHTML = "";

  data.forEach((item) => {
    const template = commentTemplate.cloneNode(true);

    template.querySelector(".hero__comment-number").textContent = item.id;
    template.querySelector(".hero__comments-title").textContent = item.name;
    template.querySelector(".hero__comments-text").textContent = item.body;
    template.querySelector(".hero__comments-email").textContent = item.email;
    template.querySelector(
      ".hero__comments-email"
    ).href = `mailto: ${item.email}`;

    fragment.appendChild(template);
  });
  elCommentList.appendChild(fragment);
}
