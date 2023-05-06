<template>
  <div class="p-5">
    <h1>Thêm người dùng mới</h1>
    <form class="row">
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
      <div class="col-12"> 
        <button class="btn" @click.prevent="createUser()" style="background-color: darkgoldenrod;" >
          Thêm người dùng
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
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
  select {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
    transition: border-color 0.2s ease-in-out;
  }

  input:focus,
  select:focus {
    outline: none;
    border-color: darkgoldenrod;
  }

  button {
    margin-top: 2rem;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    background-color: darkgoldenrod;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s ease-in-out;
  }

  button:hover {
    background-color: #ffc107;
  }
</style>

<script>
import BaseAPI from "@/services/api.service";
import Swal from "sweetalert2";

export default {
  name: "CreateNewUser",
  data() {
    return {
      user: {
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "", //
      },
    };
  },
  methods: {
    createUser() {
      BaseAPI.post("/api/users", this.user)
        .then((response) => {
          console.log(response.data);
          Swal.fire("Created!", "Người dùng mới được thêm vào danh sách!", "success");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
