<template>
    <div class="login-container">
      <div class="login-form">
        <h2 class="login-title">Login</h2>
        <form class="form-input">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" class="form-control">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" class="form-control">
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
          <div class="signup-link">
            <p class="signup">Bạn chưa có tài khoản? 
            <a class="nav-link active" aria-current="page">
            <router-link
              :to="{ name: 'signup' }"
              class="nav-link"
              style="color: rgb(105, 76, 3)"
            >
              Sign Up
            </router-link>
          </a>
        </p>
          </div>
        </form>
        
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Login'
  }
  </script>
  
  <style scoped>

  .form-input{
    display: flex;
    flex-direction: column;
  }
  .login-container {
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;
    height: 79vh;
  }
  .login-form {
    width: 450px;
    height: 70vh;
    padding: 40px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,.1);
    border-radius: 5px;
    font-family: "Courier New", Courier, monospace;
  }
  .login-title {
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
  
  .signup-link {
  text-align: center;
  /* margin-top: 20px; */
}
.signup {
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
    /* width: 150px; */
  }
  .btn-primary {
    background-color: darkgoldenrod;
  }
  .btn-primary:hover {
    background-color: rgb(112, 81, 4);
  }
  </style>
  