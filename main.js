'use strict';

function scrollIntoView(selector){
    const scrollContact=document.querySelector(selector);
    scrollContact.scrollIntoView({behavior:"smooth"});
};





// Make navbar transparent when it is on the top
const navbar=document.querySelector('#navbar');
const navbarHeight=navbar.getBoundingClientRect().height;
document.addEventListener('scroll',()=>{
    if(window.scrollY>navbarHeight){
        navbar.classList.add('navbar--dark');
    }else{
        navbar.classList.remove('navbar--dark');
    }
});

// Handle scrolling when tapping on the navbar
const navbarMenu=document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click',(event)=>{
    const target=event.target;
    const link=target.dataset.link;
    if(link==null){
        return;
    }
    scrollIntoView(link);
});


//Handle Contact me Scrolling
const HomeContact=document.querySelector('.home__contact');
HomeContact.addEventListener('click',(event)=>{
    scrollIntoView('#contact');
});




//scroll and transparent Home
const Home=document.querySelector('.home__container');
const HomeHeight=Home.getBoundingClientRect().height;
document.addEventListener('scroll',()=>{
    Home.style.opacity=1-window.scrollY/HomeHeight;

});

const arrowUp=document.querySelector('.arrow-up');
document.addEventListener('scroll',()=>{
    if(window.scrollY > HomeHeight/2){
        arrowUp.classList.add('visible');
    }else{
        arrowUp.classList.remove('visible');
    }
});
//Handle click on the "arrow up" button
arrowUp.addEventListener('click',()=>{
    scrollIntoView('#home');
})