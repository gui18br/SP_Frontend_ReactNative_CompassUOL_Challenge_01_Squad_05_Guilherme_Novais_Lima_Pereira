const firstArticleElement = document.querySelector('.first-article')! as HTMLElement;
const allArticlesElement = document.querySelector('.all-articles')! as HTMLElement;
const readNextElement = document.querySelector('.read-next')! as HTMLElement;
const article = document.querySelector('.article')! as HTMLElement;

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
    photo: ImageData;
}

const urlSearchParams = new URLSearchParams(window.location.search);
const postId: string | null = urlSearchParams.get('id');

// Get first post
async function firstPost(url: string = 'https://jsonplaceholder.typicode.com/posts/1') {
    const response: Response = await fetch(url);
    const data: Post = await response.json();
    if (firstArticleElement) {
        const heading = firstArticleElement.querySelector('#title')! as HTMLHeadingElement;
        const paragraph = firstArticleElement.querySelector('#paragraph') ! as HTMLParagraphElement;
        const image = firstArticleElement.querySelector('#first-image') ! as HTMLParagraphElement;
        heading.classList.add('hide');    
        paragraph.classList.add('hide');
        image.classList.add('hide')
    }
    const link = document.createElement('a');
    link.setAttribute('href', `/article.html?id=${data.id}`);
    link.innerHTML = `<img src="img/0.png" id="first-image" alt="first-image">
    <h1>${data.title}</h1>
    <p>${data.body.substring(0, 50)}</p>`
    firstArticleElement.appendChild(link);
}

//Get All Posts
async function allPosts(url: string = 'https://jsonplaceholder.typicode.com/posts/') {
    const response: Response = await fetch(url);
    const data: Post[] = await response.json();
    const firstTenElement: Post[] = data.slice(0, 6);
    const columArticlesElements = allArticlesElement.querySelector('.colum-articles')! as HTMLOListElement;
        if(columArticlesElements) {
            const div = columArticlesElements.querySelector('#article')! as HTMLDivElement;
            div.classList.add('hide');
        }
        firstTenElement.forEach((post, index) => {
            const link = document.createElement('a');
            link.setAttribute('href', `/article.html?id=${post.id}`)
            const listItem = document.createElement('li');
            const listItemContent = document.createElement('div')
            listItemContent.classList.add('new-list');
            listItemContent.innerHTML = `<img src="img/${index}.png" id="" alt="first-image">
                <p>${post.title}</p>`
            link.appendChild(listItemContent);
            listItem.appendChild(link);
            columArticlesElements.appendChild(listItem);
        });
}

//Get Individual post
async function getPost(id: string, url: string = 'https://jsonplaceholder.typicode.com/posts/') {
    const [responsePost] = await Promise.all([
        fetch(`${url}/${id}/`),
    ])
    const dataPost = await responsePost.json()
    if (article) {
        const heading = article.querySelector('#title')! as HTMLHeadingElement;
        const paragraph = article.querySelector('#paragraph') ! as HTMLParagraphElement;
        const image = article.querySelector('#image') ! as HTMLParagraphElement;
        heading.classList.add('hide');
        paragraph.classList.add('hide');
        image.classList.add('hide');
    }
    article.classList.remove('hide')
    article.innerHTML = `<h1>${dataPost.title}</h1>
        <p>${dataPost.body}</p>
        <img src="img/${+id - 1}.png">`
}

//Get Posts to next
async function readNext(url: string = 'https://jsonplaceholder.typicode.com/posts/') {
    const response = await fetch(url);
    const data: Post[] = await response.json();
    const firstTenElement = data.slice(0, 6);
    const rowArticlesElements = readNextElement.querySelector('.row-articles')! as HTMLOListElement;
        if(rowArticlesElements) {
            const list = readNextElement.querySelector('li')! as HTMLLIElement;
            const div = rowArticlesElements.querySelector('#article')! as HTMLDivElement;
            const paragraph = div.querySelector('#paragraph')! as HTMLParagraphElement;
            list.classList.add('hide')
            paragraph.classList.add('hide');
            div.classList.add('hide');
        }
        firstTenElement.forEach((post, index) => {
            const link = document.createElement('a');
            link.setAttribute('href', `/article.html?id=${post.id}`)
            const listItem = document.createElement('li');
            const listItemContent = document.createElement('div')
            listItemContent.classList.add('new-list');
            listItemContent.innerHTML = `<img src="img/${index}.png" id="" alt="first-image">
                <p>${post.title}</p>`
            link.appendChild(listItemContent);
            listItem.appendChild(link);
            rowArticlesElements.appendChild(listItem);
        });
}

if (!postId){
    firstPost();
    allPosts();
} else {
    readNext();
    getPost(postId)
}