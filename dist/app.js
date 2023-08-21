"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const firstArticleElement = document.querySelector('.first-article');
const allArticlesElement = document.querySelector('.all-articles');
const readNextElement = document.querySelector('.read-next');
const article = document.querySelector('.article');
const urlSearchParams = new URLSearchParams(window.location.search);
const postId = urlSearchParams.get('id');
// Get first post
function firstPost(url = 'https://jsonplaceholder.typicode.com/posts/1') {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url);
        const data = yield response.json();
        if (firstArticleElement) {
            const heading = firstArticleElement.querySelector('#title');
            const paragraph = firstArticleElement.querySelector('#paragraph');
            const image = firstArticleElement.querySelector('#first-image');
            heading.classList.add('hide');
            paragraph.classList.add('hide');
            image.classList.add('hide');
        }
        const link = document.createElement('a');
        link.setAttribute('href', `/article.html?id=${data.id}`);
        link.innerHTML = `<img src="img/0.png" id="first-image" alt="first-image">
    <h1>${data.title}</h1>
    <p>${data.body.substring(0, 50)}</p>`;
        firstArticleElement.appendChild(link);
    });
}
//Get All Posts
function allPosts(url = 'https://jsonplaceholder.typicode.com/posts/') {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url);
        const data = yield response.json();
        const firstTenElement = data.slice(0, 6);
        const columArticlesElements = allArticlesElement.querySelector('.colum-articles');
        if (columArticlesElements) {
            const div = columArticlesElements.querySelector('#article');
            div.classList.add('hide');
        }
        firstTenElement.forEach((post, index) => {
            const link = document.createElement('a');
            link.setAttribute('href', `/article.html?id=${post.id}`);
            const listItem = document.createElement('li');
            const listItemContent = document.createElement('div');
            listItemContent.classList.add('new-list');
            listItemContent.innerHTML = `<img src="img/${index}.png" id="" alt="first-image">
                <p>${post.title}</p>`;
            link.appendChild(listItemContent);
            listItem.appendChild(link);
            columArticlesElements.appendChild(listItem);
        });
    });
}
//Get Individual post
function getPost(id, url = 'https://jsonplaceholder.typicode.com/posts/') {
    return __awaiter(this, void 0, void 0, function* () {
        const [responsePost] = yield Promise.all([
            fetch(`${url}/${id}/`),
        ]);
        const dataPost = yield responsePost.json();
        if (article) {
            const heading = article.querySelector('#title');
            const paragraph = article.querySelector('#paragraph');
            const image = article.querySelector('#image');
            heading.classList.add('hide');
            paragraph.classList.add('hide');
            image.classList.add('hide');
        }
        article.classList.remove('hide');
        article.innerHTML = `<h1>${dataPost.title}</h1>
        <p>${dataPost.body}</p>
        <img src="img/${+id - 1}.png">`;
    });
}
//Get Posts to next
function readNext(url = 'https://jsonplaceholder.typicode.com/posts/') {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url);
        const data = yield response.json();
        const firstTenElement = data.slice(0, 6);
        const rowArticlesElements = readNextElement.querySelector('.row-articles');
        if (rowArticlesElements) {
            const list = readNextElement.querySelector('li');
            const div = rowArticlesElements.querySelector('#article');
            const paragraph = div.querySelector('#paragraph');
            list.classList.add('hide');
            paragraph.classList.add('hide');
            div.classList.add('hide');
        }
        firstTenElement.forEach((post, index) => {
            const link = document.createElement('a');
            link.setAttribute('href', `/article.html?id=${post.id}`);
            const listItem = document.createElement('li');
            const listItemContent = document.createElement('div');
            listItemContent.classList.add('new-list');
            listItemContent.innerHTML = `<img src="img/${index}.png" id="" alt="first-image">
                <p>${post.title}</p>`;
            link.appendChild(listItemContent);
            listItem.appendChild(link);
            rowArticlesElements.appendChild(listItem);
        });
    });
}
if (!postId) {
    firstPost();
    allPosts();
}
else {
    readNext();
    getPost(postId);
}
