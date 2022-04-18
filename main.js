'use strict';
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

function scrollIntoView(selector){
    const scrollContact=document.querySelector(selector);
    scrollContact.scrollIntoView({behavior:"smooth"});
}