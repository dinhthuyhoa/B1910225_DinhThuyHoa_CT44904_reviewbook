<template>
  <div id="home_one" style="min-height: 79vh">
    <!-- <div class="container-fluid"> -->
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../img/banner-first.png" alt="Slide 1" />
        </div>
        <div class="carousel-item">
          <img src="../img/banner-w.png" alt="Slide 2" />
        </div>
        <div class="carousel-item">
          <img src="../img/banner.png" alt="Slide 3" />
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#myCarousel"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#myCarousel"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>

    <div class="some-review">
      <div class="title-some-review">
        <h2>Welcome To Les Moments Sereins</h2>
        <p>Here will display some featured book review articles!</p>
      </div>
    </div>

    <div id="bookList">
      <div class="book-card" v-for="(book, index) in books" :key="index">
        <img :src="book.image" alt="Book Cover" />
        <h3 class="text-dark">{{ book.title }}</h3>
        <p class="text-dark">{{ book.author }}</p>
      </div>
    </div>

    <!-- </section> -->
  </div>
</template>
<style scoped>
.book-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.book-card {
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  padding: 1rem;
  margin: 1rem;
  background-color: #fff;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  width: 300px;
}

.book-card img {
  max-width: 100%;
}

.book-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.book-card p {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
/* style carousel */
.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}

#myCarousel {
  height: 100vh;
}

.carousel-item {
  height: 100%;
}

.carousel-item > img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.some-review {
  margin-top: 35px;
  padding: 20px;
  font-family: "Courier New", Courier, monospace;
}

.title-some-review {
  text-align: center;
  margin-bottom: 30px;
}

.title-some-review h2 {
  font-weight: bold;
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.title-some-review p {
  font-size: 1.2rem;
}

#bookList {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.book-card {
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  padding: 1rem;
  margin: 1rem;
  background-color: #fff;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.book-card img {
  max-width: 100%;
}

.book-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.book-card p {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
</style>
<style scoped>
#myCarousel {
  height: 100vh;
}

.carousel-item {
  height: 100%;
}

.carousel-item > img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}
.some-review {
  margin-top: 35px;
  padding: 20px;
  font-family: "Courier New", Courier, monospace;
}
h2 {
  font-weight: bold;
}
/* style carousel */
.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}
</style>

<script>
import BaseAPI from "@/services/api.service";

export default {
  components: {},
  data() {
    return {
      books: [],
    };
  },
  mounted() {
    BaseAPI.get("/api/books")
      .then((response) => {
        console.log(response.data);
        this.books = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>
