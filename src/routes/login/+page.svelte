<script>
    // --- STATE ---
    let email = "";
    let password = "";
    let chosenColor = "blue";
    // Reaktiv regel som ser till att all textfärg följer chosenColor
    $: color = chosenColor;

    // --- SIMULERADE KORREKTA INLOGGNINGSUPPGIFTER ---
    const correctEmail = "user@example.com";
    const correctPassword = "password123";

    // --- LOGIK FÖR INLOGGNING ---
    function handleLogin() {
        if (email === correctEmail && password === correctPassword) {
            alert("Inloggning lyckad! Välkommen tillbaka.");
        } else {
            alert("Felaktigt e-postadress eller lösenord.");
        }
    }
</script>

<form on:submit|preventDefault={handleLogin}>
  <div class="container" style="color: {color};">
      <label for="email">E-post:</label>
      <input
        bind:value={email}
        type="email"
        id="email"
        placeholder="user@example.com"
        style="color: {color};"
      />
      <br/>

      <label for="password">Lösenord:</label>
      <input
        bind:value={password}
        type="password"
        id="password"
        placeholder="*******"
        style="color: {color};"
      />
      <br/>

      <label for="coloroption">Välj textfärg:</label>
      <select bind:value={chosenColor} style="color: {color};">
        <option value="blue" style="color: {color};">Blå</option>
        <option value="red" style="color: {color};">Röd</option>
        <option value="yellow" style="color: {color};">Gul</option>
        <option value="green" style="color: {color};">Grön</option>
      </select>
      <br/>

      <input
        type="submit"
        value="Logga in"
        style="color: {color};"
      />
  </div>
</form>

<style>
  .container {
      border: solid 5px rosybrown;
      border-radius: 10px;
      width: 35%;
      /* auto höjd så innehållet styr */
      background-color: #3a2e3b;
      margin: auto;
      padding: 2rem;
      box-sizing: border-box;
  }

  /* Behåll dina bakgrundsfärger på select och knapp som tidigare */
  select {
      background-color: red;
      padding: 0.25rem;
      border-radius: 4px;
      cursor: pointer;
  }

  input[type="submit"] {
    background-color: green;
    padding: 0.75rem 1.5rem;
    border-radius: 80px;
    cursor: pointer;
    margin-top: 1.5rem;
  }
  input[type="submit"]:hover {
    background-color: darkgreen;
  }
  input[type="submit"]:active {
    background-color: black;
  }
</style>
