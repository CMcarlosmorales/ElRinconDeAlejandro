let chevronSR = document.getElementById('chevronCastSR');
let chevronSL = document.getElementById('chevronCastSL');
let chevronProSR = document.getElementById('chevronProductSR');
let chevronProSL = document.getElementById('chevronProductSL');
let chevronProductSR = document.getElementById('chevronProductionSR');
let chevronProductSL = document.getElementById('chevronProductionSL');

let cardsCastS = document.getElementById('idcards_serie');
let cardsProS = document.getElementById('idcards_production_serie');
let cardsProductionS = document.getElementById('idcards_productionEmp_serie');

chevronSL.addEventListener('click', () => {
    cardsCastS.scrollLeft -= 140;
})

chevronSR.addEventListener('click', () => {
    cardsCastS.scrollLeft += 140;
})

chevronProSL.addEventListener('click', () => {
    cardsProS.scrollLeft -= 140;
})

chevronProSR.addEventListener('click', () => {
    cardsProS.scrollLeft += 140;
})

chevronProductSL.addEventListener('click', () => {
    cardsProductionS.scrollLeft -= 140;
})

chevronProductSR.addEventListener('click', () => {
    cardsProductionS.scrollLeft += 140;
})