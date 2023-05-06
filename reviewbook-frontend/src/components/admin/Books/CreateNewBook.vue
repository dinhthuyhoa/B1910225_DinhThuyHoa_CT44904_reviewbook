<template>
  <div class="p-5">
    <h1 class="text-dark">Thêm sách vào kho sách</h1>
    <form class="row" @submit.prevent="createBook">
      <div class="form-group col-12">
        <div v-if="previewImage" class="mt-2">
          <img :src="previewImage" class="img-thumbnail" />
        </div>
        <label for="image">Hình ảnh</label>
        <input
          type="file"
          class="form-control"
          id="image"
          accept="image/*"
          @change="onFileSelected"
        />
      </div>
      <div class="form-group col-12">
        <label for="title">Tiêu đề</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="book.title"
        />
      </div>
      <div class="form-group col-12">
        <label for="author">Tác giả</label>
        <input
          type="text"
          class="form-control"
          id="author"
          v-model="book.author"
        />
      </div>
      <div class="form-group col-12">
        <label for="date">Ngày xuất bản</label>
        <input type="date" class="form-control" id="date" v-model="book.date" />
      </div>

      <div class="col-12">
        <button class="btn btn-primary" type="submit">Thêm sách</button>
      </div>
    </form>
  </div>
</template>

<script>
import BaseAPI from "@/services/api.service";
import Swal from "sweetalert2";

export default {
  name: "CreateNewBook",
  data() {
    return {
      book: {
        title: "",
        author: "",
        date: "",
        image: null,
      },
      previewImage: null,
    };
  },
  methods: {
    createBook() {
      const formData = new FormData();
      formData.append("title", this.book.title);
      formData.append("author", this.book.author);
      formData.append("date", this.book.date);
      formData.append("image", this.book.image);

      BaseAPI.post("/api/books", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Thành công!",
            text: "Thêm sách thành công",
          });
          this.$router.push("/admin/books");
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Lỗi!",
            html:
              "Thêm sách không thành công.<br>" + error.response.data.message,
          });
        });
    },
    onFileSelected(event) {
      this.book.image = event.target.files[0];
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
  width: 200px;
}
</style>
