// // scroll infinity
let options = {
    root: null,
    rootMargin: '300px',
    threshold: 0,
  }

  let callback = (entries, observer)=> {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            page +=1;
    getSearch(page).then(res => {
        renderCard(res.results);
        if(res.info.pages === page){
            // loadMoreBtn.hidden = true;
            observer.unobserve(target);
            return;
        }

    })
        }
    })
  }

  let observer = new IntersectionObserver(callback, options);
  let target = document.querySelector('.js-guard');
// -------------------------------------------------

const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");
let page = 1;

loadMoreBtn.addEventListener('click', onLoadMoreClick)

async function getSearch(){
    const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    if(!response.ok){
        throw new Error (response.statusText)
    }
    return response.json()
}

getSearch().then((res) => {
     console.log(res)
   
    renderCard(res.results)
    console.log()

    loadMoreBtn.hidden = false;

})

function renderCard(arrObj){
    const card = arrObj.map(({name, image}) => {
        return ` <div>
        <h2>${name}</h2>
        <img src="${image}" alt="${name}">
    </div>`
    }).join("") 

    gallery.insertAdjacentHTML("beforeend", card);
    observer.observe(target);
}
function onLoadMoreClick(){
    page +=1;
    getSearch(page).then(res => {
        if(res.info.pages === page){
            loadMoreBtn.hidden = true;
        }

        renderCard(res.results);

    })
    
}

// // scroll infinity
// var callback = function(entries, observer) {
//     console.log(entries);

//     entries.forEach(entry => {
//     //     entry.time;               // a DOMHightResTimeStamp indicating when the intersection occurred.
//     //     entry.rootBounds;         // a DOMRectReadOnly for the intersection observer's root.
//     //     entry.boundingClientRect; // a DOMRectReadOnly for the intersection observer's target.
//     //     entry.intersectionRect;   // a DOMRectReadOnly for the visible portion of the intersection observer's target.
//     //     entry.intersectionRatio;  // the number for the ratio of the intersectionRect to the boundingClientRect.
//     //     entry.target;             // the Element whose intersection with the intersection root changed.
//     //     entry.isIntersecting;     // intersecting: true or false
//     });
// };