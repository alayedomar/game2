if (localStorage.qes === undefined) {
  localStorage.setItem("qes", "");
}
let btn = document.querySelector("button:not(.push)");
let cont = document.querySelector(".container");
let colorArray = ["#00d900", "#ffa500", "#0093f3", "#5d5d5d"];
let x = 1;
//
let a1 = [];
let a2 = [];
let a3 = [];
let a4 = [];
//
let A = [a1, a2, a3, a4];
btn.onclick = () => {
  let teams = document.querySelector(`input[placeholder="عدد الفرق"]`).value;
  let in1 = document.querySelector(`input[placeholder="سهل"]`).value;
  let in2 = document.querySelector(`input[placeholder="متوسط"]`).value;
  let in3 = document.querySelector(`input[placeholder="صعب"]`).value;
  document.querySelector(".start").remove();
  for (let i = 0; i < in1; i++) {
    cont.innerHTML += `<span  data-qes="E-" data-time="0" data-ans="تجربة الإجابة"><span> تجربة السؤال</span><span>سهل</span></span>`;
  }
  for (let i = 0; i < in2; i++) {
    cont.innerHTML += `<span  data-qes="M-" data-time="0" data-ans="تجربة الإجابة"><span> تجربة السؤال</span><span>متوسط</span></span>`;
  }
  for (let i = 0; i < in3; i++) {
    cont.innerHTML += `<span  data-qes="H-" data-time="0" data-ans="تجربة الإجابة"><span> تجربة السؤال</span><span>صعب</span></span>`;
  }
  for (let i = 0; i < teams; i++) {
    let color = `rgb( ${Math.floor(Math.random() * 255)} , ${Math.floor(
      Math.random() * 255
    )} , ${Math.floor(Math.random() * 255)} )`;
    if (colorArray.length > 0) {
      color = colorArray.shift();
    }
    document.querySelector(
      "header"
    ).innerHTML += `<span data-n="${i}" data-c="0"; style="background:${color};"></span>`;
  }
  document.querySelectorAll(".container > span").forEach((el) => {
    el.onclick = () => {
      ch(el);
    };
  });
  // Add Active To First Team
  document.querySelector("header > span").classList.add("active");
  startQes();
};
function ch(el) {
  let elBackground = getComputedStyle(
    el.querySelectorAll("span")[1]
  ).backgroundColor;
  if (elBackground === "rgb(255, 255, 255)" && el.className !== "ACTIVE") {
    if (document.querySelector(".container > span.ACTIVE") === null) {
      // check TS of the card
      let TScard = el.attributes["data-qes"].value;
      let arrIndex = +document.querySelector("header > span.active").attributes[
        "data-n"
      ].value;
      console.log(TScard.split("-")[1]);
      TScard = TScard.split("-")[1];
      console.log(A[arrIndex].indexOf(TScard));
      if (true) {
        //////////////
        A[arrIndex].push(TScard);
        console.log(A[arrIndex]);
        el.classList.add("ACTIVE");
        document.querySelector("timer").classList.add("active");
        if (el.attributes["data-time"].value !== "0") {
          t = +el.attributes["data-time"].value;
        } else {
          t = 30;
        }
        timer(t || 30, el);
        ///////////////
      } else {
        document.querySelector("body").classList.add("error");
        setTimeout(() => {
          document.querySelector("body").classList.remove("error");
        }, 500);
      }
      /////////////////////////////////////////////

      /////////////////////////////////////////////
    }
  }
}
let count;
function timer(sec, el) {
  let timer = document.querySelector("timer");
  timer.style.color = "black";
  document.querySelector("footer").classList.add("active");
  timer.innerHTML = sec;
  count = setInterval(() => {
    if (sec <= 5) {
      timer.style.color = "red";
    }
    timer.innerHTML = sec--;
    if (sec <= -1) {
      timer.innerHTML = "انتهى الوقت";
      clearInterval(count);
    }
  }, 1000);
}
function nextTeam() {
  let spans = document.querySelectorAll("header > span");
  let ele = document.querySelector("header > span.active");
  let order = +ele.attributes["data-n"].value;
  if (order >= spans.length - 1) {
    order = -1;
  }
  ele.classList.remove("active");
  let nextEle = document.querySelector(
    `header > span[data-n = "${order + 1}"]`
  );
  nextEle.classList.add("active");
}

function end(el) {
  clearInterval(count);
  document.querySelector("timer").classList.remove("active");
  el.querySelector("span:nth-of-type(2)").style.background = getComputedStyle(
    document.querySelector("header > span.active")
  ).background;
  el.classList.remove("ACTIVE");
  nextTeam();
  document.querySelector("footer").classList.remove("active");
}
document.querySelector("#next").onclick = () => {
  end(document.querySelector(".ACTIVE"));
};

