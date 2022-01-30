const seats = document.querySelectorAll('.row .seat:not(.occupied)')
let count = document.getElementById('count');
let movieSelect = document.getElementById('movie');
let total = document.getElementById('total');

function fetchData() {

  let storage =  JSON.parse(localStorage.getItem('savedSeats'));
   if(storage) {
       storage.seatIndex.forEach(index => {
           seats[index].classList.add('selected')
        })
        movieSelect.selectedIndex = storage.movie;
        updateSelectedSeatsCount();
    }
}
fetchData();



seats.forEach(seat => seat.addEventListener('click',e => {
    seat.classList.toggle('selected');
    updateSelectedSeatsCount();
}))

movieSelect.addEventListener('change',e => {
    updateSelectedSeatsCount();
})

function updateSelectedSeatsCount() {
    let seatSelected = document.querySelectorAll('.row .selected');
    count.textContent = seatSelected.length;
    total.textContent = movieSelect.value * seatSelected.length; 
    seatIndex = [...seatSelected].map(seat => [...seats].indexOf(seat))
    amount = movieSelect.value * seatSelected.length; 
    let movie = movieSelect.selectedIndex;
    saveSelectedSeats(seatIndex,amount,movie)
}

function saveSelectedSeats(seatIndex,amount,movie)  {
    let storage = {seatIndex,amount,movie};
    localStorage.setItem('savedSeats',JSON.stringify(storage));
}
 