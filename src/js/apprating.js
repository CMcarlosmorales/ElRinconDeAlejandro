const allStar = document.querySelectorAll(".rating_sect .star");
const ratingValue = document.querySelector(".rating_sect input");

allStar.forEach((item, idx) => {
    item.addEventListener('click', function () {
        let click = 0;
        ratingValue.value = idx + 1
        console.log(ratingValue.value);

        allStar.forEach(i => {
            i.classList.replace('bi-star-fill','bi-star');
            i.classList.remove('active');
        })
        for(let i=0; i<allStar.length; i++){
            if(i <= idx){
                allStar[i].classList.replace('bi-star', 'bi-star-fill');
                allStar[i].classList.add('active');
            }else{
                allStar[i].style.setProperty('--i', click);
                click++;
            }
        }
    })
});

let data = [
    {
        'star': 5,
        'count': 169783,
    },
    {
        'star': 4,
        'count': 49783,
    },
    {
        'star': 3,
        'count': 39783,
    },
    {
        'star': 2,
        'count': 29783,
    },
    {
        'star': 1,
        'count': 19783,
    }
]

let total_rating = 0;
let rating_based_on_star = 0;

data.forEach(rating => {
    total_rating = total_rating + rating.count;
    rating_based_on_star = rating_based_on_star + (rating.star * rating.count);
});

data.forEach(rating => {
    let rtg_progress = `
                    <div class="rating_progress_value">
                        <p>${rating.star}<span class="star"><i class="bi bi-star-fill star-table"></i></span></p>
                        <div class="progress">
                            <div class="bar" style="width: ${(rating.count / total_rating) * 100}%">

                            </div>
                        </div>
                        <p>${rating.count.toLocaleString()}</p>
                    </div>`;
    document.querySelector('.rating_progress').innerHTML += rtg_progress;
});

let rating_average_final = (rating_based_on_star / total_rating).toFixed(1);
document.querySelector('.rating_average p').innerHTML = total_rating.toLocaleString();
document.querySelector('.rating_average h1').innerHTML = rating_average_final;
document.querySelector('.star-inner').style.width = `${(rating_average_final / 5) * 100}%`;