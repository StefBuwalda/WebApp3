<nav id="navbar">
    <div class="nav-left">
        <a href="/">Home</a>
    </div>
    <div class="nav-center">
        <img src="logo.png" alt="logo" id="logo">
    </div>
    <div class="nav-right">
        <a href="settings" data-auth>Settings</a>
        <a href="/login" data-guest>Login</a>
        <a href="#" id="logout" data-auth>Logout</a>
    </div>
</nav>

<script type="module">
    import {Auth} from "/js/auth.js";

    const auth = new Auth();
    auth.applyVisibility();

    document.getElementById("logout").addEventListener('click', async (e) => {
        e.preventDefault();
        auth.logout();
        window.location.href = "/";
    });
</script>