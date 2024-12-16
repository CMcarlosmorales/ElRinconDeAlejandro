let chevronR = document.getElementById('chevronCastR');
let chevronL = document.getElementById('chevronCastL');
let chevronProR = document.getElementById('chevronProductR');
let chevronProL = document.getElementById('chevronProductL');
let chevronProductR = document.getElementById('chevronProductionR');
let chevronProductL = document.getElementById('chevronProductionL');

let cardsCast = document.getElementById('idcards_pelicula');
let cardsPro = document.getElementById('idcards_production');
let cardsProduction = document.getElementById('idcards_productionEmp');

chevronL.addEventListener('click', () => {
    cardsCast.scrollLeft -= 140;
})

chevronR.addEventListener('click', () => {
    cardsCast.scrollLeft += 140;
})

chevronProL.addEventListener('click', () => {
    cardsPro.scrollLeft -= 140;
})

chevronProR.addEventListener('click', () => {
    cardsPro.scrollLeft += 140;
})

chevronProductL.addEventListener('click', () => {
    cardsProduction.scrollLeft -= 140;
})

chevronProductR.addEventListener('click', () => {
    cardsProduction.scrollLeft += 140;
})