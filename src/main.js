function loadNavbar(){
    const navbar = `
        <nav style="
            width: 100%; 
            height: 60px; 
            background: #222; 
            color: white; 
            display: flex; 
            align-items: center; 
            justify-content: space-between; 
            padding: 0;
            font-family: Arial, sans-serif;
        ">
            <div class="nav-left" style="display: flex; gap: 15px; padding: 10px">
                <a href="/index.html" style="color: white; text-decoration: none;">Home</a>
                <a href="/src/flappybird.html" style="color: white; text-decoration: none;">Flappy Bird</a>
            </div>
            <div class="nav-right" style="display: flex; gap: 15px; padding: 10px">
                <a href="about.html" style="color: white; text-decoration: none;">About</a>
                <a href="settings.html" style="color: white; text-decoration: none;">Settings</a>
                <a href="account.html" style="color: white; text-decoration: none;">Account</a>
            </div>
        </nav>
    `;

    document.body.insertAdjacentHTML("afterbegin", navbar);
}

function loadFooter(){
    const footer = `
    <div style="width: 100%;">
        <p>&copy; Kallen 2025. Report Issues to the
            <a href = "https://github.com/kaydenireland/web-games">GitHub</a>
        </p>
    </div>`;

    document.body.insertAdjacentHTML("beforeend", footer);
}

// Run after page loads
window.addEventListener("DOMContentLoaded", loadNavbar);
window.addEventListener("DOMContentLoaded", loadFooter);