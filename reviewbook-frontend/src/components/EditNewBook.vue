<template>
  <div class="p-5">
    <h1>Cập nhật thông tin sách</h1>
    <form>
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

      <button type="submit" class="btn " @click.prevent="updateBook" style="background-color: darkgoldenrod;" >
        Save
      </button>
    </form>
  </div>
</template>

<style scoped>
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

<script>
import BaseAPI from "@/services/api.service";
import Swal from "sweetalert2";

export default {
  name: "EditBook",
  data() {
    return {
      book: {},
    };
  },
  created() {
    const id = this.$route.params.id;
    BaseAPI.get(`/api/books/${id}`)
      .then((response) => {
        console.log(response.data);
        this.book = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    updateBook() {
      Swal.fire({
        title: "Bạn có chắc chắn?",
        text: "Thông tin sách sẽ được cập nhật mới",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Cập nhật?",
      }).then((result) => {
        if (result.isConfirmed) {
          BaseAPI.put(`/api/books/${this.book._id}`, this.book)
            .then((response) => {
              console.log(response.data);
              Swal.fire("Updated!", "Thông tin sách đã được cập nhật", "success");
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
