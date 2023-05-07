<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-md-12">
        <h1 class="text-center text-white my-5">Các bài review</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card-columns">
          <router-link
            v-for="(review, index) in reviews"
            :key="index"
            :to="{ name: 'review-details', params: { id: review._id } }"
          >
            <div class="card">
              <img
                :src="getBookById(review.book_id).image"
                class="card-img-top"
                alt="Review image"
              />
              <div class="card-body">
                <h5 class="card-title">{{ review.title }}</h5>
                <p class="card-text">Tác giả: {{ review.author }}</p>
                <p class="card-text">
                  <small class="text-muted">{{
                    formatDate(review.date)
                  }}</small>
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseAPI from "@/services/api.service";
import Swal from "sweetalert2";

export default {
  name: "Reviews",
  data() {
    return {
      reviews: [],
      books: {},
    };
  },
  mounted() {
    BaseAPI.get("/api/reviews")
      .then((response) => {
        this.reviews = response.data;
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
