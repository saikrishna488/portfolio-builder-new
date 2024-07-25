const style2 = (data) => {
    let skills = data.skills.split(",");
    let projects = data.projects.split(",");
    let certifications = data.certifications.split(",");

    let str = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>${data.name}'s Portfolio</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/5.1.3/css/bootstrap.min.css">
    <style>
        body {
            background: linear-gradient(135deg, #1f1c2c, #928DAB);
            color: #fff !important;
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }

        .navbar {
            background-color: #1c2331;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
            list-style: none;
        }

        .navbar-brand {
            color: #ffffff !important;
            font-size: 1.5rem;
            font-weight: bold;
        }

        .navbar-brand:hover {
            color: #a9a9a9 !important;
        }

        .navbar-nav {
            margin-left: auto;
            margin-right: auto;
        }

        .navbar-nav .nav-item {
            margin: 0 10px;
            color : white;
        }

        .navbar-nav .nav-link {
            color: white!important;
            padding: 0.5rem 1rem;
            text-decoration: none;
        }
        .nav-li{
            color: white;
            text-decoration: none;
        }

        .navbar-nav .nav-link:hover {
            color: #a9a9a9 !important;
        }

        .navbar-toggler {
            border-color: #ffffff;
        }

        .navbar-toggler-icon {
            background-image: url('data:image/svg+xml;charset=utf8,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><path stroke="%23ffffff" stroke-linecap="round" stroke-width="2" d="M5 7h20M5 15h20M5 23h20"/></svg>');
        }

        .header {
            background: url('https://source.unsplash.com/1600x900/?technology,code') no-repeat center center/cover;
            color: #fff;
            padding: 60px 15px;
            text-align: center;
            background-size: cover;
        }

        .header h1 {
            font-size: 3rem;
            font-weight: bold;
        }

        .header p {
            font-size: 1.25rem;
            margin-top: 10px;
        }

        .section {
            padding: 60px 15px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            margin-bottom: 30px;
        }

        .section h2 {
            font-size: 2rem;
            margin-bottom: 20px;
        }

        .project-card {
            background: #2d3436;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            color: #fff;
        }

        .project-card h4 {
            font-size: 1.5rem;
        }

        .footer {
            background-color: #1c2331;
            color: #fff;
            text-align: center;
            padding: 20px;
            margin-top: auto;
        }

        @media (max-width: 767px) {
            .navbar-nav {
                flex-direction: column;
                text-align: center;
            }

            .navbar-nav .nav-item {
                margin: 5px 0;
            }

            .header h1 {
                font-size: 2.5rem;
            }

            .header p {
                font-size: 1rem;
            }

            .section {
                padding: 40px 15px;
            }

            .project-card h4 {
                font-size: 1.25rem;
            }
        }
    </style>
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-dark">
        <a class="navbar-brand" href="#">${data.name}</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar">
                <li class="nav-item">
                    <a class="nav-li" href="#about">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-li" href="#skills">Skills</a>
                </li>
                <li class="nav-item">
                    <a class="nav-li" href="#certifications">Certifications</a>
                </li>
                <li class="nav-item">
                    <a class="nav-li" href="#projects">Projects</a>
                </li>
            </ul>
        </div>
    </nav>

    <header class="header">
        <div>
            <h1 class="animate__animated animate__fadeIn">${data.name}</h1>
            <p class="animate__animated animate__fadeIn animate__delay-1s">${data.field} | ${data.role}</p>
        </div>
    </header>

    <main>
        <section id="about" class="section">
            <div class="container">
                <div class="project-card animate__animated animate__fadeIn">
                    <h2>About Me</h2>
                    <p>${data.description}</p>
                </div>
            </div>
        </section>

        <section id="skills" class="section">
            <div class="container">
                <div class="project-card animate__animated animate__fadeIn">
                    <h2>Skills</h2>
                    <ul>
                        ${skills.map(skill => `<li>${skill}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </section>

        <section id="certifications" class="section">
            <div class="container">
                <div class="project-card animate__animated animate__fadeIn">
                    <h2>Certifications</h2>
                    <ul>
                        ${certifications.map(certification => `<li>${certification}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </section>

        <section id="projects" class="section">
            <div class="container">
                <div class="project-card animate__animated animate__fadeIn">
                    <h2>Projects</h2>
                    ${projects.map(project => `<div><h4>${project}</h4></div>`).join('')}
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        &copy; ${new Date().getFullYear()} ${data.name}. All rights reserved.
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>
`;

    return str;
}

module.exports = style2;
