<template>
  <div class="p-5">
    <h1>Quản lý kho sách</h1>
    <table class="table">
      <thead>
        <tr>
          <th>Hình ảnh</th>
          <th>Tên sách</th>
          <th>Tác giả</th>
          <th>Ngày xuất bản</th>
          <th class="text-center">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, index) in books" :key="book.id">
          <td>{{ index + 1 }}</td>
          <td>{{ book.image }}</td>
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.date }}</td>
          <td class="d-flex justify-content-center" style="gap: 10px">
            <button class="btn" style="background-color: darkgoldenrod;" >
              <font-awesome-icon :icon="['fas', 'edit']" />
            </button>
            <button class="btn btn-danger" @click="deleteBook(book._id)">
              <font-awesome-icon :icon="['fas', 'trash']" />
            </button>
          </td>
        </tr>
        <tr v-if="books.length < 1">
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
  name: "AdminUsers",
  data() {
    return {
      books: [],
    };
  },
  mounted() {
    BaseAPI.get("/api/books")
      .then((response) => {
        console.log(response.data);
        this.books = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    deleteBook(id) {
      Swal.fire({
        title: "Bạn chắc chứ?",
        text: "Sau khi xóa sẽ không thể khôi phục!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy",
      }).then((result) => {
        if (result.isConfirmed) {
          BaseAPI.delete(`/api/books/${id}`)
            .then((response) => {
              const index = this.books.findIndex((user) => user.id === id);
              this.books.splice(index, 1);
              Swal.fire("Đã xóa!", "Sách đã được xóa.", "success");
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    },
  },
};
</script>
