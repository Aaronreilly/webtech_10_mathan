const http = require("http");

const PORT = 3000;

const html = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>EcoLife - Sustainable Living Blog</title>

    <style>

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            font-family: Arial, sans-serif;
            background: #f5f7f1;
            color: #26382b;
            line-height: 1.6;
        }

        /* Header */

        header {
            background: #183d2b;
            color: white;
            padding: 18px 8%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
        }

        header h1 {
            color: #b8e986;
            font-size: 27px;
        }

        nav a {
            color: white;
            text-decoration: none;
            margin-left: 22px;
            font-size: 15px;
        }

        nav a:hover {
            color: #b8e986;
        }

        /* Hero Section */

        .hero {
            min-height: 400px;
            background: linear-gradient(
                120deg,
                #183d2b,
                #527c50
            );

            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 60px 20px;
        }

        .hero h2 {
            font-size: 45px;
            max-width: 750px;
            line-height: 1.2;
            margin-bottom: 20px;
        }

        .hero p {
            font-size: 18px;
            margin-bottom: 25px;
        }

        .btn {
            background: #b8e986;
            color: #183d2b;
            padding: 12px 25px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
            display: inline-block;
            border: none;
            cursor: pointer;
        }

        .btn:hover {
            background: white;
        }

        /* General Sections */

        section {
            padding: 55px 8%;
            scroll-margin-top: 20px;
        }

        .section-title {
            text-align: center;
            font-size: 30px;
            margin-bottom: 10px;
            color: #183d2b;
        }

        .section-desc {
            text-align: center;
            margin-bottom: 30px;
            color: #687568;
        }

        /* Blog Cards */

        .blogs {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 25px;
            margin-top: 30px;
        }

        .card {
            background: white;
            width: 280px;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
            transition: 0.3s;
        }

        .card:hover {
            transform: translateY(-7px);
        }

        .card-image {
            height: 150px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 65px;
            background: #e2eedc;
        }

        .card-content {
            padding: 22px;
        }

        .card h3 {
            color: #24583b;
            margin-bottom: 10px;
        }

        .card p {
            font-size: 14px;
            color: #657365;
            margin-bottom: 15px;
        }

        .read-more {
            color: #367b48;
            text-decoration: none;
            font-weight: bold;
        }

        /* Search */

        .search-box {
            display: block;
            margin: 20px auto;
            width: 90%;
            max-width: 400px;
            padding: 13px;
            border: 1px solid #b5c5ae;
            border-radius: 6px;
            font-size: 15px;
        }

        /* Tips Section */

        .tips {
            background: #e7efdf;
        }

        .tips-container {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 25px;
            margin-top: 30px;
        }

        .tip {
            background: white;
            padding: 25px;
            border-radius: 10px;
            width: 230px;
            text-align: center;
        }

        .tip h3 {
            color: #24583b;
            margin-bottom: 10px;
        }

        .tip span {
            font-size: 35px;
        }

        /* About Section */

        .about {
            text-align: center;
            max-width: 900px;
            margin: auto;
        }

        /* Contact Section */

        .contact {
            background: #e7efdf;
            text-align: center;
        }

        form {
            max-width: 500px;
            margin: 25px auto;
        }

        input, textarea {
            width: 100%;
            padding: 13px;
            margin: 10px 0;
            border: 1px solid #b5c5ae;
            border-radius: 5px;
            font-size: 15px;
        }

        textarea {
            height: 120px;
            resize: vertical;
        }

        button {
            font-size: 15px;
        }

        #result {
            color: #24583b;
            font-weight: bold;
            margin-top: 15px;
        }

        /* Footer */

        footer {
            background: #183d2b;
            color: white;
            text-align: center;
            padding: 22px;
        }

        /* Responsive Design */

        @media(max-width: 650px) {

            header {
                flex-direction: column;
                gap: 15px;
            }

            nav a {
                margin: 5px;
                font-size: 13px;
            }

            .hero h2 {
                font-size: 32px;
            }

            section {
                padding: 40px 5%;
            }

        }

    </style>

</head>

