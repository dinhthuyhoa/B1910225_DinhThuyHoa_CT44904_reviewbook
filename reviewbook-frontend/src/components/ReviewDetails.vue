<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h1 class="text-center text-white">{{ review.title }}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <img
          :src="getBookById(review.book_id).image"
          class="img-fluid"
          alt="Review image"
        />
      </div>
      <div class="col-md-8 text-white">
        <h4>Tác giả: {{ review.author }}</h4>
        <h4>Sách review: {{ getBookById(review.book_id).title }}</h4>
        <p class="text-muted">{{ formatDate(review.date) }}</p>
        <p>{{ review.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import BaseAPI from "@/services/api.service";

export default {
  name: "ReviewDetails",
  data() {
    return {
      review: {},
      books: {},
    };
  },
  mounted() {
    const id = this.$route.params.id;
    BaseAPI.get(`/api/reviews/${id}`)
      .then((response) => {
        this.review = response.data;
        this.loadBooks();
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    loadBooks() {
      BaseAPI.get("/api/books")
        .then((response) => {
          this.books = response.data.reduce((acc, curr) => {
            acc[curr._id] = curr;
            return acc;
          }, {});
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getBookById(bookId) {
      return this.books[bookId] || "Không có sách";
    },
    formatDate(date) {
      const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      const formattedDate = new Date(date).toLocaleDateString("vi-VN", options);
      return formattedDate;
    },
  },
};
</script>
