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

    <div>
      <Carousel :itemsToShow="3.95" :wrapAround="true" :transition="500">
        <Slide v-for="(slide, index) in slides" :key="index">
          <div class="carousel__item">
            <img src="{{ slide.src }}" alt="" />
          </div>
        </Slide>
      </Carousel>
    </div>

    <!-- </section> -->
  </div>
</template>

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
import $ from "jQuery";
import { Carousel, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

export default {
  methods: {},
  mounted() {
    $(document).ready(function () {
      $("#myCarousel").carousel();
    });
  },
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  data() {
    return {
      slides: [
        { src: "../img/banner.png", name: "Ple" },
        { src: "../img/banner.png", name: "Hoa" },
        { src: "../img/banner.png", name: "Yeah" },
      ],
    };
  },
};
</script>
