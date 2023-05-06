
<template>
  <div class="header" style="background-color: #f9cd48; height: 60px">
    <div class="header-left">
      <a href="#"
        ><span style="color: darkgoldenrod; font-size: 40px; font-weight: 900"
          >D</span
        ><span style="color: goldenrod; font-size: 30px; font-weight: 700"
          >T</span
        ><span style="color: darkgoldenrod; font-size: 50px; font-weight: 900"
          >H</span
        ></a
      >
    </div>
    <div class="header-center">
      <ul style="list-style: none; padding: 0; margin: 0; text-align: center">
        <li style="display: inline-block; margin: 0 10px">
          <a class="nav-link active" aria-current="page">
            <router-link
              :to="{ name: 'home' }"
              class="nav-link"
              style="color: rgb(105, 76, 3)"
            >
              Home
            </router-link>
          </a>
        </li>
        <li style="display: inline-block; margin: 0 10px">
          <a class="nav-link active" aria-current="page">
            <router-link
              :to="{ name: 'review-client' }"
              class="nav-link"
              style="color: rgb(105, 76, 3)"
            >
              Reviews
            </router-link>
          </a>
        </li>
        <li style="display: inline-block; margin: 0 10px">
          <a class="nav-link active" aria-current="page">
            <router-link
              :to="{ name: 'about' }"
              class="nav-link"
              style="color: rgb(105, 76, 3)"
            >
              About
            </router-link>
          </a>
        </li>
        <li style="display: inline-block; margin: 0 10px">
          <a class="nav-link active" aria-current="page">
            <router-link
              :to="{ name: 'contact' }"
              class="nav-link"
              style="color: rgb(105, 76, 3)"
            >
              Contact
            </router-link>
          </a>
        </li>
      </ul>
    </div>
    <div class="header-right">
      <ul style="list-style: none; padding: 0; margin: 0; text-align: center">
        <li style="display: inline-block; margin: 0 10px">
          <form>
            <input type="search" placeholder="Nhập để tìm..." style="" />
            <button type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                />
              </svg>
            </button>
          </form>
        </li>
        <li style="display: inline-block; margin: 0 10px">
          <a class="nav-link active">
            <router-link
              v-if="!isUserLoggedIn"
              :to="{ name: 'login' }"
              style="color: rgb(105, 76, 3)"
            >
              Login
            </router-link>
            <span
              v-if="isUserLoggedIn"
              @click="logout"
              style="color: rgb(105, 76, 3)"
            >
              Logout
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      isUserLoggedIn: localStorage.getItem("userLogin") ? true : false,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("userLogin");
      this.isUserLoggedIn = false;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap");
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 20px;
  /* background-color: #333;
  color: #fff; */
}

a {
  margin: 2px 0;
  text-decoration: none;
}

span {
  font-family: "Courier New", Courier, monospace;
}

li a {
  font-family: "Courier New", Courier, monospace;
  font-weight: bolder;
  font-size: 17px;
}

form {
  display: flex;
  align-items: center;
}

input[type="search"] {
  border: none;
  padding: 0.5rem;
  margin-right: 0.1rem;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 15px;
  width: 220px;
  height: 35px;
}

button[type="submit"] {
  background-color: darkgoldenrod;
  border: 1px darkgoldenrod solid;
  padding: 0;
  width: 40px;
  height: 35px;
  border-radius: 5px;
}

button[type="submit"] i {
  color: #333;
  font-size: 1.2rem;
}
</style>
