<template>
  <div class="p-5">
    <h1 class="text-dark">Thêm review mới</h1>
    <form class="row" @submit.prevent="createReview">
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
        <label for="content">Nội dung</label>
        <textarea
          type="text"
          class="form-control"
          id="content"
          v-model="review.content"
        ></textarea>
      </div>

      <div class="form-group col-12">
        <label for="author">Tác giả</label>
        <input
          type="text"
          class="form-control"
          id="author"
          v-model="review.author"
        />
      </div>
      <div class="form-group col-12">
        <label for="book">Sách</label>
        <select class="form-control" id="book" v-model="review.book_id">
          <option disabled value="">Chọn sách</option>
          <option v-for="book in books" :key="book._id" :value="book._id">
            {{ book.title }}
          </option>
        </select>
      </div>
      
      <div class="form-group col-12">
        <label for="date">Ngày đăng</label>
        <input
          type="date"
          class="form-control"
          id="date"
          v-model="review.date"
        />
      </div>

      <div class="col-12">
        <button class="btn btn-primary" type="submit">Thêm review</button>
      </div>
    </form>
  </div>
</template>

<script>
import BaseAPI from "@/services/api.service";
import Swal from "sweetalert2";

export default {
  name: "CreateNewReview",
  data() {
    return {
      review: {
        title: "",
        content: "",
        author: null,
        user_id: null,
        book_id: null,
        date: "",
      },
      books: [], // danh sách sách
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    fetchBooks() {
      BaseAPI.get("/api/books")
        .then((response) => {
          this.books = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    createReview() {
      BaseAPI.post("/api/reviews", this.review)
        .then((response) => {
          console.log(response.data);
          Swal.fire(
            "Created!",
            "Review đã được thêm vào danh sách!",
            "success"
          );
          this.$router.push("/admin/reviews");
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Lỗi!",
            html:
              "Thêm review không thành công.<br>" + error.response.data.message,
          });
        });
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
