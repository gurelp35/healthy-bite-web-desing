<!-- =======================================================
  File: services.html
  Project: Healthy Bite
  Author: Pakize Gurel
  Description: Services page focused on image presentation and styling.
======================================================= -->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Services | Healthy Bite</title>
  <link rel="stylesheet" href="styles.css" />
</head>

<body>
  <!-- ==================== HEADER ==================== -->
  <header class="site-header">
    <a class="logo" href="index.html">Healthy<span>Bite</span></a>

    <nav class="nav" id="navMenu">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="services.html" class="active">Services</a></li>
        <li><a href="howitworks.html">How It Works</a></li>
        <li><a href="blog.html">Blog</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>

    <button class="menu-toggle" aria-label="Open menu" type="button" onclick="toggleMenu()">☰</button>
  </header>

  <!-- ==================== SERVICES HERO ==================== -->
  <section class="services-hero">
    <img
      src="assets/images/odiseo-castrejon-4Q_xlB0aCso-unsplash.jpg"
      alt="Healthy meal variety"
      class="services-hero-img"
    />
    <!-- Image source: Unsplash (Odiseo Castrejon) -->

    <div class="hero-overlay">
      <h1>Quick & Healthy Meal Ideas</h1>
      <p>Nutritious recipes and snack suggestions for every lifestyle.</p>
    </div>
  </section>

  <!-- ==================== SERVICES CONTENT ==================== -->
  <main class="services-content">
    <section class="services-intro">
      <h2>Our Nutrition Solutions</h2>
      <p>
        At Healthy Bite, we make healthy eating simple and enjoyable. From meal prep to smoothie inspiration,
        our tailored services are designed to help busy students and professionals stay nourished.
      </p>
    </section>

    <!-- ===== SERVICE CARDS ===== -->
    <section class="features">
      <div class="feature-card">
        <img src="assets/images/anto-menegihini-IrohWzafmnA-unsplash.jpg" alt="Meal prep planning" />
        <!-- Image source: Unsplash -->
        <h3>Meal Prep Plans</h3>
        <p>Get weekly meal prep plans with easy, healthy recipes to save time and eat better.</p>
      </div>

      <div class="feature-card">
        <img src="assets/images/yoav-aziz-AiIHjRCwB3w-unsplash.jpg" alt="Healthy recipe ideas" />
        <!-- Image source: Unsplash -->
        <h3>Healthy Recipe Ideas</h3>
        <p>Explore fresh, fast, and delicious recipes that fit your busy lifestyle.</p>
      </div>

      <div class="feature-card">
        <img src="assets/images/alina-karpenko-jH1PBHevj38-unsplash.jpg" alt="Nutrition coaching" />
        <!-- Image source: Unsplash -->
        <h3>Nutrition Coaching</h3>
        <p>Learn realistic nutrition habits with expert guidance to help you reach your goals.</p>
      </div>

      <div class="feature-card">
        <img src="assets/images/brenda-godinez-CrK843Pl9a4-unsplash.jpg" alt="Healthy smoothies" />
        <!-- Image source: Unsplash -->
        <h3>Smoothie & Snack Ideas</h3>
        <p>Try our creative smoothie and snack recipes to boost your daily energy.</p>
      </div>
    </section>
  </main>

  <!-- ==================== FOOTER ==================== -->
  <footer class="site-footer">
    <div class="footer-content">
      <p>© 2025 Healthy Bite | Designed for university web design project</p>
      <p>
        Contact: <a href="mailto:pakizegurel@hotmail.com">pakizegurel@hotmail.com</a> |
        Kingston upon Thames, UK
      </p>
    </div>
  </footer>

  <!-- ==================== INLINE JS (no extra files) ==================== -->
  <script>
    function toggleMenu() {
      const navList = document.querySelector(".nav ul");
      navList.classList.toggle("show");
    }
  </script>
</body>
</html>