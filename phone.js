const loadPhone = async (searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones =( phones, dataLimit) => {
  // console.log(phones)
    const phonesContainer = document.getElementById('phones-container')
    phonesContainer.textContent = '';
    // slice number of phone 10 only  
    const showAll = document.getElementById('Show-all')
    if(dataLimit && phones.length > 10){
    phones = phones.slice (0 , 10);
    showAll.classList.remove('d-none');
  }
  else{
    showAll.classList.add('d-none');
  }
 // display no phn found
  const noPhone = document.getElementById('no-found-message');
  if(phones.length === 0){
    noPhone.classList.remove('d-none');
  }
  else{
    noPhone.classList.add('d-none');
  }

    // display all phn
   
  phones.forEach(phone =>{
    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML = `
    <div class="card p-4">
      <img  src="${phone.image}" class="card-img-top " alt="...">
      <div class="card-body">
        <h5 class="card-title"> ${phone.phone_name}</h5>
        <h2 class="card-text"> ${phone.brand}</h2>
        <p class="card-text">${phone.slug}</p>
        <button onclick = "loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetaileModal">Show details</button>
      </div>
    </div>
    `;
    phonesContainer.appendChild(phoneDiv)
  });
  // stop spinner loader
  toggleSpinner(false);
   
}

const processSearch = (dataLimit) =>{
  
  toggleSpinner (true);

  const searchField = document.getElementById('search-field');
  const searchText = searchField.value ;
  loadPhone(searchText ,dataLimit)
}

// handle search vutton click
document.getElementById('btn-search').addEventListener('click', function(){
  // start loader
  processSearch(10);

})

// search input key by enter
document.getElementById('search-field').addEventListener('keypress', function (e) {
  console.log(e.key);
  if (e.key === 'Enter') {
    processSearch(10);
  }

});

const toggleSpinner = isLoading =>{
  const loaderSection = document.getElementById('loader')
  if(isLoading){
    loaderSection.classList.remove('d-none')
  }
  else{
    loaderSection.classList.add('d-none')
  }
}
// not the best way to show all
document.getElementById('btn-show-all').addEventListener('click', function(){

 processSearch();
});

const loadPhoneDetails = async id =>{
  const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  phoneDetailsShow(data.data)
}

const phoneDetailsShow = phone =>{
  console.log(phone);
 const modalTitle = document.getElementById('phoneDetaileModalLabel');
 modalTitle.innerText = phone.name ;
 const phoneDetailse = document.getElementById('PhnDetails');
 phoneDetailse.innerHTML = `
 <p> Relise date : ${phone.releaseDate ? phone.releaseDate 
: 'No relise date found'}</p>
<p>Others : ${phone.others ? phone.others : 'no bluetooth'}</p>
<h6>Mainfeatures : ${phone.mainFeatures
.storage ? phone.mainFeatures.storage : 'no storage found'}</h6>
<img  src="${phone.image}" class="card-img-top" height ="350px" width = "100px" alt="...">
 `
}
loadPhone('Apple');

