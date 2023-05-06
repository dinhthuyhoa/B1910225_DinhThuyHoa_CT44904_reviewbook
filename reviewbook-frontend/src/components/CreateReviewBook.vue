<template>
  <div class="p-5">
    <h1>Thêm bài review sách</h1>
    <form class="row">

      <div class="form-group col-12">
        <label for="title">Tiêu đề</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="review.title"
        />
      </div>
      <div class="form-group col-12">
        <label for="author">Người đánh giá</label>
        <textarea
          type="text"
          class="form-control"
          id="author"
          v-model="review.author"
        ></textarea>
      </div>
      <div class="form-group col-12">
        <label for="book">Sách</label>
        <input type="text" class="form-control" id="book" v-model="review.book" />
      </div>

      <div class="col-12">
        <button class="btn btn-primary" @click.prevent="createReview()">
          Thêm review
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import BaseAPI from "@/services/api.service";
import Swal from "sweetalert2";

export default {
  name: "CreateReview",
  data() {
    return {
      book: {
        title: "",
        author: "",
        book: "",
        //image: null,
      },
      //previewImage: null,
    };
  },
  methods: {
    createReview() {
      const formData = new FormData();
      formData.append("title", this.review.title);
      formData.append("author", this.review.author);
      formData.append("book", this.review.book);
      //formData.append("image", this.book.image);
      BaseAPI.post("/api/reviews", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          console.log(response.data);
          Swal.fire("Created!", "Bài review sách đã được thêm!", "success");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // onFileSelected(event) {
    //   this.book.image = event.target.files[0];
    //   const reader = new FileReader();
    //   reader.readAsDataURL(this.book.image);
    //   reader.onload = (event) => {
    //     this.previewImage = event.target.result;
    //   };
    // },
  },
};
</script>

<style scoped>
/* .img-thumbnail {
  width: 150px;
  height: 150px;
} */

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
