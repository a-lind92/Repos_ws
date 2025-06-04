import{s as b,n as l}from"../chunks/CMEKqu9_.js";import{S as h,i as g,d as s,a as r,b as d,c,e as p,g as f,f as m,s as y}from"../chunks/TXnZck4V.js";function v(u){let a,o,e,i=`<head><meta charset="UTF-8"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <title>Vanelogg (Habit Tracker)</title> <style>body {
        font-family: sans-serif;
        margin: 20px;
        background: #f9f9f9;
      }

      h1 {
        text-align: center;
      }

      #controls {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 15px;
      }

      #ny-vana::-moz-placeholder {
        color: #000;
      }

      #ny-vana::placeholder {
        color: #000;
      }

      #board {
        overflow-x: auto;
      }

      table {
        border-collapse: collapse;
        width: 100%;
        min-width: 600px;
      }

      th,
      td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
        cursor: pointer;
        width: 100px;
        height: 50px;
        position: relative;
      }

      th.date-col,
      td.date-col {
        cursor: default;
      }

      td input {
        width: 90%;
        box-sizing: border-box;
      }

      .note-btn {
        background: none;
        border: none;
        font-size: 1em;
        cursor: pointer;
      }

      /* Modal styling */
      #note-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: none;
        background: rgba(0, 0, 0, 0.5);
      }

      #note-modal .modal-content {
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        color: #000;
        padding: 20px;
        border-radius: 8px;
        box-sizing: border-box;
        max-width: 800px;
        width: 80vw;
        height: 80vh;
        resize: both;
        overflow: auto;
        cursor: default;
      }

      #note-modal .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        cursor: move;
        -webkit-user-select: none;
           -moz-user-select: none;
                user-select: none;
      }

      #note-modal .modal-header .title {
        margin: 0;
        font-size: 1.1em;
        color: #000;
      }

      #note-modal .modal-header .close-btn {
        background: none;
        border: none;
        font-size: 1.2em;
        cursor: pointer;
        color: #000;
      }

      #note-modal textarea {
        width: 100%;
        height: 80%;
        box-sizing: border-box;
        margin-bottom: 10px;
        color: #000;
        resize: none;
      }

      #note-modal button {
        margin-right: 8px;
        color: #000;
      }</style></head> <body><h1>Vanelogg</h1> <form id="controls" onsubmit="handleAddHabit(); return false;"><input type="text" id="ny-vana" placeholder="Ny vana…" style="color: #000;"/> <button type="submit" id="add-habit">Lägg till vana</button> <button type="button" id="clear-all">Rensa allt</button></form> <div id="board"></div> <div id="note-modal"><div class="modal-content"><div class="modal-header"><h3 class="title" id="note-title">Anteckning</h3> <button class="close-btn" id="close-note">×</button></div> <textarea id="note-text"></textarea> <br/> <button id="save-note">Spara</button></div></div> <script>const DAYS_TO_SHOW = 14;
      const STORAGE_HABITS = "habits";
      const STORAGE_LOG = "habitLog";
      const STORAGE_COLORS = "habitColors";
      const STORAGE_NOTES = "habitNotes";

      let habits = JSON.parse(
        localStorage.getItem(STORAGE_HABITS) || "[]"
      );
      let habitLog = JSON.parse(
        localStorage.getItem(STORAGE_LOG) || "{}"
      );
      let habitColors = JSON.parse(
        localStorage.getItem(STORAGE_COLORS) || "{}"
      );
      let habitNotes = JSON.parse(
        localStorage.getItem(STORAGE_NOTES) || "{}"
      );

      const defaultColors = {
        yes: "#008000",
        no: "#FF0000",
        none: "#fff",
      };

      const weekdayColors = {
        0: "#000000",
        1: "#1C1C1C",
        2: "#383838",
        3: "#555555",
        4: "#717171",
        5: "#8D8D8D",
        6: "#AAAAAA",
      };

      const weekdayNamesSv = [
        "Söndag",
        "Måndag",
        "Tisdag",
        "Onsdag",
        "Torsdag",
        "Fredag",
        "Lördag",
      ];

      const boardDiv = document.getElementById("board");
      const modal = document.getElementById("note-modal");
      const modalContent = document.querySelector(
        ".modal-content"
      );
      const noteTitle = document.getElementById("note-title");
      const noteTextarea = document.getElementById(
        "note-text"
      );
      const saveNoteBtn = document.getElementById(
        "save-note"
      );
      const closeNoteBtn = document.getElementById(
        "close-note"
      );

      let currentNoteDate = null;

      function saveData() {
        localStorage.setItem(
          STORAGE_HABITS,
          JSON.stringify(habits)
        );
        localStorage.setItem(
          STORAGE_LOG,
          JSON.stringify(habitLog)
        );
        localStorage.setItem(
          STORAGE_COLORS,
          JSON.stringify(habitColors)
        );
        localStorage.setItem(
          STORAGE_NOTES,
          JSON.stringify(habitNotes)
        );
      }

      function formatDate(dateStr) {
        const [year, month, day] = dateStr
          .split("-")
          .map(Number);

        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        return \`\${day} \${months[month - 1]} \${year}\`;
      }

      function getDates() {
        const dates = [];
        const today = new Date();
        const allDates = [];

        for (const habit in habitLog) {
          allDates.push(...Object.keys(habitLog[habit]));
        }

        let startDate;

        if (allDates.length) {
          startDate = new Date(
            Math.min(
              ...allDates.map(
                (ds) => new Date(ds).getTime()
              )
            )
          );
        } else {
          startDate = new Date(today);
          startDate.setDate(
            startDate.getDate() - (DAYS_TO_SHOW - 1)
          );
        }

        for (
          let d = new Date(startDate);
          d <= today;
          d.setDate(d.getDate() + 1)
        ) {
          dates.push(d.toISOString().substr(0, 10));
        }

        return dates.reverse();
      }

      function renderBoard() {
        const dates = getDates();
        let html =
          "<table><thead><tr><th></th><th class='date-col'>Datum</th>";

        habits.forEach((habit) => {
          html += \`<th data-habit="\${habit}">\${habit}</th>\`;
        });

        html += "</tr></thead><tbody>";

        dates.forEach((date) => {
          const dayNum = new Date(date).getDay();
          const rowColor = weekdayColors[dayNum];

          html += "<tr>";
          html += \`<td style="background:\${rowColor}">
                    <button class="note-btn" data-date="\${date}">📝</button>
                   </td>\`;

          const weekdaySv =
            weekdayNamesSv[new Date(date).getDay()];

          html += \`<td class="date-col" style="background:\${rowColor}">
                    \${date}<br>
                    <span class="weekday">\${weekdaySv}</span>
                   </td>\`;

          habits.forEach((habit) => {
            const entry = habitLog[habit]?.[date];
            let status = entry || "none";
            let bg;

            if (
              entry &&
              !["yes", "no", "none"].includes(entry)
            ) {
              status = "custom";
              bg = "#87CEEB";
            } else {
              bg =
                habitColors[habit]?.[status] ||
                defaultColors[status];
            }

            html += \`<td 
                       data-habit="\${habit}" 
                       data-date="\${date}" 
                       data-status="\${status}" 
                       style="background:\${bg}">
                       \${entry || ""}
                     </td>\`;
          });

          html += "</tr>";
        });

        html += "</tbody></table>";
        boardDiv.innerHTML = html;

        let clickTimer;

        boardDiv
          .querySelectorAll("td[data-habit]")
          .forEach((cell) => {
            cell.addEventListener("click", (e) => {
              e.preventDefault();
              if (!clickTimer) {
                clickTimer = setTimeout(() => {
                  onCellClick(cell);
                  clickTimer = null;
                }, 300);
              }
            });

            cell.addEventListener("dblclick", (e) => {
              e.preventDefault();
              if (clickTimer) {
                clearTimeout(clickTimer);
                clickTimer = null;
              }
              onCellDblClick(cell);
            });
          });

        boardDiv
          .querySelectorAll(
            "tbody tr td:first-child"
          )
          .forEach((cell) => {
            cell.addEventListener("click", (e) => {
              e.stopPropagation();
              const date = cell.querySelector(
                ".note-btn"
              ).dataset.date;
              currentNoteDate = date;
              noteTitle.textContent = formatDate(
                date
              );
              noteTextarea.value =
                habitNotes[date] || "";
              modal.style.display = "block";
              noteTextarea.focus();
            });
          });
      }

      let isDragging = false;
      let offsetX = 0;
      let offsetY = 0;

      modalContent
        .querySelector(".modal-header")
        .addEventListener("mousedown", (e) => {
          isDragging = true;
          const rect =
            modalContent.getBoundingClientRect();
          offsetX = e.clientX - rect.left;
          offsetY = e.clientY - rect.top;

          document.addEventListener(
            "mousemove",
            onDrag
          );
          document.addEventListener(
            "mouseup",
            stopDrag
          );
        });

      function onDrag(e) {
        if (!isDragging) return;
        modalContent.style.left =
          e.clientX - offsetX + "px";
        modalContent.style.top =
          e.clientY - offsetY + "px";
        modalContent.style.transform = "";
      }

      function stopDrag() {
        isDragging = false;
        document.removeEventListener(
          "mousemove",
          onDrag
        );
        document.removeEventListener(
          "mouseup",
          stopDrag
        );
      }

      saveNoteBtn.addEventListener("click", () => {
        const text = noteTextarea.value.trim();

        if (text === "") {
          delete habitNotes[currentNoteDate];
        } else {
          habitNotes[currentNoteDate] = text;
        }

        saveData();
        modal.style.display = "none";
        renderBoard();
      });

      closeNoteBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });

      function onCellClick(cell) {
        const habit = cell.dataset.habit;
        const date = cell.dataset.date;
        let status =
          cell.dataset.status || "none";

        status =
          status === "none"
            ? "yes"
            : status === "yes"
            ? "no"
            : "none";

        if (!habitLog[habit]) {
          habitLog[habit] = {};
        }

        if (status === "none") {
          delete habitLog[habit][date];
        } else {
          habitLog[habit][date] = status;
        }

        saveData();
        renderBoard();
      }

      function onCellDblClick(cell) {
        const habit = cell.dataset.habit;
        const date = cell.dataset.date;
        const prev =
          habitLog[habit]?.[date] || "";

        const input =
          document.createElement("input");
        input.type = "text";
        input.value = prev;
        input.style.color = "#000";

        input.addEventListener(
          "keydown",
          (ev) => {
            if (ev.key === "Enter") {
              ev.target.blur();
            }
          }
        );

        input.addEventListener("blur", () => {
          const val = input.value.trim();

          if (!habitLog[habit]) {
            habitLog[habit] = {};
          }

          if (val === "") {
            delete habitLog[habit][date];
          } else {
            habitLog[habit][date] = val;
          }

          saveData();
          modal.style.display = "none";
          renderBoard();
        });

        cell.innerHTML = "";
        cell.appendChild(input);
        input.focus();
      }

      function handleAddHabit() {
        const inp = document.getElementById(
          "ny-vana"
        );
        const name = inp.value.trim();

        if (!name || habits.includes(name))
          return;

        habits.push(name);
        habitColors[name] = {
          ...defaultColors,
        };

        saveData();
        inp.value = "";
        renderBoard();
      }

      document
        .getElementById("add-habit")
        .addEventListener(
          "click",
          handleAddHabit
        );

      document
        .getElementById("clear-all")
        .addEventListener("click", () => {
          if (
            !confirm(
              "Vill du verkligen rensa alla vanor och logg?"
            )
          )
            return;

          habits = [];
          habitLog = {};
          habitColors = {};
          habitNotes = {};

          saveData();
          renderBoard();
        });

      renderBoard();<\/script></body>`;return{c(){a=m("!DOCTYPE"),o=y(),e=m("html"),e.innerHTML=i,this.h()},l(t){a=c(t,"!DOCTYPE",{html:!0}),o=p(t),e=c(t,"HTML",{lang:!0,"data-svelte-h":!0}),f(e)!=="svelte-kf3fu5"&&(e.innerHTML=i),this.h()},h(){d(a,"html",""),d(e,"lang","sv")},m(t,n){r(t,a,n),r(t,o,n),r(t,e,n)},p:l,i:l,o:l,d(t){t&&(s(a),s(o),s(e))}}}class E extends h{constructor(a){super(),g(this,a,null,v,b,{})}}export{E as component};
