<template>
  <div class="signup-container">
    <div class="signup-form">
      <h2 class="signup-title">Đăng ký</h2>
      <form class="form-input" @submit.prevent="signup">
        <div class="form-group">
          <label for="phone">Số điện thoại</label>
          <input
            type="text"
            id="phone"
            name="phone"
            v-model="phone"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            v-model="email"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="password">Mật khẩu</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="password"
          />
        </div>

        <div class="form-group">
          <label for="confirmPassword">Xác nhận mật khẩu</label>
          <input
            type="password"
            class="form-control"
            id="confirmPassword"
            v-model="confirmPassword"
          />
        </div>
        <button type="submit" class="btn btn-primary">Đăng ký</button>
        <div class="login-link">
          <p class="login">
            Bạn đã có tài khoản?
            <router-link
              :to="{ name: 'login' }"
              class="nav-link active"
              style="color: rgb(105, 76, 3)"
            >
              Đăng nhập
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
  name: "Signup",
  data() {
    return {
      password: "",
      confirmPassword: "",
      phone: "",
      email: "",
    };
  },
  methods: {
    async signup() {
      if (this.password !== this.confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Lỗi!",
          text: "Mật khẩu không khớp",
        });
        return;
      }
      try {
        const response = await BaseAPI.post("/api/auth/register", {
          username: this.username,
          password: this.password,
          phone: this.phone,
          email: this.email,
        });
        // Xử lý kết quả trả về nếu cần
        if (response.data) {
          console.log(response.data);
          // Lưu thông tin đăng nhập vào localStorage
          localStorage.setItem("userLogin", response.data);

          Swal.fire({
            icon: "success",
            title: "Thành công!",
            text: "Đăng ký thành công",
          });

          // Chuyển hướng về trang home
          this.$router.push({ name: "home" });
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
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}
.signup-form {
  width: 450px;
  height: 78vh;
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
