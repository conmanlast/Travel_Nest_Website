
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 1. AUTO-ROTATING QUOTES
const quotes = [
    "\"Adventure is worthwhile in itself.\"",
    "\"To travel is to live.\"",
    "\"Explore the unexplored.\"",
    "\"Travel far enough to find yourself.\""
];

let quoteIndex = 0;
const quoteElement = document.getElementById('rotating-quote');

function rotateQuotes() {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    quoteElement.style.opacity = 0; 
    
    setTimeout(() => {
        quoteElement.innerText = quotes[quoteIndex];
        quoteElement.style.opacity = 1; 
    }, 500);
}


setInterval(rotateQuotes, 4000);


// 2. DESTINATION OF THE DAY
function setDestinationOfTheDay() {
    const dailyCard = document.getElementById('daily-card');
    
    
    const dayOfMonth = new Date().getDate(); 
    const destinationIndex = dayOfMonth % destinations.length; 
    const todayDest = destinations[destinationIndex];

    dailyCard.innerHTML = `
        <h3>${todayDest.name}, ${todayDest.region}</h3>
        <p>${todayDest.description}</p>
        <small>Check it out in the Explorer page!</small>
    `;
}

// Initialize functions when page loads
window.onload = () => {
    setDestinationOfTheDay();
};

const newsletterForm = document.getElementById('newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('newsletter-email').value;
        
        // Save email to localStorage
        localStorage.setItem('newsletterEmail', email);
        
        showNotification(`Thank you for subscribing, ${email}!`);
        newsletterForm.reset();
    });
}

// --- DESTINATION EXPLORER LOGIC ---
const grid = document.getElementById('destinations-grid');
const searchInput = document.getElementById('search-input');
const continentFilter = document.getElementById('continent-filter');
const modal = document.getElementById('destination-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');

// 1. Function to render cards
function renderDestinations(data) {
    if (!grid) return; // Stop if we aren't on the explorer page
    
    grid.innerHTML = ""; // Clear current cards

    data.forEach(dest => {
        const card = document.createElement('div');
        card.classList.add('dest-card');
        card.innerHTML = `
            <img src="${dest.image}" alt="${dest.name}">
            <div class="dest-card-info">
                <h3>${dest.name}</h3>
                <p>${dest.region}, ${dest.continent}</p>
            </div>
        `;
        card.onclick = () => openModal(dest);
        grid.appendChild(card);
    });
}

// 2. Filtering Logic
function filterDestinations() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedContinent = continentFilter.value;

    const filtered = destinations.filter(dest => {
        const matchesSearch = dest.name.toLowerCase().includes(searchTerm);
        const matchesContinent = selectedContinent === 'all' || dest.continent === selectedContinent;
        return matchesSearch && matchesContinent;
    });

    renderDestinations(filtered);
}

// 3. Modal Logic
function openModal(dest) {
    modalBody.innerHTML = `
        <h2>${dest.name}</h2>
        <p><strong>${dest.region}, ${dest.continent}</strong></p>
        <p style="margin: 1rem 0;">${dest.description}</p>
        
        <h4>Popular Attractions:</h4>
        <ul>
            ${dest.attractions.map(attr => `<li> ${attr}</li>`).join('')}
        </ul>

        <h4>Cost Comparison:</h4>
        <div class="table-responsive">
            <table class="cost-table">
                <tr><th>Budget</th><th>Moderate</th><th>Luxury</th></tr>
                <tr>
                    <td>${dest.costs.budget}</td>
                    <td>${dest.costs.moderate}</td>
                    <td>${dest.costs.luxury}</td>
                </tr>
            </table>
        </div>
    `;
    modal.style.display = "flex";
}

// Event Listeners
if (searchInput) searchInput.addEventListener('input', filterDestinations);
if (continentFilter) continentFilter.addEventListener('change', filterDestinations);
if (closeModal) closeModal.onclick = () => modal.style.display = "none";

// Close modal if user clicks outside the box
window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
};

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    renderDestinations(destinations);
});


// --- BUDGET PLANNER LOGIC ---
const budgetForm = document.getElementById('budget-form');
const budgetResults = document.getElementById('budget-results');
const totalCostEl = document.getElementById('total-cost');
const budgetStatusEl = document.getElementById('budget-status');
const progressBar = document.getElementById('budget-progress');
const saveBudgetBtn = document.getElementById('save-budget-btn');
const savedBudgetsList = document.getElementById('saved-budgets-list');

