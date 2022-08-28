const baseURL = "http://731d-14-96-13-220.ngrok.io/users/"

async function onCitySubmit(){
  var city = document.querySelector(".hospital-container");
  var hospital_list_el = document.querySelector(".hospitals--list");
  var bed__container_el = document.querySelector(".bed--container");

  console.log(hospital_list_el, bed__container_el);
  hospital_list_el.classList.remove("hidden");
  bed__container_el.classList.remove("hidden");
  city.classList.add("hidden");
  console.log("clicked");

  

  const city_input = city.value;

  const req_options = {
    "state" : city_input
  }
  let resp = "";
  fetch(baseURL + "getrooms", {
    method: "POST",
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify(req_options)
  }).then(res => {
    console.log("Request complete! response:", res.data);
    resp = res.data;
    // alert("Updated successfully");
  }).catch(err => {console.log(err.message)});
  console.log(resp);
}