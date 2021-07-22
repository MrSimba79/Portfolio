const navbar = document.querySelector('.navbar');
const menuBtn = document.querySelector('.menu-btn');
const liBtn = document.getElementsByClassName('li-btn');
const menu = document.querySelector('.menu');
const off = document.querySelector('.off');
const closeIco = document.querySelector('.ico-close');
const menuIco = document.querySelector('.ico-list');
const scrollBtn = document.querySelector('.scroll-up-btn');
const html = document.querySelector('html');
const carousel = document.querySelector('.carousel');
// const owlCarousel = document.querySelector('.owl-carousel');

window.addEventListener('scroll', function () {
  if (this.scrollY > 20) {
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');
  }
  if (this.scrollY > 500) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});

scrollBtn.addEventListener('click', function () {
  window.scrollTo({ top: 0 });
});

menuBtn.addEventListener('click', function () {
  menu.classList.toggle('active');
  menuIco.classList.toggle('off');
  closeIco.classList.toggle('off');
});

for (var i = 0; i < liBtn.length; i++) {
  liBtn[i].addEventListener('click', function () {
    menu.classList.toggle('active');
    menuIco.classList.toggle('off');
    closeIco.classList.toggle('off');
  });
}
