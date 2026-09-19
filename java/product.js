/* =========================================================
   TML PRODUCT PAGE
========================================================= */


/* =========================================================
   PRODUCT DATA
========================================================= */

const products = [

    {
        id: "sage-mint",
        name: "Sage & Mint",
        collection: "Signature Collection",
        price: 450,
        notes: "Sage · Fresh Mint · Green Botanicals",

        description:
            "A fresh and sophisticated fragrance created to bring a clean and refined atmosphere into the home.",

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
        price: 450,
        notes: "Cranberry · Red Fruits · Soft Sweetness",

        description:
            "A vibrant berry fragrance with a beautifully balanced character.",

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
        price: 495,
        notes: "Blackberry · Dark Berries · Soft Woods",

        description:
            "A rich and expressive berry fragrance designed to create an inviting ambience.",

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
        price: 520,
        notes: "Rose · Soft Florals · Warm Amber",

        description:
            "An elegant floral fragrance inspired by soft rose tones, warm light and beautifully styled interiors.",

        images: [
            "assets/products/rose-gold-blush-1.jpg",
            "assets/products/rose-gold-blush-2.jpg",
            "assets/products/rose-gold-blush-3.jpg"
        ]
    },


    {
        id: "noir-oud-eclat",
        name: "Noir Oud Éclat",
        collection: "Éclat Collection",
        price: 550,
        notes: "Oud · Dark Woods · Amber · Musk",

        description:
            "A deep and luxurious fragrance created for sophisticated interiors.",

        images: [
            "images/products/noir-oud-eclat-1.jpg",
            "images/products/noir-oud-eclat-2.jpg",
            "images/products/noir-oud-eclat-3.jpg"
        ]
    }

];


/* =========================================================
   GET PRODUCT
========================================================= */

const params =
    new URLSearchParams(
        window.location.search
    );

const productID =
    params.get("id");


const product =
    products.find(
        item => item.id === productID
    );


/* =========================================================
   ELEMENTS
========================================================= */

const mainImage =
    document.getElementById(
        "mainProductImage"
    );

const thumbnails =
    document.getElementById(
        "productThumbnails"
    );

const productName =
    document.getElementById(
        "productName"
    );

const productCollection =
    document.getElementById(
        "productCollection"
    );

const productNotes =
    document.getElementById(
        "productNotes"
    );

const productPrice =
    document.getElementById(
        "productPrice"
    );

const productDescription =
    document.getElementById(
        "productDescription"
    );

const fragranceNotes =
    document.getElementById(
        "fragranceNotes"
    );

const collectionName =
    document.getElementById(
        "collectionName"
    );

const quantityDisplay =
    document.getElementById(
        "productQuantity"
    );

const addButton =
    document.getElementById(
        "productAddButton"
    );


let quantity = 1;


/* =========================================================
   LOAD PRODUCT
========================================================= */

if (!product) {

    document.body.innerHTML = `

        <main style="
            min-height:100vh;
            display:flex;
            align-items:center;
            justify-content:center;
            font-family:DM Sans, sans-serif;
        ">

            <div style="text-align:center">

                <h1>
                    Product not found.
                </h1>

                <a href="shop.html">
                    Return to shop
                </a>

            </div>

        </main>

    `;

} else {


    document.title =
        `${product.name} | TML`;


    productName.textContent =
        product.name;


    productCollection.textContent =
        product.collection;


    productNotes.textContent =
        product.notes;


    productPrice.textContent =
        `R${product.price}`;


    productDescription.textContent =
        product.description;


    fragranceNotes.textContent =
        product.notes;


    collectionName.textContent =
        product.collection;


    /* MAIN IMAGE */

    mainImage.src =
        product.images[0];

    mainImage.alt =
        product.name;


    /* THUMBNAILS */

    product.images.forEach(
        (image, index) => {

            const thumbnail =
                document.createElement("button");

            thumbnail.className =
                "product-thumbnail";


            if (index === 0) {

                thumbnail.classList.add(
                    "active"
                );

            }


            thumbnail.innerHTML = `

                <img
                    src="${image}"
                    alt="${product.name}"
                >

            `;


            thumbnail.addEventListener(
                "click",
                () => {

                    mainImage.src =
                        image;


                    document
                        .querySelectorAll(
                            ".product-thumbnail"
                        )
                        .forEach(item =>
                            item.classList.remove(
                                "active"
                            )
                        );


                    thumbnail.classList.add(
                        "active"
                    );

                }
            );


            thumbnails.appendChild(
                thumbnail
            );

        }
    );

}


/* =========================================================
   QUANTITY
========================================================= */

document
    .getElementById("minusQuantity")
    .addEventListener(
        "click",
        () => {

            if (quantity > 1) {

                quantity--;

            }

            quantityDisplay.textContent =
                quantity;

        }
    );


document
    .getElementById("plusQuantity")
    .addEventListener(
        "click",
        () => {

            quantity++;

            quantityDisplay.textContent =
                quantity;

        }
    );


/* =========================================================
   ADD TO BAG
========================================================= */

if (addButton) {

    addButton.addEventListener(
        "click",
        () => {

            if (!product) return;


            let cart =
                JSON.parse(
                    localStorage.getItem(
                        "tmlCart"
                    )
                ) || [];


            const existing =
                cart.find(
                    item =>
                        item.id === product.id
                );


            if (existing) {

                existing.quantity +=
                    quantity;

            } else {

                cart.push({

                    id: product.id,

                    name: product.name,

                    price: product.price,

                    image: product.images[0],

                    quantity: quantity

                });

            }


            localStorage.setItem(
                "tmlCart",
                JSON.stringify(cart)
            );


            updateCartCount();


            addButton.innerHTML = `

                ADDED TO BAG

                <i class="fa-solid fa-check"></i>

            `;


            setTimeout(() => {

                addButton.innerHTML = `

                    ADD TO BAG

                    <i class="fa-solid fa-arrow-right"></i>

                `;

            }, 1800);

        }
    );

}


/* =========================================================
   CART COUNT
========================================================= */

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem(
                "tmlCart"
            )
        ) || [];


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    const count =
        document.getElementById(
            "cartCount"
        );


    if (count) {

        count.textContent =
            total;

    }

}


updateCartCount();


/* =========================================================
   YEAR
========================================================= */

const currentYear =
    document.getElementById(
        "currentYear"
    );

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}