const container = document.querySelector(".container");
const beds = document.querySelectorAll(".row .bed:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const roomSelect = document.getElementById("room");

populateUI();

let ticketPrice = +roomSelect.value;

function setRoomData(roomIndex, roomPrice) {
  localStorage.setItem("selectedRoomIndex", roomIndex);
  localStorage.setItem("selectedRoomPrice", roomPrice);
}

function updateSelectedCount() {
  const selectedBeds = document.querySelectorAll(".row .bed.selected");

  const bedsIndex = [...selectedBeds].map((bed) => [...beds].indexOf(bed));

  localStorage.setItem("selectedBeds", JSON.stringify(bedsIndex));

  const selectedBedsCount = selectedBeds.length;

  count.innerText = selectedBedsCount;
  total.innerText = selectedBedsCount * ticketPrice;

  setRoomData(roomSelect.selectedIndex, roomSelect.value);
}

function populateUI() {
  const selectedBeds = JSON.parse(localStorage.getItem("selectedBeds"));

  if (selectedBeds !== null && selectedBeds.length > 0) {
    beds.forEach((bed, index) => {
      if (selectedBeds.indexOf(index) > -1) {
        bed.classList.add("selected");
      }
    });
  }

  const selectedRoomIndex = localStorage.getItem("selectedRoomIndex");

  if (selectedRoomIndex !== null) {
    roomSelect.selectedIndex = selectedRoomIndex;
  }
}

roomSelect.addEventListener('change', (e) => {
  ticketPrice =+e.target.value;
  setRoomData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("bed") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

updateSelectedCount();
