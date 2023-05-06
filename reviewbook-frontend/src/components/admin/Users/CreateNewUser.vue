<template>
  <div class="p-5">
    <h1 class="text-dark">Thêm người dùng mới</h1>
    <form class="row" @submit.prevent="createUser">
      <div class="form-group col-12">
        <div v-if="previewImage" class="mt-2">
          <img :src="previewImage" class="img-thumbnail" />
        </div>
        <label for="avatar">Hình ảnh</label>
        <input
          type="file"
          class="form-control"
          id="avatar"
          accept="image/*"
          @change="onFileSelected"
        />
      </div>

      <div class="form-group col-6">
        <label for="name">Họ và tên</label>
        <input type="text" class="form-control" id="name" v-model="user.name" />
      </div>

      <div class="form-group col-6">
        <label for="role">Vai trò</label>
        <select class="form-control" id="role" v-model="user.role">
          <option value="admin">Admin</option>
          <option value="reviewer">Reviewer</option>
          <option value="customer">Customer</option>
        </select>
      </div>

      <div class="form-group col-6">
        <label for="email">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="user.email"
        />
      </div>

      <div class="form-group col-6">
        <label for="phone">Số điện thoại</label>
        <input
          type="text"
          class="form-control"
          id="phone"
          v-model="user.phone"
        />
      </div>

      <div class="form-group col-6">
        <label for="password">Mật khẩu</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="user.password"
        />
      </div>

      <div class="form-group col-6">
        <label for="confirmPassword">Xác nhận mật khẩu</label>
        <input
          type="password"
          class="form-control"
          id="confirmPassword"
          v-model="user.confirmPassword"
        />
      </div>

      <div class="col-12">
        <button class="btn btn-primary" type="submit">Thêm người dùng</button>
      </div>
    </form>
  </div>
</template>

<script>
import BaseAPI from "@/services/api.service";
import Swal from "sweetalert2";

export default {
  name: "CreateNewUser",
  data() {
    return {
      user: {
        avatar: null,
        name: "",
        email: "",
        phone: "",
        role: "",
        password: "",
      },
      previewImage: null,
    };
  },
  methods: {
    createUser() {
      if (this.user.password !== this.user.confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Lỗi!",
          text: "Mật khẩu không khớp",
        });
        return;
      }

      const formData = new FormData();
      formData.append("avatar", this.user.avatar);
      formData.append("name", this.user.name);
      formData.append("email", this.user.email);
      formData.append("phone", this.user.phone);
      formData.append("role", this.user.role);
      formData.append("password", this.user.password);

      BaseAPI.post("/api/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Thành công!",
            text: "Thêm người dùng thành công",
          });
          this.$router.push("/admin/users");
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Lỗi!",
            html:
              "Thêm người dùng không thành công.<br>" +
              error.response.data.message,
          });
        });
    },
    onFileSelected(event) {
      this.user.avatar = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    },
  },
};
</script>

<style scoped>
.img-thumbnail {
  width: 150px;
  height: 150px;
}
.p-5 {
  padding: 5rem;
  font-family: "Courier New", Courier, monospace;
}

h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input,
select,
textarea {
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

input:focus,
select:focus,
textarea:focus {
  outline: 0;
  border-color: darkgoldenrod;
  box-shadow: 0 0 0 0.2rem rgb(184, 134, 11, 0.5);
}

button {
  padding: 0.5rem 1rem;
  background-color: darkgoldenrod;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
}

button:hover {
  background-color: rgb(150, 111, 11);
}

.form-group {
  margin-bottom: 1rem;
}
</style>
