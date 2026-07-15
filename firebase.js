//========================================
// ETHIEL CARE
// FIREBASE.JS
//========================================

// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

// Firestore
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

//========================================
// FIREBASE CONFIG
//========================================

const firebaseConfig = {

    apiKey: "AIzaSyC5Twdn5MZ5EKHT3ddVwkCepC6DSalXGbA",

    authDomain: "ethiel-care-22bb0.firebaseapp.com",

    projectId: "ethiel-care-22bb0",

    storageBucket: "ethiel-care-22bb0.firebasestorage.app",

    messagingSenderId: "232822881679",

    appId: "1:232822881679:web:2205fc3d19e24832f71ffa"

};

//========================================
// INITIALIZE FIREBASE
//========================================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

//========================================
// SAVE REVIEWS
//========================================

const reviewForm = document.getElementById("reviewForm");

if (reviewForm) {

    reviewForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const review = {

            name: document.getElementById("name").value.trim(),

            rating: Number(document.getElementById("rating").value),

            message: document.getElementById("message").value.trim(),

            created: serverTimestamp()

        };

        try {

            await addDoc(

                collection(db, "reviews"),

                review

            );

            alert("⭐ Thank you for your review!");

            reviewForm.reset();

        }

        catch (error) {

            console.error(error);

            alert("Unable to submit review.");

        }

    });

}
//========================================
// LOAD REVIEWS
//========================================

const reviewsContainer = document.getElementById("reviewsContainer");

if (reviewsContainer) {

    const reviewsQuery = query(
        collection(db, "reviews"),
        orderBy("created", "desc")
    );

    onSnapshot(reviewsQuery, (snapshot) => {

        reviewsContainer.innerHTML = "";

        if (snapshot.empty) {

            reviewsContainer.innerHTML = `
                <div class="review-card">
                    <h3>No Reviews Yet</h3>
                    <p>Be the first family to leave a review for Ethiel Care.</p>
                </div>
            `;

            return;
        }

        snapshot.forEach((doc) => {

            const review = doc.data();

            const stars = "⭐".repeat(Number(review.rating));

            reviewsContainer.innerHTML += `

                <div class="review-card">

                    <div class="review-top">

                        <h3>${review.name}</h3>

                        <span>${stars}</span>

                    </div>

                    <p>${review.message}</p>

                </div>

            `;

        });

    });

}
//========================================
// QUOTE REQUESTS
//========================================

const quoteForm = document.getElementById("quoteForm");

if (quoteForm) {

    quoteForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const quoteData = {

            name: document.getElementById("fullName").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            address: document.getElementById("address").value.trim(),
            service: document.getElementById("service").value,
            date: document.getElementById("date").value,
            time: document.getElementById("time").value,
            children: document.getElementById("children").value.trim(),
            notes: document.getElementById("notes").value.trim()

        };

        //====================================
        // VALIDATION
        //====================================

        if (!quoteData.name) {

            alert("Please enter your full name.");

            return;

        }

        if (!quoteData.email) {

            alert("Please enter your email address.");

            return;

        }

        if (!quoteData.phone) {

            alert("Please enter your phone number.");

            return;

        }

        if (!quoteData.service) {

            alert("Please select a service.");

            return;

        }

        try {

           / / Save to Firebase
    await addDoc(
        collection(db, "quotes"),
        {
            ...quoteData,
            created: serverTimestamp()
        }
    );

            //====================================
            // CREATE WHATSAPP MESSAGE
            //====================================

            const message = `🌙 *NEW QUOTE REQUEST - ETHIEL CARE*

👤 Name: ${quoteData.name}

📧 Email: ${quoteData.email}

📞 Phone: ${quoteData.phone}

📍 Address: ${quoteData.address}

🍼 Service: ${quoteData.service}

📅 Preferred Date: ${quoteData.date}

🕒 Preferred Time: ${quoteData.time}

👶 Child's Age(s): ${quoteData.children}

📝 Additional Notes:
${quoteData.notes}`;

            //====================================
            // OPEN WHATSAPP
            //====================================

            const whatsapp =
                "https://wa.me/27615831503?text=" +
                encodeURIComponent(message);

            window.location.href = whatsapp;

            alert("Thank you! WhatsApp is opening with your quote request.");

            quoteForm.reset();

        } catch (error) {

            console.error(error);

            alert(
                "Unable to send your quote request.\n\n" +
                error.message
            );

        }

    });

}
//========================================
// SUCCESS POPUP
//========================================

function showSuccessPopup() {

    // Remove existing popup
    const existing = document.querySelector(".success-popup");

    if (existing) {
        existing.remove();
    }

    // Create popup
    const popup = document.createElement("div");

    popup.className = "success-popup";

    popup.innerHTML = `

        <div class="success-card">

            <div class="success-icon">
                ✅
            </div>

            <h2>Quote Request Ready!</h2>

            <p>

                Thank you for choosing
                <strong>Ethiel Care.</strong>

                WhatsApp has opened with your
                quote request already completed.

                Simply press
                <strong>Send</strong>
                to deliver it directly to
                Ethiel.

            </p>

            <button id="closeSuccess">

                Close

            </button>

        </div>

    `;

    document.body.appendChild(popup);

    document
        .getElementById("closeSuccess")
        .addEventListener("click", () => {

            popup.remove();

        });

    // Auto close after 8 seconds

    setTimeout(() => {

        if (popup) {

            popup.remove();

        }

    }, 8000);

}

//========================================
// END OF FIREBASE.JS
//========================================