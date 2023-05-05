<template>
  <div class="p-5">
    <h1>Create New Book</h1>
    <form class="row">
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
        <input
          type="date"
          class="form-control"
          id="date"
          v-model="book.date"
        />
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
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "customer",
      },
    };
  },
  methods: {
    createBook() {
      BaseAPI.post("/api/books", this.book)
        .then((response) => {
          console.log(response.data);
          Swal.fire("Created!", "The book has been created.", "success");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
