/* =========================================================
   TML SHOP
========================================================= */


/* =========================================================
   PRODUCT DATABASE
========================================================= */

const products = [
    {
        id: "sage-mint",
        name: "Sage & Mint",
        collection: "Signature Collection",
        notes: "Sage · Fresh Mint · Green Botanicals",
        price: 450,
        badge: "SIGNATURE",

        images: [
            "images/products/sage-mint-1.jpg",
            "images/products/sage-mint-2.jpg",
            "images/products/sage-mint-3.jpg"
        ]
    },

    {
        id: "cranberry",
        name: "Cranberry",
        collection: "Signature Collection",
        notes: "Cranberry · Red Fruits · Soft Sweetness",
        price: 450,
        badge: "SIGNATURE",

        images: [
            "images/products/cranberry-1.jpg",
            "images/products/cranberry-2.jpg",
            "images/products/cranberry-3.jpg"
        ]
    },

    {
        id: "blackberry",
        name: "Blackberry",
        collection: "Signature Collection",
        notes: "Blackberry · Dark Berries · Soft Woods",
        price: 450,
        badge: "SIGNATURE",

        images: [
            "images/products/blackberry-1.jpg",
            "images/products/blackberry-2.jpg",
            "images/products/blackberry-3.jpg"
        ]
    },

    {
        id: "rose-gold-blush",
        name: "Rose Gold Blush",
        collection: "Luxury Collection",
        notes: "Rose · Soft Florals · Warm Amber",
        price: 495,
        badge: "NEW",

        images: [
            "images/products/rose-gold-blush-1.jpg",
            "images/products/rose-gold-blush-2.jpg",
            "images/products/rose-gold-blush-3.jpg"
        ]
    },

    {
        id: "noir-oud-eclat",
        name: "Noir Oud Éclat",
        collection: "Éclat Collection",
        notes: "Oud · Dark Woods · Amber · Musk",
        price: 550,
        badge: "LUXURY",

        images: [
            "images/products/noir-oud-eclat-1.jpg",
            "images/products/noir-oud-eclat-2.jpg",
            "images/products/noir-oud-eclat-3.jpg"
        ]
    }
];


/* =========================================================
   ELEMENTS
========================================================= */

const shopGrid =
    document.getElementById("shopGrid");

const productSearch =
    document.getElementById("productSearch");

const sortProducts =
    document.getElementById("sortProducts");

const productCount =
    document.getElementById("productCount");

const noProducts =
    document.getElementById("noProducts");

const quickView =
    document.getElementById("quickView");

const quickViewContent =
    document.getElementById("quickViewContent");

const quickClose =
    document.getElementById("quickClose");


let activeFilter = "all";


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts(list) {

    shopGrid.innerHTML = "";

    productCount.textContent =
        `${list.length} product${list.length === 1 ? "" : "s"}`;


    if (!list.length) {

        noProducts.style.display = "block";

        return;

    }

    noProducts.style.display = "none";


    list.forEach(product => {

        const card =
            document.createElement("article");

        card.className = "shop-product";


        card.innerHTML = `

            <div class="shop-product-image">

                <a href="product.html?id=${product.id}">

                    <img
                        src="${product.images[0]}"
                        alt="${product.name}"
                        loading="lazy"
                    >

                </a>


                <span class="shop-badge">

                    ${product.badge}

                </span>


                <button
                    class="wishlist-button"
                    aria-label="Add ${product.name} to wishlist">

                    <i class="fa-regular fa-heart"></i>

                </button>


                <div class="product-image-actions">

                    <button
                        class="quick-view-button"
                        data-id="${product.id}">

                        QUICK VIEW

                    </button>

                    <button
                        class="add-bag-button"
                        data-id="${product.id}">

                        ADD TO BAG

                    </button>

                </div>

            </div>


            <div class="shop-product-info">

                <p class="shop-product-collection">

                    ${product.collection}

                </p>


                <h3>

                    ${product.name}

                </h3>


                <p class="shop-notes">

                    ${product.notes}

                </p>


                <div class="shop-product-bottom">

                    <span class="shop-price">

                        R${product.price}

                    </span>


                    <span class="stock-status">

                        IN STOCK

                    </span>

                </div>


                <a
                    href="product.html?id=${product.id}"
                    class="product-view-link">

                    VIEW PRODUCT

                    <i class="fa-solid fa-arrow-right"></i>

                </a>

            </div>

        `;


        shopGrid.appendChild(card);

    });


    attachProductButtons();

}


