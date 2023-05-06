<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">
      <span style="color: darkgoldenrod; font-size: 40px; font-weight: 900">D</span>
      <span style="color: goldenrod; font-size: 30px; font-weight: 700">T</span>
      <span style="color: darkgoldenrod; font-size: 50px; font-weight: 900">H</span>
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Profile
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">Logout</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AdminNavbar",
};
</script>

<style scoped>
.navbar {
  font-family: "Courier New", Courier, monospace;
  height: 82px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  font-weight: bold;
}

.navbar-nav .nav-link {
  color: #6c757d;
  font-weight: bold;
}

.navbar-nav .nav-link:hover {
  color: #212529;
}

.dropdown-menu {
  border: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.dropdown-divider {
  margin: 0;
}
</style>
