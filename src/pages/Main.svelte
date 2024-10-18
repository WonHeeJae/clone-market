<script>
  import { getDatabase, ref, onValue } from "firebase/database";
  import Nav from "../components/Nav.svelte";
  import { onMount } from "svelte";

  let hour = new Date().getHours();
  let min = new Date().getMinutes();

  $: items = [];
  const calcTime = (timestamp) => {
    //한국시간 UTC+9
    const curTime = new Date().getTime() - 9 * 60 * 60 * 1000; //받아온 시간에서 9시간을 빼줘서 형식 맞춰줌
    const time = new Date(curTime - timestamp);
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();

    if (hour > 0) {
      return `${hour}시간 전`;
    } else if (minute > 0) {
      return `${minute}분 전`;
    } else if (second > 0) {
      return `${second}초 전`;
    } else {
      return "방금 전";
    }
  };

  const db = getDatabase();
  const itemsRef = ref(db, "items/");

  onMount(() => {
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      items = Object.values(data).reverse();
    });
  });
</script>

<header>
  <div class="info-bar">
    <div class="info-bar__time">{hour}:{min}</div>
    <div class="info-bar__icons">
      <img src="assets\chart-bar.svg" alt="chart-bar" />
      <img src="assets\Wi-fi.svg" alt="Wi-Fi" />
      <img src="assets\battery.svg" alt="battery" />
    </div>
  </div>

  <div class="menu-bar">
    <div class="menu-bar__location">
      <div>역삼1동</div>
      <div class="menu-bar__location-icon">
        <img src="assets\arrow-down.svg" alt="arrow-down" />
      </div>
    </div>

    <div class="menu-bar__icons">
      <img src="assets\search.svg" alt="search" />
      <img src="assets\bar3.svg" alt="bar3" />
      <img src="assets\alert.svg" alt="alert" />
    </div>
  </div>
</header>

<main>
  {#each items as item}
    <div class="item-list">
      <div class="item-list__img">
        <img alt={item.title} src={item.imgUrl} />
      </div>
      <div class="item-list__info">
        <div class="item-list__info-title">{item.title}</div>
        <div class="item-list__info-meta">
          {item.place}
          {calcTime(item.insertAt)}
        </div>
        <div class="item-list__info-price">{item.price}</div>
        <div class="item-list__info-description">{item.description}</div>
      </div>
    </div>
  {/each}
  <a class="write-btn" href="#/write">+ 글쓰기</a>
</main>

<!-- svelte-ignore missing-declaration -->
<Nav location="home" />

<div class="media-info-msg">화면 사이즈를 줄여주세요.</div>

<style>
  .info-bar__time {
    color: blue;
  }
</style>
