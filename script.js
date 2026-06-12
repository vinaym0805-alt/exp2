const books = [
  {
    name: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    category: "Finance",
    price: 299,
    rating: 4.7,
    free: false,
    image: "[images.unsplash.com](https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=80)",
    description: "A classic personal finance book focused on building assets, mindset, and wealth literacy."
  },
  {
    name: "Atomic Habits",
    author: "James Clear",
    category: "Self Help",
    price: 399,
    rating: 4.9,
    free: false,
    image: "[images.unsplash.com](https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80)",
    description: "A practical guide to building good habits, breaking bad ones, and mastering tiny improvements."
  },
  {
    name: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Business",
    price: 349,
    rating: 4.8,
    free: false,
    image: "[images.unsplash.com](https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=500&q=80)",
    description: "A compelling exploration of how emotions, behavior, and thinking shape financial decisions."
  },
  {
    name: "Clean Code",
    author: "Robert C. Martin",
    category: "Programming",
    price: 599,
    rating: 4.9,
    free: false,
    image: "[images.unsplash.com](https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=500&q=80)",
    description: "An essential handbook for writing readable, maintainable, and professional software code."
  },
  {
    name: "JavaScript Essentials",
    author: "David Miller",
    category: "Programming",
    price: 0,
    rating: 4.6,
    free: true,
    image: "[images.unsplash.com](https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=500&q=80)",
    description: "A beginner-friendly introduction to JavaScript fundamentals, logic, and interactive web development."
  },
  {
    name: "HTML & CSS Mastery",
    author: "Sophia Turner",
    category: "Web Development",
    price: 0,
    rating: 4.5,
    free: true,
    image: "[images.unsplash.com](https://images.unsplash.com/photo-1513530176992-0cf39c4cbed4?auto=format&fit=crop&w=500&q=80)",
    description: "Learn to build attractive, responsive websites with modern HTML and CSS techniques."
  },
  {
    name: "Python Programming",
    author: "Mark L. Pearson",
    category: "Programming",
    price: 499,
    rating: 4.7,
    free: false,
    image: "[images.unsplash.com](https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=500&q=80)",
    description: "A structured path into Python, covering syntax, problem solving, and practical coding skills."
  },
  {
    name: "Data Structures and Algorithms",
    author: "Nina Joseph",
    category: "Programming",
    price: 699,
    rating: 4.8,
    free: false,
    image: "[images.unsplash.com](https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80)",
    description: "Strengthen your coding interviews and software foundations with core DSA concepts."
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const themeToggle = document.getElementById("themeToggle");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const scrollTopBtn = document.getElementById("scrollTop");

  setTimeout(() => {
    if (loader) loader.classList.add("hidden");
  }, 1000);

  const savedTheme = localStorage.getItem("smartBookTheme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggle) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("smartBookTheme", isDark ? "dark" : "light");
      themeToggle.innerHTML = isDark
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    });
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  window.addEventListener("scroll", () => {
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle("show", window.scrollY > 300);
    }
    revealOnScroll();
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  revealOnScroll();
  animateCounters();
  renderBooks();
  setupFilters();
  setupModals();
});

function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  const windowHeight = window.innerHeight;

  reveals.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < windowHeight - 80) {
      element.classList.add("active");
    }
  });
}

function animateCounters() {
  const counters = document.querySelectorAll(".counter");

  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const increment = Math.ceil(target / 100);

    const updateCounter = () => {
      count += increment;
      if (count < target) {
        counter.innerText = `${count}+`;
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = `${target}+`;
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(counter);
        }
      });
    });

    observer.observe(counter);
  });
}

function renderBooks(filteredBooks = books) {
  const booksContainer = document.getElementById("booksContainer");
  if (!booksContainer) return;

  booksContainer.innerHTML = filteredBooks
    .map((book) => {
      const priceText = book.free ? "Free" : `₹${book.price}`;
      const readButton = book.free
        ? `<button class="btn btn-secondary read-btn" data-name="${book.name}">Read Free</button>`
        : "";

      return `
        <div class="book-card reveal active">
          <img src="${book.image}" alt="${book.name}">
          <div class="book-info">
            <span class="book-category">${book.category}</span>
            <h3>${book.name}</h3>
            <p class="author">${book.author}</p>
            <p class="book-description">${book.description}</p>
            <div class="book-meta">
              <span>${priceText}</span>
              <span><i class="fas fa-star"></i> ${book.rating}</span>
            </div>
            <div class="book-buttons">
              <button 
                class="btn btn-primary purchase-btn"
                data-name="${book.name}"
                data-price="${priceText}"
              >
                Purchase Book
              </button>
              ${readButton}
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  setupModals();
}

function setupFilters() {
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const priceFilter = document.getElementById("priceFilter");
  const sortFilter = document.getElementById("sortFilter");

  if (!searchInput || !categoryFilter || !priceFilter || !sortFilter) return;

  const applyFilters = () => {
    let filtered = [...books];
    const searchValue = searchInput.value.toLowerCase().trim();
    const categoryValue = categoryFilter.value;
    const priceValue = priceFilter.value;
    const sortValue = sortFilter.value;

    filtered = filtered.filter((book) =>
      book.name.toLowerCase().includes(searchValue)
    );

    if (categoryValue !== "all") {
      filtered = filtered.filter((book) => book.category === categoryValue);
    }

    if (priceValue === "free") {
      filtered = filtered.filter((book) => book.free);
    } else if (priceValue === "under400") {
      filtered = filtered.filter((book) => book.price > 0 && book.price < 400);
    } else if (priceValue === "400to600") {
      filtered = filtered.filter((book) => book.price >= 400 && book.price <= 600);
    } else if (priceValue === "above600") {
      filtered = filtered.filter((book) => book.price > 600);
    }

    if (sortValue === "lowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortValue === "highToLow") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortValue === "popularity") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    renderBooks(filtered);
  };

  searchInput.addEventListener("input", applyFilters);
  categoryFilter.addEventListener("change", applyFilters);
  priceFilter.addEventListener("change", applyFilters);
  sortFilter.addEventListener("change", applyFilters);
}

function setupModals() {
  const purchaseModal = document.getElementById("purchaseModal");
  const readModal = document.getElementById("readModal");
  const purchaseBtns = document.querySelectorAll(".purchase-btn");
  const readBtns = document.querySelectorAll(".read-btn");
  const closePurchaseModal = document.getElementById("closePurchaseModal");
  const closeReadModal = document.getElementById("closeReadModal");
  const purchaseBookName = document.getElementById("purchaseBookName");
  const purchaseBookPrice = document.getElementById("purchaseBookPrice");
  const readBookTitle = document.getElementById("readBookTitle");

  purchaseBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (purchaseBookName) purchaseBookName.textContent = btn.dataset.name;
      if (purchaseBookPrice) purchaseBookPrice.textContent = btn.dataset.price;
      if (purchaseModal) purchaseModal.classList.add("active");
    });
  });

  readBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (readBookTitle) readBookTitle.textContent = `${btn.dataset.name} - Read Online`;
      if (readModal) readModal.classList.add("active");
    });
  });

  if (closePurchaseModal) {
    closePurchaseModal.addEventListener("click", () => {
      purchaseModal.classList.remove("active");
    });
  }

  if (closeReadModal) {
    closeReadModal.addEventListener("click", () => {
      readModal.classList.remove("active");
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === purchaseModal) {
      purchaseModal.classList.remove("active");
    }
    if (e.target === readModal) {
      readModal.classList.remove("active");
    }
  });
}