<body>

    <!-- Header -->

    <header>

        <h1>EcoLife.</h1>

        <nav>
            <a href="#home">Home</a>
            <a href="#blogs">Blogs</a>
            <a href="#tips">Eco Tips</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
        </nav>

    </header>


    <!-- Hero Section -->

    <section class="hero" id="home">

        <h2>Small Changes, Greener Future.</h2>

        <p>
            Discover simple ways to live sustainably
            and protect our beautiful planet.
        </p>

        <a href="#blogs" class="btn">Explore Articles →</a>

    </section>


    <!-- Blog Section -->

    <section id="blogs">

        <h2 class="section-title">Explore Our Blogs</h2>

        <p class="section-desc">
            Learn how everyday choices can make a difference.
        </p>

        <input
            type="text"
            id="search"
            class="search-box"
            placeholder="Search sustainable articles..."
        >

        <div class="blogs" id="blogList">

            <div class="card">

                <div class="card-image">🌱</div>

                <div class="card-content">

                    <h3>Organic Gardening</h3>

                    <p>
                        Discover how growing your own plants
                        can create a healthier environment.
                    </p>

                    <a href="#tips" class="read-more">Read More →</a>

                </div>

            </div>


            <div class="card">

                <div class="card-image">♻️</div>

                <div class="card-content">

                    <h3>Reduce Plastic Waste</h3>

                    <p>
                        Explore practical ways to reduce
                        plastic usage in your daily life.
                    </p>

                    <a href="#tips" class="read-more">Read More →</a>

                </div>

            </div>


            <div class="card">

                <div class="card-image">☀️</div>

                <div class="card-content">

                    <h3>Renewable Energy</h3>

                    <p>
                        Understand how solar and wind energy
                        contribute to a cleaner planet.
                    </p>

                    <a href="#tips" class="read-more">Read More →</a>

                </div>

            </div>


            <div class="card">

                <div class="card-image">🌍</div>

                <div class="card-content">

                    <h3>Eco-Friendly Lifestyle</h3>

                    <p>
                        Learn simple habits that help
                        protect natural resources.
                    </p>

                    <a href="#tips" class="read-more">Read More →</a>

                </div>

            </div>

        </div>

    </section>


    <!-- Eco Tips -->

    <section class="tips" id="tips">

        <h2 class="section-title">Simple Eco Tips</h2>

        <p class="section-desc">
            Make sustainability part of your everyday routine.
        </p>

        <div class="tips-container">

            <div class="tip">
                <span>💧</span>
                <h3>Save Water</h3>
                <p>Turn off taps when not in use.</p>
            </div>

            <div class="tip">
                <span>🌳</span>
                <h3>Plant Trees</h3>
                <p>Grow plants and support green spaces.</p>
            </div>

            <div class="tip">
                <span>🚲</span>
                <h3>Use Bicycles</h3>
                <p>Choose cycling or walking for short trips.</p>
            </div>

            <div class="tip">
                <span>♻️</span>
                <h3>Recycle Waste</h3>
                <p>Separate waste and reuse materials.</p>
            </div>

        </div>

    </section>


    <!-- About Section -->

    <section id="about">

        <div class="about">

            <h2 class="section-title">About EcoLife</h2>

            <p>
                EcoLife is a sustainable living blog dedicated
                to spreading environmental awareness.

                Our goal is to encourage people to adopt
                eco-friendly habits, reduce waste, conserve
                natural resources and build a greener future
                for the next generation.
            </p>

        </div>

    </section>


    <!-- Contact Section -->

    <section class="contact" id="contact">

        <h2 class="section-title">Get In Touch</h2>

        <p class="section-desc">
            Share your thoughts and join our green community.
        </p>

        <form id="contactForm">

            <input
                type="text"
                id="name"
                placeholder="Enter your name"
                required
            >

            <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
            >

            <textarea
                id="message"
                placeholder="Enter your message"
                required
            ></textarea>

            <button type="submit" class="btn">
                Send Message
            </button>

        </form>

        <p id="result"></p>

    </section>


    <!-- Footer -->

    <footer>

        <p>© 2026 EcoLife | Sustainable Living Blog</p>

        <p>Care for Nature. Live Sustainably.</p>

    </footer>


    <!-- JavaScript -->

    <script>

        // Blog Search Function

        const search = document.getElementById("search");

        search.addEventListener("keyup", function() {

            let value = search.value.toLowerCase();

            let blogs = document.querySelectorAll(".card");

            blogs.forEach(function(blog) {

                let title = blog.querySelector("h3")
                    .innerText.toLowerCase();

                if(title.includes(value)) {

                    blog.style.display = "block";

                } else {

                    blog.style.display = "none";

                }

            });

        });


        // Contact Form Function

        const form = document.getElementById("contactForm");

        form.addEventListener("submit", function(event) {

            event.preventDefault();

            let name = document.getElementById("name").value;

            document.getElementById("result").innerText =
                "Thank you " + name +
                "! Your message has been received.";

            form.reset();

        });

    </script>

</body>

</html>
`;


const server = http.createServer((req, res) => {

    res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8"
    });

    res.end(html);

});


server.listen(PORT, () => {

    console.log(
        "EcoLife running at http://localhost:" + PORT
    );

});