<template>
  <div class="signup-container">
    <div class="signup-form">
      <h2 class="signup-title">Sign Up</h2>
      <form class="form-input">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            class="form-control"
          />
        </div>
        <button type="submit" class="btn btn-primary">Sign Up</button>
        <div class="login-link">
          <p class="login">
            Bạn đã có tài khoản?
            <a class="nav-link active" aria-current="page">
              <router-link
                :to="{ name: 'login' }"
                class="nav-link"
                style="color: rgb(105, 76, 3)"
              >
                Login
              </router-link>
            </a>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.form-input {
  display: flex;
  flex-direction: column;
}
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.signup-form {
  width: 450px;
  height: 80vh;
  padding: 40px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-family: "Courier New", Courier, monospace;
}
.signup-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
}
.form-group {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-group label {
  margin-top: 6px;
  margin-right: 5px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
}

.login-link {
  text-align: center;
  /* margin-top: 20px; */
}
.login {
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn {
  display: inline-block;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  margin-top: 25px;
  margin-bottom: 30px;
  font-weight: bold;
}

.btn-primary {
  background-color: darkgoldenrod;
}

.btn-primary:hover {
  background-color: rgb(112, 81, 4);
}
</style>
