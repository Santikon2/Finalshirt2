// Updated script
const API_URL = "https://docs.google.com/spreadsheets/d/1SPlE3SpxQwvkurWzwJ45_Nbaw9xgaMPY2zHtlhrvnQc/edit?usp=sharing";

function goNext() {
  let name = document.getElementById('name').value;
  let level = document.getElementById('level').value;

  if (!name) { alert("กรอกชื่อก่อน"); return; }

  sessionStorage.setItem("name", name);
  sessionStorage.setItem("level", level);

  window.location = level + ".html";
}

function submitData() {
  let name = sessionStorage.getItem("name");
  let level = sessionStorage.getItem("level");

  let imgSrc = document.querySelector("img.preview").src;
  let shirt = imgSrc.substring(imgSrc.lastIndexOf('/') + 1).split(".")[0];

  let size = document.getElementById("size").value;
  if (!size) { alert("เลือกไซส์ก่อน"); return; }

  const data = { name, level, shirt, size };

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
  .then(r => r.json())
  .then(r => {
    if (r.status === "success") {
      document.getElementById("popup").style.display="flex";
      setTimeout(()=>{document.getElementById("popup").style.display="none";},1800);
    } else {
      alert("Error: "+r.message);
    }
  })
  .catch(e=>alert("Connection error"));
}
