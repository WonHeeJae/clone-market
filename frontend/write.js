const handleSubmitForm = async (event) => {
  event.preventDefault();
  const body = new FormData(form);
  body.append("insertAt", new Date().getTime()); // form 형식으로 보낼때는 시간이 세계시간 기준인 UTC 시간으로 보내짐

  try {
    const res = await fetch("/items", {
      method: "POST",
      //body: new FormData(form), //폼형식으로 데이터 보냄
      body: body, //폼형식으로 데이터 보냄
    });
    const data = await res.json();
    console.log(data);
    if (data === "200") {
      window.location.pathname = "/";
    }
  } catch (e) {
    console.error(e);
  }
};
const form = document.getElementById("write-form");
form.addEventListener("submit", handleSubmitForm);