if (budgetForm) {
    budgetForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Get inputs
        const dest = document.getElementById('dest-name').value;
        const days = parseInt(document.getElementById('num-days').value);
        const daily = parseInt(document.getElementById('daily-budget').value);

        // 2. Calculate Total
        const total = days * daily;
        totalCostEl.innerText = `$${total}`;

        // 3. Determine Budget Status & Progress Bar Width
        let status = "";
        let progressWidth = 0;

        if (total < 1000) {
            status = "Low Budget 🟢";
            progressWidth = "33%";
        } else if (total >= 1000 && total < 3000) {
            status = "Moderate Budget 🟡";
            progressWidth = "66%";
        } else {
            status = "Luxury Budget 🔴";
            progressWidth = "100%";
        }

        budgetStatusEl.innerText = status;
        progressBar.style.width = progressWidth;
        budgetResults.style.display = "block";

        // Store current calculation temporarily for saving
        budgetForm.dataset.lastTotal = total;
        budgetForm.dataset.lastDest = dest;
    });
}

// --- LOCALSTORAGE LOGIC ---

// Save budget to localStorage
if (saveBudgetBtn) {
    saveBudgetBtn.addEventListener('click', () => {
        const budgetData = {
            destination: budgetForm.dataset.lastDest,
            total: budgetForm.dataset.lastTotal,
            date: new Date().toLocaleDateString()
        };

        // Get existing budgets or create empty array
        const saved = JSON.parse(localStorage.getItem('myBudgets')) || [];
        saved.push(budgetData);
        localStorage.setItem('myBudgets', JSON.stringify(saved));

        showNotification("Budget saved to your profile!");
        displaySavedBudgets();
    });
}

// Function to show saved budgets on page load
function displaySavedBudgets() {
    if (!savedBudgetsList) return;

    const saved = JSON.parse(localStorage.getItem('myBudgets')) || [];
    
    if (saved.length === 0) {
        savedBudgetsList.innerHTML = '<p class="empty-msg">No saved budgets yet.</p>';
        return;
    }

    savedBudgetsList.innerHTML = saved.map(item => `
        <div class="budget-item">
            <strong>${item.destination}</strong><br>
            Total: $${item.total} <br>
            <small>Saved on: ${item.date}</small>
        </div>
    `).join('');
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    displaySavedBudgets();
});

// --- RANDOM TRIP GENERATOR LOGIC ---
const surpriseBtn = document.getElementById('surprise-btn');
const generatorResult = document.getElementById('generator-result');
const resultImg = document.getElementById('result-img');
const resultName = document.getElementById('result-name');
const resultDesc = document.getElementById('result-desc');
const saveWishlistBtn = document.getElementById('save-wishlist-btn');
const wishlistGrid = document.getElementById('wishlist-grid');

if (surpriseBtn) {
    surpriseBtn.addEventListener('click', () => {
        const type = document.getElementById('travel-type').value;
        const budget = document.getElementById('budget-range').value;

        // 1. Filter destinations based on user choice
        const filtered = destinations.filter(dest => {
            // Check if category matches
            const typeMatch = dest.category === type;
            
            // Budget Logic: We'll map 'low' to budget, 'medium' to moderate, 'high' to luxury
            // Since we don't have a simple 'budget' field, we just check if it exists in costs
            return typeMatch; 
        });

        // Fallback: If no exact match, just use all destinations so the user isn't stuck
        const finalPool = filtered.length > 0 ? filtered : destinations;

        // 2. Pick a random one
        const randomDest = finalPool[Math.floor(Math.random() * finalPool.length)];

        // 3. Display the result
        resultImg.src = randomDest.image;
        resultName.innerText = randomDest.name;
        resultDesc.innerText = randomDest.description;
        generatorResult.style.display = "block";

        // Store current result for saving to wishlist
        generatorResult.dataset.currentDest = JSON.stringify(randomDest);
    });
}

// --- WISHLIST LOCALSTORAGE LOGIC ---

if (saveWishlistBtn) {
    saveWishlistBtn.addEventListener('click', () => {
        const dest = JSON.parse(generatorResult.dataset.currentDest);
        
        const wishlist = JSON.parse(localStorage.getItem('travelWishlist')) || [];
        
        // Avoid duplicates
        if (!wishlist.some(item => item.id === dest.id)) {
            wishlist.push(dest);
            localStorage.setItem('travelWishlist', JSON.stringify(wishlist));
            showNotification(`${dest.name} added to your wishlist!`);
            displayWishlist();
        } else {
            showNotification("This destination is already in your wishlist!");
        }
    });
}

