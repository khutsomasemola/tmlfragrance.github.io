/* =========================================================
   TML MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       PAGE LOADER
    ====================================================== */

    const loader = document.getElementById("pageLoader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("loaded");

        }, 600);

    });



    /* =====================================================
       HEADER SCROLL
    ====================================================== */

    const header = document.getElementById("siteHeader");

    function updateHeader() {

        if (window.scrollY > 60) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();



    /* =====================================================
       MOBILE MENU
    ====================================================== */

    const menuButton =
        document.getElementById("mobileMenuButton");

    const mobileNavigation =
        document.getElementById("mobileNavigation");


    if (menuButton && mobileNavigation) {

        menuButton.addEventListener("click", () => {

            const isOpen =
                mobileNavigation.classList.toggle("active");

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

            menuButton.setAttribute(
                "aria-expanded",
                isOpen
            );

        });


        const mobileLinks =
            mobileNavigation.querySelectorAll("a");

        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileNavigation.classList.remove("active");

                document.body.classList.remove("menu-open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }



    /* =====================================================
       SEARCH OVERLAY
    ====================================================== */

    const searchButton =
        document.getElementById("searchButton");

    const searchOverlay =
        document.getElementById("searchOverlay");

    const searchClose =
        document.getElementById("searchClose");


    if (searchButton && searchOverlay) {

        searchButton.addEventListener("click", () => {

            searchOverlay.classList.add("active");

            document.body.classList.add("menu-open");

        });

    }


    if (searchClose) {

        searchClose.addEventListener("click", () => {

            searchOverlay.classList.remove("active");

            document.body.classList.remove("menu-open");

        });

    }


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            searchOverlay?.classList.remove("active");

            document.body.classList.remove("menu-open");

        }

    });



    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });



    /* =====================================================
       CURRENT YEAR
    ====================================================== */

    const year =
        document.getElementById("currentYear");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }



    /* =====================================================
       NEWSLETTER
    ====================================================== */

    const newsletterForm =
        document.getElementById("newsletterForm");


    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const email =
                    newsletterForm.querySelector(
                        "input"
                    ).value.trim();


                if (!email) return;


                const button =
                    newsletterForm.querySelector(
                        "button"
                    );


                const originalText =
                    button.innerHTML;


                button.innerHTML =
                    "THANK YOU";


                newsletterForm.reset();


                setTimeout(() => {

                    button.innerHTML =
                        originalText;

                }, 3000);

            }
        );

    }



      /* =====================================================
       CART COUNT
    ====================================================== */

    updateCartCount();
    updateBottomCartCount();
});



/* =========================================================
   CART COUNT
========================================================= */

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) return;


    let cart = [];

    try {

        cart =
            JSON.parse(
                localStorage.getItem("tmlCart")
            ) || [];

    } catch {

        cart = [];

    }


    const quantity =
        cart.reduce(
            (total, item) =>
                total + Number(item.quantity || 0),
            0
        );


    cartCount.textContent =
        quantity;

}