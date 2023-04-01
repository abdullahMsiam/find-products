const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayProducts(data.data, dataLimit);
}

const displayProducts = (products, dataLimit) => {
    // console.log(products.data);

    // product limitation show 
    const showAllBtn = document.getElementById('show-all-btn');
    if (dataLimit && products.length > 10) {
        products = products.slice(0, 10);
        showAllBtn.classList.remove('d-none');
    }
    else {
        showAllBtn.classList.add('d-none');
    }
    // Nothing message show ......
    const nothingMessage = document.getElementById('nothing-message');
    if (products.length === 0) {
        nothingMessage.classList.remove('d-none');
    }
    else {
        nothingMessage.classList.add('d-none');
    }

    // append the product form here ......
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
    products.forEach(product => {
        // console.log(product);
        const productDiv = document.createElement('div');
        productDiv.classList.add('col');
        productDiv.innerHTML = `
        <div class="card">
                        <img src="${product.image}" class="card-img-top"  alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${product.phone_name}</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-into additional content. This content is a little bit longer.</p>
                            <button id="explore-btn" onclick="loadId('${product.slug}')" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Explore
                             </button>
                        </div>
                    </div>
        `
        productsContainer.appendChild(productDiv);
    });
    // stop spinner from here ...... 
    loadSpinner(false);
}

// SEARCH PRODUCT SHOW FROM HERE ...........
const searchItem = (dataLimit) => {
    loadSpinner(true);
    const searchPhone = document.getElementById('search-phone');
    const searchText = searchPhone.value;
    loadPhone(searchText, dataLimit);
}

document.getElementById('search-btn').addEventListener('click', function () {
    // spine start 
    searchItem(10);
})

// show all products from here ....
document.getElementById('show-all-btn').addEventListener('click', function () {
    searchItem();
    document.getElementById('search-phone').value = '';
})

const loadSpinner = isSpine => {
    const spineId = document.getElementById('spinner-id');
    if (isSpine === true) {
        spineId.classList.remove('d-none');
    }
    else {
        spineId.classList.add('d-none');
    }
}

const loadId = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    productDetails(data.data);
}
const productDetails = product => {
    console.log(product);

    const productModalLabel = document.getElementById('productModalLabel');
    productModalLabel.innerText = product.name;
    const productModalBody = document.getElementById('product-modal-body');
    productModalBody.innerHTML = `
    <p>Features!!! <br>Storage:${product.mainFeatures ? product.mainFeatures.memory : 'No Data found!'} 
    <br>Display: ${product.mainFeatures ? product.mainFeatures.displaySize : 'No data found!'}
    <br>Release Date: ${product.releaseDate ? product.releaseDate : 'NO DATA FOUND!'}</p>
    `


}


loadPhone('apple'); 