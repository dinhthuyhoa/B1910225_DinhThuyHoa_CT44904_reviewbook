<template>
  <div class="p-5">
    <h1 class="text-dark">Chỉnh sửa bài review sách</h1>
    <form class="row" @submit.prevent="updateReview">
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
        <label for="author">Người đánh giá</label>
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
        <button class="btn btn-primary" type="submit">Cập nhật review</button>
      </div>
    </form>
  </div>
</template>

<script>
import BaseAPI from "@/services/api.service";
import Swal from "sweetalert2";

export default {
  name: "EditReview",
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
    const reviewId = this.$route.params.id;
    this.fetchReview(reviewId);
    this.fetchBooks();
  },
  methods: {
    fetchReview(reviewId) {
      BaseAPI.get(`/api/reviews/${reviewId}`)
        .then((response) => {
          this.review = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchBooks() {
      BaseAPI.get("/api/books")
        .then((response) => {
          this.books = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    updateReview() {
      BaseAPI.put(`/api/reviews/${this.review._id}`, this.review)
        .then((response) => {
          console.log(response.data);
          Swal.fire(
            "Updated!",
            "Review đã được cập nhật thành công!",
            "success"
          );
          this.$router.push("/admin/reviews");
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Lỗi!",
            html: "Cập nhật review không thành công.<br>" + error.response.data,
          });
        });
    },
  },
};
</script>
