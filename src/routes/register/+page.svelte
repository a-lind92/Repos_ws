<script>
  let color = "black";
  let chosenColor = "blue";
  let name = "";
  let email = "";
  let password = "";

  // NY RAD → gör så att color alltid blir samma som chosenColor
  $: color = chosenColor;

  function handleSubmit() {
      alert(`Välkommen ${name}!
Din e-postadress: ${email}
Ditt lösenord: ${password}
Din favoritfärg: ${chosenColor}`);
  }
</script>

<!-- NY: lägg på on:submit med preventDefault -->
<form on:submit|preventDefault={handleSubmit}>
<div class="container">
    <label for="name">Namn:</label>
    <!-- NY: bind:value för tvåvägsbindning -->
    <input bind:value={name} type="text" id="name" style="color: {color};" placeholder="Sven Svensson">
    <br>

    <label for="email">Mail:</label>
    <!-- NY: bind:value för e-post -->
    <input bind:value={email} 
    type="email" 
    id="email" 
    placeholder="example@gmail.com"
    style="color: {color};">
    <br>

    <label for="password">Password</label>
    <!-- NY: bind:value för lösenord -->
    <input bind:value={password} 
    type="password" 
    id="password" 
    placeholder="Lösenord123"
    style="color: {color};">
    <br>

    <label for="coloroption">Choose Your Color</label>
    <!-- Ändra bindning så att valt värde hamnar i chosenColor -->
    <select bind:value={chosenColor}>
      <option value="blue">Blå</option>
      <option value="red">Röd</option>
      <option value="yellow">Gul</option>
      <option value="green">Grön</option>
    </select>
    <br>

    <input type="submit" value="Yoppppppie (Registrera)" style="color: {color}">
</div>
</form>

<style>
.container{
    border: solid 5px rosybrown;
    border-radius: 10px;
    width: 35%;
    height: 80%;
    background-color: #330936;
    margin: auto;
    min-width: 300px;
    min-height: 500px;
}
select, option {
    color: black;
    background-color: red;
}
input[type="submit"] {
  background-color: green;
  padding: 10px 20px;   
  border-radius: 80px;     
  cursor: pointer;          
  margin-top: 200px;
}

input[type="submit"]:hover {
  background-color: darkgreen; 
}

input[type="submit"]:active {
  background-color: black; 
}
</style>
