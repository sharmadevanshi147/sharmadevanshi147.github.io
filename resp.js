burger=document.querySelector('.burger')
navbar=document.querySelector('.navbar')
navList=document.querySelector('.nav-list')

burger.addEventListener('click',()=>{
    navList.classList.toggle('v-class');
    navList.classList.toggle('h-nav');
    navbar.classList.toggle('h-nav');
    

    
    
})