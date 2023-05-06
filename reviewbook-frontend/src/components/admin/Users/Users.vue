<template>
  <div class="p-5">
    <h1 class="text-dark">Danh sách người dùng</h1>
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Ảnh đại diện</th>
          <th>Họ và tên</th>
          <th>Email</th>
          <th>Số điện thoại</th>
          <th>Vai trò</th>
          <th class="text-center">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <td>{{ index + 1 }}</td>
          <td>
            <img :src="user.avatar" alt="" style="width: 50px; height: 50px" />
          </td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.role }}</td>
          <td class="d-flex justify-content-center" style="gap: 10px">
            <button
              class="btn"
              style="background-color: darkgoldenrod"
              @click="editUser(user._id)"
            >
              <font-awesome-icon :icon="['fas', 'edit']" />
            </button>
            <button class="btn btn-danger" @click="deleteUser(user._id)">
              <font-awesome-icon :icon="['fas', 'trash']" />
            </button>
          </td>
        </tr>
        <tr v-if="users.length < 1">
          <td colspan="6" class="text-center"><h4>Không có dữ liệu</h4></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.p-5 {
  font-family: "Courier New", Courier, monospace;
}
.table {
  margin-top: 6%;
}

.table th {
  font-weight: bold;
}
</style>

<script>
import BaseAPI from "@/services/api.service";
import Swal from "sweetalert2";

export default {
  name: "Users",
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    BaseAPI.get("/api/users")
      .then((response) => {
        console.log(response.data);
        this.users = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    deleteUser(id) {
      Swal.fire({
        title: "Bạn có chắc chắn muốn xóa?",
        text: "Một khi đã xóa, bạn sẽ không thể khôi phục lại người dùng này!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xóa người dùng khỏi danh sách?",
      }).then((result) => {
        if (result.isConfirmed) {
          BaseAPI.delete(`/api/users/${id}`)
            .then((response) => {
              this.users = this.users.filter((user) => user._id !== id);
              Swal.fire("Đã xóa!", "người dùng đã được xóa.", "success");
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    },
    editUser(id) {
      // Do something when click on "Edit" button
      // For example, redirect to a edit page with user's ID as parameter
      this.$router.push({ name: "EditUser", params: { id: id } });
    },
  },
};
</script>

