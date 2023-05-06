<template>
  <div class="p-5">
    <h1 class="text-dark">Sửa thông tin người dùng</h1>
    <form class="row" @submit.prevent="editUser">
      <div class="form-group col-12">
        <div v-if="previewImage || user.avatar" class="mt-2">
          <img
            :src="previewImage ? previewImage : user.avatar"
            class="img-thumbnail"
          />
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
        <small class="text-secondary">Bỏ qua nếu không cần đổi mật khẩu</small>
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
        <button class="btn btn-primary" type="submit">Cập nhật</button>
      </div>
    </form>
  </div>
</template>
<script>
import BaseAPI from "@/services/api.service";
import Swal from "sweetalert2";

export default {
  name: "EditUser",
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
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      const userId = this.$route.params.id;
      BaseAPI.get(`/api/users/${userId}`)
        .then((response) => {
          this.user = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editUser() {
      if (
        this.user.password &&
        this.user.password !== this.user.confirmPassword
      ) {
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

      const userId = this.$route.params.id;
      BaseAPI.put(`/api/users/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Thành công!",
            text: "Cập nhật sách thành công",
          });
          this.$router.push("/admin/users");
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Lỗi!",
            html:
              "Cập nhật sách không thành công.<br>" +
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
  .p-5 {
    padding: 5rem;
    font-family: "Courier New", Courier, monospace;
  }

  .text-dark {
    color: #343a40;
  }

  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  /* input[type="file"] {
    margin-top: 0.5rem;
  } */

  .img-thumbnail {
    width: 200px;
  }
</style>