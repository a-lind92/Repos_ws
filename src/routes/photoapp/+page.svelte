<script lang="ts">

	import { scale } from "svelte/transition";

  let image = "https://ds055uzetaobb.cloudfront.net/uploads/Jm5EyZc0cU-8-cell.gif"
  let photo =  "https://www.math.union.edu/~dpvc/math/4D/folding/HCube-Folding/HCube-Folding.gif"
  let picture = "https://i.gifer.com/7ulK.gif"


</script>

<!DOCTYPE html>
<html lang="sv">
<head>
  <title>PHOTOAPP</title>
  <style> 
  </style>
</head>
<body>
  <h1>På denna sida finns det fina bilder</h1>
  <div class="photos">
    <div class="image-wrapper">
      <img src={image} alt="Flexbox egenskaper">
    </div>
    <div class="image-wrapper">
      <img src={photo} alt="flexbox egenskaper">
    </div>
    <div class="image-wrapper">
      <img src={picture} alt="flexbox egenskaper">
    </div>
    </div>
  <style>
    .photos{
      display:flex;
      flex-wrap: wrap;
      max-width: 3000vw;
      align-items:center;
      justify-content:center;
      gap: 20px
    }
    .image-wrapper img{ width: 100%; height: 100%; object-fit: cover; border-radius: 10x;}
    .image-wrapper{flex: 0 0 300px; width: 300px; transition: transform 0.3s ease;}
    .image-wrapper:hover { transform: scale(1.05) }
    .image-wrapper:active { transform: scale(0.95);}
  </style>
</body>
</html>
