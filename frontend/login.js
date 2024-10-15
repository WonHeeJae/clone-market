const form = document.querySelector("#login-form");
//let accessToken = null;
const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const sha256Password = sha256(formData.get("password")); //해시보안처리
  formData.set("password", sha256Password);

  const res = await fetch("/login", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  const accessToken = data.access_token;
  window.localStorage.setItem("token", accessToken); //Local Storage에 저장
  //window.sessionStorage.setItem("token", accessToken); //session Storage에 저장
  alert("로그인이 되었습니다. ");

  window.location.pathname = "/";
  //const infoDiv = document.querySelector("#info");
  //infoDiv.innerText = "로그인 되었습니다.";

  /* ver1
  if (res.status === 200) {
    alert("로그인에 성공했습니다.");
    window.location.pathname = "/";
  } else if (res.status === 401) {
    alert("id혹은 password가 틀렸습니다.");
  }*/

  /*ver2
  // const btn = document.createElement("button");
  // btn.innerText = "상품 가져오기!";
  // btn.addEventListener("click", async () => {
  //   const res = await fetch("/items", {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   });
  //   const data = await res.json();
  //   console.log(data);
  // });
  // infoDiv.appendChild(btn);
  */
};
form.addEventListener("submit", handleSubmit);
