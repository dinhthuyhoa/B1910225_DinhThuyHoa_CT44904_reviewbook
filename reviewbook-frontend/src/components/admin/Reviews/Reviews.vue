<template>
  <div class="p-5">
    <h1 class="text-dark">Quản lý bài review sách</h1>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tiêu đề</th>
          <th>Người đánh giá</th>
          <th>Sách</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(review, index) in reviews" :key="review.id">
          <td>{{ index + 1 }}</td>
          <td>{{ review.title }}</td>
          <td>{{ review.author }}</td>
          <td>{{ getBookById(review.book_id) }}</td>
          <td class="d-flex justify-content-center" style="gap: 10px">
            <button class="btn btn-primary" @click="editReview(review._id)">
              <font-awesome-icon :icon="['fas', 'edit']" />
            </button>
            <button class="btn btn-danger" @click="deleteReview(review._id)">
              <font-awesome-icon :icon="['fas', 'trash']" />
            </button>
          </td>
        </tr>
        <tr v-if="reviews.length < 1">
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
        console.log(response.data);
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
            acc[curr._id] = curr.title;
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
    deleteReview(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this review!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          BaseAPI.delete(`/api/reviews/${id}`)
            .then((response) => {
              this.reviews = this.reviews.filter((review) => review._id !== id);
              Swal.fire("Deleted!", "The review has been deleted.", "success");
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    },
    editReview(id) {
      this.$router.push({ name: "EditReview", params: { id: id } });
    },
  },
};
</script>