function displayWishlist() {
    if (!wishlistGrid) return;

    const wishlist = JSON.parse(localStorage.getItem('travelWishlist')) || [];

    if (wishlist.length === 0) {
        wishlistGrid.innerHTML = '<p class="empty-msg">Your wishlist is empty. Start exploring!</p>';
        return;
    }

    wishlistGrid.innerHTML = wishlist.map(item => `
        <div class="wishlist-item">
            <img src="${item.image}" alt="${item.name}">
            <strong>${item.name}</strong>
        </div>
    `).join('');
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    displayWishlist();
});

// --- TRAVEL MOOD LOGIC ---

// 1. Sound Management
const sounds = {
    beach: new Audio('assets/sounds/beach.mp3'),
    forest: new Audio('assets/sounds/forest.mp3'),
    city: new Audio('assets/sounds/city.mp3')
};

const soundButtons = document.querySelectorAll('.sound-btn');
const soundStatus = document.getElementById('sound-status');
let currentPlaying = null;

soundButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const soundType = btn.dataset.sound;

        // Stop current sound
        if (currentPlaying) {
            currentPlaying.pause();
            currentPlaying.currentTime = 0;
        }

        // Handle "Stop All"
        if (!soundType) {
            soundStatus.innerText = "Currently: Silence";
            document.querySelectorAll('.sound-btn').forEach(b => b.classList.remove('active'));
            return;
        }

        // Play new sound
        currentPlaying = sounds[soundType];
        currentPlaying.loop = true;
        currentPlaying.play();
        
        soundStatus.innerText = `Currently: Playing ${soundType} sounds...`;
        
        // Update active button styling
        document.querySelectorAll('.sound-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// 2. Trip Tracking Logic
const trackerList = document.getElementById('tracker-list');

function renderTracker() {
    if (!trackerList) return;

    // Load saved data from localStorage
    const userProgress = JSON.parse(localStorage.getItem('travelProgress')) || {};

    trackerList.innerHTML = destinations.map(dest => {
        const status = userProgress[dest.id] || "none"; // "visited", "planned", or "none"
        
        return `
            <div class="tracker-row">
                <span>${dest.name}</span>
                <div class="status-group">
                    <button class="status-btn ${status === 'planned' ? 'planned' : ''}" 
                            onclick="updateStatus(${dest.id}, 'planned')">Planned</button>
                    <button class="status-btn ${status === 'visited' ? 'visited' : ''}" 
                            onclick="updateStatus(${dest.id}, 'visited')">Visited</button>
                </div>
            </div>
        `;
    }).join('');
}

// We make this function global so the onclick in HTML can find it
window.updateStatus = (id, newStatus) => {
    const userProgress = JSON.parse(localStorage.getItem('travelProgress')) || {};
    
    // If user clicks the same status, remove it (toggle)
    if (userProgress[id] === newStatus) {
        delete userProgress[id];
    } else {
        userProgress[id] = newStatus;
    }

    localStorage.setItem('travelProgress', JSON.stringify(userProgress));
    renderTracker(); // Re-render to show updated colors
};

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    renderTracker();
});


// --- SUPPORT & FEEDBACK LOGIC ---

// 1. Accordion Logic
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        
        // Close other open items (Optional, but looks cleaner)
        document.querySelectorAll('.accordion-item').forEach(otherItem => {
            if (otherItem !== item) otherItem.classList.remove('active');
        });

        item.classList.toggle('active');
    });
});

// 2. Form Validation & LocalStorage
const feedbackForm = document.getElementById('feedback-form');
const successBanner = document.getElementById('form-success');

if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get values
        const name = document.getElementById('user-name').value.trim();
        const email = document.getElementById('user-email').value.trim();
        const message = document.getElementById('user-message').value.trim();

        // Validation Flags
        let isValid = true;

        // Name Validation
        if (name === "") {
            document.getElementById('name-error').style.display = "block";
            isValid = false;
        } else {
            document.getElementById('name-error').style.display = "none";
        }

        // Email Validation (Regex)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            document.getElementById('email-error').style.display = "block";
            isValid = false;
        } else {
            document.getElementById('email-error').style.display = "none";
        }

        // Message Validation
        if (message === "") {
            document.getElementById('message-error').style.display = "block";
            isValid = false;
        } else {
            document.getElementById('message-error').style.display = "none";
        }

        if (isValid) {
            // Store in localStorage
            const feedbackData = { name, email, message, date: new Date().toLocaleString() };
            const allFeedback = JSON.parse(localStorage.getItem('userFeedback')) || [];
            allFeedback.push(feedbackData);
            localStorage.setItem('userFeedback', JSON.stringify(allFeedback));

            // Show success and reset form
            successBanner.style.display = "block";
            feedbackForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => { successBanner.style.display = "none"; }, 5000);
        }
    });
}