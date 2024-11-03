document.getElementById('searchInput').addEventListener('input', debounce(function(event) {
    console.log('Searching for:', event.target.value);
}, 300));
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
// open modal
function openModal() {
    console.log("Opening Signup Modal");
    document.getElementById("signupModal").style.display = "block";
}

//close modal
function closeModal() {
    console.log("Closing signup Modal");
    document.getElementById("signupModal").style.display = "none";
}

//close modal when clicking outside the modal content
window.onclick = function(event) {
    const modal = document.getElementById("signupModal");
    if (event.target === modal) {
        closeOrderModal();
    }
};

// Signup function
document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Get form values
    const username = document.querySelector("#signupForm input[placeholder='Username']").value;
    const email = document.querySelector("#signupForm input[placeholder='Email']").value;
    const password = document.querySelector("#signupForm input[placeholder='Password']").value;

    // Basic validation
    if (!username || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    // Store signup data in localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    alert("Signup successful!");

    // Clear the form and close the modal
    document.getElementById("signupForm").reset();
    closeModal();
});
// Login function
function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    // Retrieve stored signup info
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    // Validate login credentials
    if (username === storedUsername && password === storedPassword) {
        alert("Login successful!");
    } else {
        alert("Invalid username or password.");
    }
}
// Function to open the order modal
function openOrderModal() {
    console.log("Opening Order Modal");
    document.getElementById("orderModal").style.display = "block";
}

// Function to close the order modal
function closeOrderModal() {
    console.log("Closing Order Modal");
    document.getElementById("orderModal").style.display = "none";
}

window.onload = function() {
    const urlparams = new URLSearchParams(window.location.search);
    if (urlparams.get('showModal') === 'true') {
        openModal();
    }
}

// Close modal when clicking outside the modal content
window.onclick = function(event) {
    const modal = document.getElementById("orderModal");
    if (event.target === modal) {
        closeOrderModal();
    }
};

// Handle form submission
document.getElementById("orderForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission normally

    // Retrieve form values
    const customerName = document.getElementById("customerName").value;
    const customerPhone = document.getElementById("customerPhone").value;
    const product = document.getElementById("product").value;
    const address = document.getElementById("address").value;

    // Basic validation
    if (!customerName || !customerPhone || !product || !address) {
        alert("Please fill in all fields.");
        return;
    }

    // Create order object
    const order = {
        customerName,
        customerPhone,
        product,
        address
    };

    // Store the order in localStorage for demo purposes
    localStorage.setItem("order", JSON.stringify(order));

    // Alert and reset the form
    alert("Order placed successfully!");
    document.getElementById("orderForm").reset();
    closeOrderModal();
});

const cart = [];
    
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const product = this.parentElement;
            const name = product.getAttribute('data-name');
            const price = parseFloat(product.getAttribute('data-price'));
            
            // Check if the product is already in the cart
            const existingProduct = cart.find(item => item.name === name);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            updateCart();
        });
    });

    document.getElementById('signupForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        alert(result.message);
        if (result.token) localStorage.setItem('authToken', result.token);
    });

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        window.location.href = '/login';
    }


    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        alert(result.message);
        if (result.token) localStorage.setItem('authToken', result.token);
    });

   