// Full Screen
let elem = document.querySelector("html");
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}
window.onkeyup = (e) => {
  if (e.key === "f") {
    openFullscreen();
  }
};
//
function startQes() {
  ques = localStorage.qes.split("|||");
  console.log(ques);
  let easy = [];
  let med = [];
  let hard = [];
  document
    .querySelectorAll(`.container > span[data-qes="E-"]`)
    .forEach((el) => {
      easy.push(el);
    });
  document
    .querySelectorAll(`.container > span[data-qes="M-"]`)
    .forEach((el) => {
      med.push(el);
    });
  document
    .querySelectorAll(`.container > span[data-qes="H-"]`)
    .forEach((el) => {
      hard.push(el);
    });
  // console.log(easy);
  // console.log(med);
  // console.log(hard);
  for (let i = 0; i < ques.length; i++) {
    if(ques[i] === ""){
      continue;
    }
    let array = ques[i].trim().split("$$$");
    let ts = array[0];
    let q = array[1];
    let ans = array[2];
    let time = array[3];
    let img = array[4];
    // console.log(ts.startsWith("M-"));
    // console.log(q);
    // console.log(ans);
    if (ts.startsWith("E-")) {
      let el = easy.shift();
      el.querySelector("span:nth-of-type(1)").innerHTML = q;
      el.setAttribute("data-ans", ans);
      el.setAttribute("data-qes", ts);
      el.setAttribute("data-time", time);
      if (img !== undefined) {
        el.querySelectorAll(
          "span"
        )[0].style.cssText = `background-image:url('${img}'); padding:0; align-items:flex-start;`;
      }
    }
    if (ts.startsWith("M-")) {
      let el = med.shift();
      el.querySelector("span:nth-of-type(1)").innerHTML = q;
      el.setAttribute("data-ans", ans);
      el.setAttribute("data-qes", ts);
      el.setAttribute("data-time", time);
      if (img !== undefined) {
        el.querySelectorAll(
          "span"
        )[0].style.cssText = `background-image:url('${img}'); padding:0; align-items:flex-start;`;
      }
    }
    if (ts.startsWith("H-")) {
      let el = hard.shift();
      el.querySelector("span:nth-of-type(1)").innerHTML = q;
      el.setAttribute("data-ans", ans);
      el.setAttribute("data-qes", ts);
      el.setAttribute("data-time", time);
      if (img !== undefined) {
        el.querySelectorAll(
          "span"
        )[0].style.cssText = `background-image:url('${img}'); padding:0; align-items:flex-start;`;
      }
    }
  }
}
document.querySelector("#showAns").onclick = () => {
  showAns();
};
function showAns() {
  clearInterval(count);
  let card = document.querySelector(".ACTIVE");
  let ans = card.attributes["data-ans"];
  card.querySelector("span:nth-of-type(1)").innerHTML = ans.value;
  card.querySelector("span:nth-of-type(1)").style.color = "green";
}
//
window.onkeyup = (e) => {
  console.log(e.key);
  if (e.key === "1") {
    document.querySelector("answer.correct").classList.add("active");
    setTimeout(() => {
      document.querySelector("answer.correct").classList.remove("active");
    }, 2000);
  } else if (e.key === "0") {
    document.querySelector("answer.wrong").classList.add("active");
    setTimeout(() => {
      document.querySelector("answer.wrong").classList.remove("active");
    }, 2000);
  }
};
document.querySelector("svg").onclick = () => {
  openFullscreen();
};
let ques = [];
document.querySelector("button.push").onclick = () => {
  let a = document.querySelector("select").value;
  let b = document.querySelectorAll("textarea")[0].value;
  let c = document.querySelectorAll("textarea")[1].value;
  let d = document.querySelectorAll("textarea")[2].value;
  let e = document.querySelectorAll("textarea")[3].value;
  // let d = document.querySelectorAll("textarea")[4].value;
  ques.push(`${a}$$$${b}$$$${c}$$$${d}`);
  document.querySelectorAll("textarea")[0].value = "";
  document.querySelectorAll("textarea")[1].value = "";
  document.querySelectorAll("textarea")[2].value = "";
  document.querySelectorAll("textarea")[3].value = "";
  localStorage.qes += `${a}$$$${b}$$$${c}$$$${d}|||`;
};
document.querySelector(".add").onclick = () => {
  document.querySelector(".add-qes").classList.add("active");
};
document.querySelector(".add-qes > span").onclick = () => {
  document.querySelector(".add-qes").classList.remove("active");
};
