const form = document.querySelector("#signup-form");
const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const sha256Password = sha256(formData.get("password")); //해시보안처리

  formData.set("password", sha256Password);
  console.log(formData.get("password"));
  const res = await fetch("/signup", {
    method: "POST",
    body: formData,
  });
};
form.addEventListener("submit", handleSubmit);
