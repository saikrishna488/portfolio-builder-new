

const style1 = (data)=>{


    let skills = data.skills.split(",");
    let projects = data.projects.split(",");
    let certifications = data.certifications.split(",");
    
    let str = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>${data.name}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="styles.css"> <!-- Create a separate CSS file for your custom styles -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
    <!-- Add animate.css for animations -->
    <style>
        /* Add background image and custom styles here */
        body {
            background-image: url('https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2022/04/web-developer-portfolio.webp');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
            color: #fff;
        }

        /* Dark background color for the header */
        .header {
            background-color: #333;
        }

        /* Background color for the navbar */
        .navbar {
            background-color: #2C3E50;
            /* Beautiful background color for the navbar */
        }

        .navbar-dark .navbar-toggler-icon {
            background-color: #fff;
        }

        /* Add more custom styles as needed */
        /* Box shadow and custom styles for sections */
        .content-section {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
        }

        /* Custom style to make each section take up half of the page */
        .half-page {
            min-height: 50vh;
        }

        /* Footer styles */
        .footer {
            background-color: #333;
            color: #fff;
            text-align: center;
            padding: 10px 0;
        }

        /* Beautiful project card styles */
        .project-card {
            background-color: #3498db;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
        }

        /* Add a demo text style */
        .demo-text {
            color: #333;
        }
    </style>
    <title>Your Portfolio</title>
</head>

<body>
    <!-- Navigation Bar with buttons for each section -->
    <nav class="navbar navbar-expand-lg navbar-dark">
        <a class="navbar-brand" href="#">${data.name}</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="bi bi-list"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="#about">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#skills">Skills</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#certifications">Certifications</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#projects">Projects</a>
                </li>
            </ul>
        </div>
    </nav>

    <!-- Header Section with dark background -->
    <header class="jumbotron jumbotron-fluid text-center header half-page">
        <div class="container">
            <h1 class="display-4 animate__animated animate__fadeIn animate__delay-1s">${data.name}</h1>
            <p class="lead animate__animated animate__fadeIn animate__delay-2s">${data.field} | ${data.role}</p>
        </div>
    </header>

    <!-- Description Section with demo text -->
    <section id="about" class="container my-5 py-5 content-section half-page">
        <div class="project-card animate__animated animate__fadeIn animate__delay-2s">
            <h2 class="card-title">About Me</h2>
            <p class="card-text demo-text">
                ${data.description}
            </p>
        </div>
    </section>

    <!-- Skills Section with demo text -->
    <section id="skills" class="container my-5 py-5 content-section half-page">
        <div class="project-card animate__animated animate__fadeIn animate__delay-2s">
            <h2 class="card-title">Skills</h2>
            ${skills.map((skill) => `<li>${skill}</li>`).join('')}
        </div>
    </section>

    <!-- Certifications Section with demo text -->
    <section id="certifications" class="container my-5 py-5 content-section half-page">
        <div class="project-card animate__animated animate__fadeIn animate__delay-2s">
            <h2 class="card-title">Certifications</h2>
            <ul class="list demo-text">
                ${certifications.map((certification) => (`
                <li>${certification}</li>
                `)).join("")}
            </ul>
        </div>
    </section>

    <!-- Projects Section with demo projects -->
    <section id="projects" class="container my-5 py-5 content-section half-page">
        <div class="project-card animate__animated animate__fadeIn animate__delay-2s">
            <h2 class="card-title">Projects</h2>
            ${projects.map((project) => (`
            <div class="demo-text">
                <h4>${project}</h4>
            </div>
            `)).join("")}
        </div>
    </section>

    <!-- Footer with copyright notice -->
    <footer class="footer">
        &copy; 2023 elevateyourprofile.com
    </footer>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>

</html>

`

return str;
}

module.exports = style1


