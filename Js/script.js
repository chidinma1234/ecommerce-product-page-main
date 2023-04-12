'use strict';
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const close = document.querySelector('#btnMenuClose');

hamburger.addEventListener('click', () => menu.classList.remove('hidden'));
close.addEventListener('click', () => menu.classList.add('hidden'));
