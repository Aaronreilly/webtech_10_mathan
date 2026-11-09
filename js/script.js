
// Blog Search

const search = document.getElementById("search");

search.addEventListener("keyup", function() {

    let value = search.value.toLowerCase();

    let blogs = document.querySelectorAll(".card");

    blogs.forEach(function(blog) {

        let title = blog.querySelector("h3")
                        .innerText.toLowerCase();

        if (title.includes(value)) {
            blog.style.display = "block";
        } else {
            blog.style.display = "none";
        }

    });

});


// Contact Form

const form = document.getElementById("contactForm");

form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {

        const response = await fetch("/contact", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })

        });

        const result = await response.json();

        document.getElementById("result").innerText =
            result.message;

        if (response.ok) {
            form.reset();
        }

    } catch (error) {

        document.getElementById("result").innerText =
            "Unable to send message. Try again.";

    }

});
