const clients = document.querySelector('.clients .clients__items');
const reviews = document.querySelector('.reviews .reviews__items');
const regions = document.querySelector('.regions .regions__items');

// const popupReviews = document.querySelector('.reviews');

class RenderTemplate {
    render(item) {
        return "";
    }
}

class ClientsRenderTemplate extends RenderTemplate {
    render(item) {
        return `
            <div class="clients__item">
                <picture>
                    <source srcset="assets/img/clients/${item.img}.webp" type="image/webp">
                    <img src="assets/img/clients/${item.img}.jpg" class="clients__img" alt="">
                </picture>
               
                <p class="clients__text">${item.text}</p>
            </div>
        `;
    }
}

class ReviewsRenderTemplate extends RenderTemplate {
    render(item) {
        return `
            <div class="reviews__item">
                <a href="assets/img/reviews/${item.img}">
                    <picture>
                        <source srcset="assets/img/reviews/${item.webP}" type="image/webp">
                        <img src="assets/img/reviews/${item.img}" class="reviews__img watermark" alt="">
                    </picture>
                </a>
            </div>
        `;
    }
}

class RegionsRenderTemplate extends RenderTemplate {
    render(item) {
        return `
            <div class="regions__item">
                <picture>
                    <source srcset="assets/img/regions/${item.img}.webp" type="image/webp">
                    <img src="assets/img/regions/${item.img}.png" class="clients__img" alt="">
                </picture>
                <p class="regions__text">${item.text}</p>
            </div>
        `;
    }
}

// class PopupReviewsRenderTemplate extends RenderTemplate {
//     render(item) {
//         return `
//             <div class="popup" id="reviews${item.id}">
//                 <div class="popup__body">
//                     <div class="popup__content popup__content-image">
//                         <a href="" class="popup__close close-popup">
//                             <svg class="popup__svg">
//                                 <use xlink:href="/assets/sprite/SVG.svg#popup__close"></use>
//                             </svg>
//                         </a>
//                         <div class="popup__main">
//                             <picture>
//                                 <source srcset="assets/img/reviews/${item.webP}" type="image/webp">
//                                 <img src="assets/img/reviews/${item.img}" class="reviews__img" alt="">
//                             </picture>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         `;
//     }
// }

function For(Mss, classObj, renderTemplate) {
    for (let key in Mss) {
        let item = Mss[key];
        classObj.insertAdjacentHTML(
            "beforeend",
            renderTemplate.render(item),
        );
    }
}

function filterProperty(jsonModel, propertyName, defaultValue = "") {
    if (jsonModel !== undefined && jsonModel.hasOwnProperty(propertyName)) {
        let propValue = Object.getOwnPropertyDescriptor(jsonModel, propertyName).value;
        return propValue !== "" && propValue !== -1 && propValue != undefined ? propValue : defaultValue;
    }
    return defaultValue;
}

async function initByUrls(url, property, classObj, renderTemplate) {
    let response = await fetch(url);

    let mss = await response.json();

    let result = filterProperty(mss, property, null);
    if (result != null && renderTemplate instanceof RenderTemplate) {
        For(result, classObj, renderTemplate);
    }
}

async function Carousels() {

    await initByUrls('assets/json/clients.json', "mssClients", clients, new ClientsRenderTemplate());
    await initByUrls('assets/json/reviews.json', "mssReviews", reviews, new ReviewsRenderTemplate());
    await initByUrls('assets/json/regions.json', "mssRegions", regions, new RegionsRenderTemplate());

    // await initByUrls('assets/json/reviews.json', "mssReviews", popupReviews, new PopupReviewsRenderTemplate());

    function displayWindowSize() {
        $(".clients__items").not('.slick-initialized').slick({
            mobileFirst: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            speed: 2000,
            prevArrow: `<div class="prev">
                            <svg class="arrow">
                                <use xlink:href="assets/sprite/SVG.svg#arrowSlider"></use>
                            </svg>
                        </div>`,
            nextArrow: `<div class="next">
                            <svg class="arrow">
                                <use xlink:href="assets/sprite/SVG.svg#arrowSlider"></use>
                            </svg>
                        </div>`,
            responsive: [
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 766,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 1023,
                    settings: "unslick"
                }
            ]
        });
        $(".reviews__items, .regions__items").not('.slick-initialized').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            speed: 2000,
            prevArrow: `<div class="prev">
                            <svg class="arrow">
                                <use xlink:href="assets/sprite/SVG.svg#arrowSlider"></use>
                            </svg>
                        </div>`,
            nextArrow: `<div class="next">
                            <svg class="arrow">
                                <use xlink:href="assets/sprite/SVG.svg#arrowSlider"></use>
                            </svg>
                        </div>`,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ]
        });
    }

    window.addEventListener("resize", displayWindowSize);

    displayWindowSize();
}

Carousels();

// scroll_up
const ofs = 100; // offset если уже проскролено на 100, то кнопка должна проявиться
const scrollUp = document.querySelector('.scroll-up');
const scrollUpSvgPath = document.querySelector('.scroll-up__svg-path');
const pathLength = scrollUpSvgPath.getTotalLength();

scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
scrollUpSvgPath.style.transition = 'stroke-dashOffset 20ms';

const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

// function #1: updateDashoffset
const updateDashoffset = () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const dashoffset = pathLength - (getTop() * pathLength / height);

    scrollUpSvgPath.style.strokeDashoffset = dashoffset;
};

// function #2: onScroll
window.addEventListener('scroll', () => {
    updateDashoffset();

    if (getTop() > ofs) {
        scrollUp.classList.add('scroll-up-active');
    } else {
        scrollUp.classList.remove('scroll-up-active');
    }

    if (window.pageYOffset >= document.documentElement.scrollHeight - window.innerHeight - 1) {
        scrollUp.classList.add('end');
    } else {
        scrollUp.classList.remove('end');
    }
});

// menu
let menuBtn = document.querySelector(".btn__menu");
let menuOpen = document.querySelector(".header__menu");
let bodyWrap = document.querySelector("body");

menuBtn.addEventListener("click", function () {
    menuBtn.classList.toggle("click");
    menuOpen.classList.toggle("open");
    bodyWrap.classList.toggle("lock");
})

// dropdown
let btn = document.querySelector(".header__dropdown-btn");
let drop = document.querySelector(".header__dropdown-hide");

btn.addEventListener("click", function () {
    drop.classList.toggle("open");
})

document.addEventListener('click', function (e) {
    if (!$(e.target).closest(".header__dropdown").length) {
        drop.classList.remove("open");
    }
    e.stopPropagation();
});

// Скролл к якорям сайта
const links = document.querySelectorAll(".scrollTo");

if (links.length > 0) {
    for (let index = 0; index < links.length; index++) {
        const link = links[index];
        link.addEventListener('click', function (e) {
            const linkName = link.getAttribute('href').replace('#', '');
            const scrollTo = document.getElementById(linkName);
            scrolling(scrollTo);
            e.preventDefault();
            menuBtn.classList.remove("click");
            menuOpen.classList.remove("open");
            bodyWrap.classList.remove("lock");
        })
    }
}

function scrolling(scrollTo) {
    if (window.innerWidth >= 992) {
        $('html, body').animate({
            scrollTop: $(scrollTo).offset().top
        }, 1500);
    } else {
        $('html, body').animate({
            scrollTop: $(scrollTo).offset().top - 90
        }, 1500);
    }
}