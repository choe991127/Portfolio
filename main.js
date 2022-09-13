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
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
    selectedNavItem(target);
});

//Navbar toggle button for small screen
const navbarToggleBtn=document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click',()=>{
    navbarMenu.classList.toggle('open');
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

//Category filterling
const workBtnContainer=document.querySelector('.work__categories');
const projectContainer=document.querySelector('.work__projects');
const projects=document.querySelectorAll('.project');
workBtnContainer.addEventListener('click',(e)=>{
    const filter=e.target.dataset.filter || e.target.parentNode.dataset.filter;
    
    if(filter==null){
        return;
    };
    
    //remove selection from the prvious item and select new one
    const active= document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target=e.target.nodeName==='BUTTON' ? e.target:e.target.parentNode;
    target.classList.add('selected');


    projectContainer.classList.add('anim-out');
    setTimeout(()=>{
        projects.forEach((project)=>{
        
            if(filter==='*'||filter===project.dataset.type){
                project.classList.remove('invisible');
            }else{
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    },300);
    
    
    
});

// IntersectionObserver
const sectionIds=[
    '#home',
    '#about',
    '#skills',
    '#work',
    '#testimonials',
    '#contact'
];

const sections= sectionIds.map(id=>document.querySelector(id));
const navItems=sectionIds.map(id=>document.querySelector(`[data-link="${id}"]`));
let selectedNavIndex=0;
let selectedNavitem=navItems[0];
function selectedNavItem(selected){
    selectedNavitem.classList.remove('active');
    selectedNavitem=selected; 
    selectedNavitem.classList.add('active');
}
function scrollIntoView(selector){
    const scrollContact=document.querySelector(selector);
    scrollContact.scrollIntoView({behavior:"smooth"});
    selectedNavItem(navItems[sectionIds.indexOf(selector)]);
};
const observerOptions={
    root:null,
    rootMargin:'0px',
    threshold:0.3,
}
const observerCallback=(entries,observer)=>{
    entries.forEach(entry=>{
        if(!entry.isIntersecting&&entry.intersectionRatio>0){ 
            const index=sectionIds.indexOf(`#${entry.target.id}`);
            //스크롤링이 아래로 되어서 페이지 올라올때
            if(entry.boundingClientRect.y<0){
                selectedNavIndex=index+1;
            }else{
                selectedNavIndex=index-1;
            }
        }

    } );
}
const observer=new IntersectionObserver(observerCallback,observerOptions);
sections.forEach(section=>observer.observe(section));

window.addEventListener('wheel',()=>{
    if(window.scrollY===0){
        selectedNavIndex=0;
    }
    else if(Math.round(window.scrollY + window.innerHeight) >=
            document.body.clientHeight){
        selectedNavIndex=navItems.length-1;
    }
    selectedNavItem(navItems[selectedNavIndex]);
});