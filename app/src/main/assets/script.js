function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        alert("Login Successful!");
        Android.onLoginSuccess(username, password);  // Call Android Java method
    } else {
        alert("Please enter both fields.");
    }
}
