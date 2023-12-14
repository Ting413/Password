let userCredentials = [];

function checkLocalStorage() {
    const storedUserCredentials = JSON.parse(localStorage.getItem('userCredentials'));
    if (storedUserCredentials) {
        userCredentials = storedUserCredentials;
    }
}

checkLocalStorage();

function login(event) {
    event.preventDefault(); // 阻止預設的表單提交行為

    let username = document.loginform.username.value;
    let password = document.loginform.password.value;

    if (!isUsernameTaken(username)) {
        alert("Username is not registered. Please register first.");
        return;
    }

    if (checkCredentials(username, password)) {
        document.getElementById("mainContent").style.display = "block";
        // 只有在密碼正確時才執行跳轉
        window.location.href = "https://www.shu.edu.tw/";
    } else {
        alert("Invalid username or password. Please try again.");
        document.loginform.password.value = "";
    }
}

function register() {
    let newUsername = document.registerform.newUsername.value;
    let newPassword = document.registerform.newPassword.value;

    // 檢查是否有缺少資料
    if (!newUsername || !newPassword) {
        alert("Please fill in all fields.");
        return;
    }

    if (!isUsernameTaken(newUsername)) {
        userCredentials.push({ username: newUsername, password: newPassword });
        localStorage.setItem('userCredentials', JSON.stringify(userCredentials));

        alert("Account registered successfully! Please go back to the login page to log in.");
        window.location.href = "index.html";
    } else {
        alert("Username is already taken. Please choose a different username.");
    }
}

function checkCredentials(username, password) {
    for (let i = 0; i < userCredentials.length; i++) {
        if (userCredentials[i].username === username && userCredentials[i].password === password) {
            // 在這裡執行跳轉
            window.location.href = "https://www.shu.edu.tw/";
            return true;
        }
    }
    return false;
}

function isUsernameTaken(username) {
    for (let i = 0; i < userCredentials.length; i++) {
        if (userCredentials[i].username === username) {
            return true;
        }
    }
    return false;
}

function staff() {
    let found = false;
    let txt = document.forms["staffform"]["s1"].value;
    for (let i = 0; i < staffList.length; i++) {
        if (staffList[i].name === txt) {
            found = true;
            document.forms["staffform"]["s2"].value = staffList[i].phone;
            break;
        }
    }
    if (!found) {
        document.forms["staffform"]["s2"].value = "No such employee!";
    }
}

function togglePasswordVisibility() {
    var passwordInput = document.getElementById('password');
    var toggleIcon = document.getElementById('togglePassword');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.textContent = '🙉';
    } else {
        passwordInput.type = 'password';
        toggleIcon.textContent = '🙈';
    }
}

function toggleNewPasswordVisibility() {
    var newPasswordInput = document.getElementById('newPassword');
    var toggleIcon = document.getElementById('toggleNewPassword');

    if (newPasswordInput.type === 'password') {
        newPasswordInput.type = 'text';
        toggleIcon.textContent = '🙉';
    } else {
        newPasswordInput.type = 'password';
        toggleIcon.textContent = '🙈';
    }
}

function retrievePassword(event) {
    event.preventDefault();

    let forgotUsername = document.forgotpasswordform.forgotUsername.value;

    if (!isUsernameTaken(forgotUsername)) {
        alert("Username is not registered. Please check your username.");
        return;
    }

    let password = getPasswordByUsername(forgotUsername);

    if (password) {
        document.getElementById("passwordDisplay").innerHTML = `Your password is: ${password}`;
    } else {
        alert("Password retrieval failed. Please try again later.");
    }
}

function getPasswordByUsername(username) {
    for (let i = 0; i < userCredentials.length; i++) {
        if (userCredentials[i].username === username) {
            return userCredentials[i].password;
        }
    }
    return null;
}

function redirectToLogin() {
    window.location.href = "index.html";
}

function retrievePassword(event) {
    event.preventDefault();

    let forgotUsername = document.forgotpasswordform.forgotUsername.value;

    if (!isUsernameTaken(forgotUsername)) {
        alert("Username is not registered. Please check your username.");
        return;
    }

    let password = getPasswordByUsername(forgotUsername);

    if (password) {
        document.getElementById("passwordDisplay").innerHTML = `Your password is: ${password}`;
    } else {
        alert("Password retrieval failed. Please try again later.");
    }
}