// This is a basic structure. You'll need to implement the full SPA functionality
const app = document.getElementById('app');

const router = {
  '/': homePage,
  '/login': loginPage,
  '/register': registerPage,
  '/dashboard': dashboardPage
};

function navigate(path) {
  window.history.pushState({}, path, window.location.origin + path);
  updateContent();
}

function updateContent() {
  const path = window.location.pathname;
  const page = router[path] || notFoundPage;
  app.innerHTML = '';
  app.appendChild(page());
}

function homePage() {
  const home = document.createElement('div');
  home.innerHTML = `
    <h1>Welcome to StudiZ</h1>
    <button onclick="navigate('/login')">Login</button>
    <button onclick="navigate('/register')">Register</button>
  `;
  return home;
}

function loginPage() {
  const login = document.createElement('div');
  login.innerHTML = `
    <h2>Login</h2>
    <form id="loginForm">
      <input type="email" id="email" required>
      <input type="password" id="password" required>
      <button type="submit">Login</button>
    </form>
  `;
  login.querySelector('#loginForm').addEventListener('submit', handleLogin);
  return login;
}

function registerPage() {
  const register = document.createElement('div');
  register.innerHTML = `
    <h2>Register</h2>
    <form id="registerForm">
      <input type="text" id="username" required>
      <input type="email" id="email" required>
      <input type="password" id="password" required>
      <button type="submit">Register</button>
    </form>
  `;
  register.querySelector('#registerForm').addEventListener('submit', handleRegister);
  return register;
}

function dashboardPage() {
  const dashboard = document.createElement('div');
  dashboard.innerHTML = `
    <h2>Dashboard</h2>
    <button onclick="createSession()">Create New Session</button>
    <div id="sessionList"></div>
  `;
  loadSessions();
  return dashboard;
}

function notFoundPage() {
  const notFound = document.createElement('div');
  notFound.innerHTML = '<h2>404 Not Found</h2>';
  return notFound;
}

async function handleLogin(e) {
  e.preventDefault();
  // Implement login logic
}

async function handleRegister(e) {
  e.preventDefault();
  // Implement register logic
}

async function createSession() {
  // Implement session creation logic
}

async function loadSessions() {
  // Implement session loading logic
}

window.addEventListener('popstate', updateContent);
updateContent();