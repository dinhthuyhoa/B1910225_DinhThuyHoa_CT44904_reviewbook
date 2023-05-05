<template>
  <div class="p-5">
    <h1>Create New Book</h1>
    <form class="row" @submit.prevent="createBook()">
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
        <label for="content">Nội dung</label>
        <textarea
          type="text"
          class="form-control"
          id="content"
          v-model="book.content"
        ></textarea>
      </div>
      <div class="form-group col-12">
        <label for="date">Ngày xuất bản</label>
        <input type="date" class="form-control" id="date" v-model="book.date" />
      </div>

      <div class="col-12">
        <button class="btn btn-primary" @click.prevent="createBook()">
          Create Book
        </button>
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
        content: "",
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
      formData.append("content", this.book.content);
      formData.append("date", this.book.date);
      formData.append("image", this.book.image);
      BaseAPI.post("/api/books", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          console.log(response.data);
          Swal.fire("Created!", "The book has been created.", "success");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onFileSelected(event) {
      this.book.image = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.book.image);
      reader.onload = (event) => {
        this.previewImage = event.target.result;
      };
    },
  },
};
</script>

<style scoped>
.img-thumbnail {
  width: 150px;
  height: 150px;
}
</style>