/* =========================================================
   FILTER PRODUCTS
========================================================= */

function filterProducts() {

    const search =
        productSearch.value
        .toLowerCase()
        .trim();


    let results =
        products.filter(product => {

            const matchesSearch =
                product.name
                .toLowerCase()
                .includes(search)

                ||

                product.notes
                .toLowerCase()
                .includes(search);


            const matchesFilter =
                activeFilter === "all"

                ||

                product.categories
                .includes(activeFilter);


            return matchesSearch && matchesFilter;

        });


    /* SORT */

    const sort =
        sortProducts.value;


    if (sort === "price-low") {

        results.sort(
            (a, b) => a.price - b.price
        );

    }


    if (sort === "price-high") {

        results.sort(
            (a, b) => b.price - a.price
        );

    }


    if (sort === "name") {

        results.sort(
            (a, b) =>
                a.name.localeCompare(b.name)
        );

    }


    renderProducts(results);

}


/* =========================================================
   FILTER BUTTONS
========================================================= */

document
    .querySelectorAll(".filter-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                document
                    .querySelectorAll(".filter-button")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );


                this.classList.add("active");


                activeFilter =
                    this.dataset.filter;


                filterProducts();

            }
        );

    });


/* =========================================================
   SEARCH
========================================================= */

productSearch.addEventListener(
    "input",
    filterProducts
);


/* =========================================================
   SORT
========================================================= */

sortProducts.addEventListener(
    "change",
    filterProducts
);


/* =========================================================
   QUICK VIEW
========================================================= */

function openQuickView(id) {

    const product =
        products.find(
            item => item.id === id
        );


    if (!product) return;


    quickViewContent.innerHTML = `

        <div class="quick-content">

            <img
                src="${product.images[0]}"
                alt="${product.name}"
            >


            <div class="quick-info">

                <p class="eyebrow">

                    ${product.collection}

                </p>


                <h2>

                    ${product.name}

                </h2>


                <p>

                    ${product.description}

                </p>


                <p class="shop-notes">

                    ${product.notes}

                </p>


                <div class="quick-price">

                    R${product.price}

                </div>


                <button
                    class="quick-add-button"
                    data-id="${product.id}">

                    ADD TO BAG

                </button>

            </div>

        </div>

    `;


    quickView.classList.add("active");


    document.body.style.overflow = "hidden";


    document
        .querySelector(".quick-add-button")
        .addEventListener(
            "click",
            function () {

                addToBag(this.dataset.id);

            }
        );

}


quickClose.addEventListener(
    "click",
    closeQuickView
);


quickView.addEventListener(
    "click",
    function (e) {

        if (e.target === quickView) {

            closeQuickView();

        }

    }
);


function closeQuickView() {

    quickView.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================================================
   PRODUCT BUTTONS
========================================================= */

function attachProductButtons() {

    document
        .querySelectorAll(".quick-view-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    openQuickView(
                        this.dataset.id
                    );

                }
            );

        });


    document
        .querySelectorAll(".add-bag-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    addToBag(
                        this.dataset.id
                    );

                }
            );

        });

}


/* =========================================================
   CART
========================================================= */

function addToBag(id) {

    const product =
        products.find(
            item => item.id === id
        );


    if (!product) return;


    let cart =
        JSON.parse(
            localStorage.getItem("tmlCart")
        ) || [];


    const existing =
        cart.find(
            item => item.id === id
        );


    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.images[0],

            quantity: 1

        });

    }


    localStorage.setItem(
        "tmlCart",
        JSON.stringify(cart)
    );


    updateCartCount();


    closeQuickView();


    alert(
        `${product.name} has been added to your bag.`
    );

}


/* =========================================================
   CART COUNT
========================================================= */

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem("tmlCart")
        ) || [];


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    const count =
        document.getElementById("cartCount");


    if (count) {

        count.textContent = total;

    }

}


/* =========================================================
   YEAR
========================================================= */

const currentYear =
    document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   START
========================================================= */

renderProducts(products);

updateCartCount();