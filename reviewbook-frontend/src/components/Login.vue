<template>
  <div class="login-container">
    <div class="login-form">
      <h2 class="login-title">Đăng nhập</h2>
      <form class="form-input" @submit.prevent="login">
        <div class="form-group">
          <label for="username">Email</label>
          <input
            type="text"
            id="username"
            name="username"
            v-model="username"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            name="password"
            v-model="password"
            class="form-control"
          />
        </div>
        <button type="submit" class="btn btn-primary">Đăng nhập</button>
        <div class="signup-link">
          <p class="signup">
            Bạn chưa có tài khoản?
            <router-link
              :to="{ name: 'signup' }"
              class="nav-link active"
              style="color: rgb(105, 76, 3)"
            >
              Đăng ký
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BaseAPI from "@/services/api.service";
import Swal from "sweetalert2";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      isUserLoggedIn: localStorage.getItem("userLogin") ? true : false,
    };
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("userLogin")) {
      next({ name: "home" });
    } else {
      next();
    }
  },
  methods: {
    async login() {
      try {
        const response = await BaseAPI.post("/api/auth/login", {
          username: this.username,
          password: this.password,
        });
        // Xử lý kết quả trả về nếu cần
        if (response.data) {
          console.log(response.data);
          const userTemp = response.data;

          // Lưu thông tin đăng nhập vào localStorage
          if (userTemp.role == "admin" || userTemp.role == "reviewer") {
            localStorage.setItem("userLoginAdmin", response.data);
            Swal.fire({
              icon: "success",
              title: "Thành công!",
              text: "Đăng nhập thành công",
            });

            // Chuyển hướng về trang home
            this.$router.push({ name: "Users" });
          } else {
            localStorage.setItem("userLogin", response.data);
            Swal.fire({
              icon: "success",
              title: "Thành công!",
              text: "Đăng nhập thành công",
            });

            // Chuyển hướng về trang home
            this.$router.push({ name: "home" });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Lỗi!",
            html: "Sai tài khoản hoặc mật khẩu",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi!",
          html: error.response.data.message,
        });
      }
    },
  },
};
</script>



<style scoped>
.form-input {
  display: flex;
  flex-direction: column;

}
.login-container {
  display: flex;
  /* flex-direction: column; */
  
  font-family: "Courier New", Courier, monospace;
  justify-content: center;
  align-items: center;
  height: 79vh;
}
.login-form {
  width: 450px;
  height: 70vh;
  padding: 40px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
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
  width: 30%;
  margin-top: 6px;
  margin-right: 5px;
  font-weight: bold;
  display: flex;
  justify-content: start;
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
