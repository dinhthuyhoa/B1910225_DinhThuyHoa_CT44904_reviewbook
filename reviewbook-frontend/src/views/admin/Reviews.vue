<template>
  <div class="p-5">
    <h1>Quản lý bài review sách</h1>
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
          <td>{{ review.book }}</td>
          <td class="d-flex justify-content-center" style="gap: 10px">
            <button class="btn btn-primary">
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

<script>
import BaseAPI from "@/services/api.service";
import Swal from "sweetalert2";

export default {
  name: "AdminUsers",
  data() {
    return {
      reviews: [],
    };
  },
  mounted() {
    BaseAPI.get("/api/reviews")
      .then((response) => {
        console.log(response.data);
        this.reviews = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    deleteReview(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this user!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          BaseAPI.delete(`/api/reviews/${id}`)
            .then((response) => {
              const index = this.reviews.findIndex(
                (review) => review.id === id
              );
              this.reviews.splice(index, 1);
              Swal.fire("Deleted!", "The user has been deleted.", "success");
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
