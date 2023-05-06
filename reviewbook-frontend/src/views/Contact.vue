
<template>
  <div class="container-fluid">
    <h1>Liên hệ</h1>
    <div class="row">

      <div class="col-md-6 p-0">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d22547.15215165507!2d105.76695219429408!3d10.044287089115482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1669019328657!5m2!1svi!2s"
          width="95%"
          height="95%"
          style="border: 0"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        >
        </iframe>
      </div>
      <div class="col-md-6 bg-light p-5" style="height: 81%;">
        <h1 class="text-center mb-4">Contact us</h1>
        <form>
          <div class="mb-3">
            <label for="name" class="form-label">Họ và tên</label>
            <input
              type="text"
              class="form-control"
              id="name"
              name="name"
              required
            />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              required
            />
          </div>
          <div class="mb-3">
            <label for="message" class="form-label">Nội dung</label>
            <textarea
              class="form-control"
              id="message"
              name="message"
              rows="5"
              required
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="font-weight: bold;">Gửi</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

  .container-fluid {
    padding: 0 40px;
    height: 100vh;
    font-family: "Courier New", Courier, monospace;
    margin-top: 10px;
    /* background-color: rgb(214, 180, 93); */
  }

  .row {
    height: 100%;
  }

  .col-md-6 {
    height: 85%;
    overflow: hidden;

  }

  .bg-light {
    background-color: #f5f5f5;
  }

  .form-label {
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }

  .form-control {
    height: 50px;
    border: 2px solid #ccc;
    border-radius: 5px;
    font-size: 18px;
    padding: 10px;
    margin-bottom: 20px;
  }

  .btn-primary {
    background-color: darkgoldenrod;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 18px;
    color: #fff;
    transition: all 0.3s ease;
  }

  .btn-primary:hover {
    background-color: rgb(134, 98, 8);
  }


.btn-primary {
  font-size: 16px;
  padding: 8px 15px;
}

.container {
  padding: 15px;
}

h1 {
  text-align: center;
}
</style>
