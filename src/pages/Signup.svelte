<form action="/signup" method="post" id="signup-form">
  <!--서버쪽으로 보낼 id값-->
  <div>회원가입</div>
  <div>
    <label for="id">아이디</label>
    <input type="text" id="id" name="id" requied />
  </div>
  <div>
    <label for="password">패스워드</label>
    <input type="password" id="password" name="password" requied />
  </div>
  <div>
    <label for="password2">패스워드 확인</label>
    <input type="password" id="password2" name="password2" requied />
  </div>
  <div>
    <label for="name">이름</label>
    <input type="text" id="name" name="name" requied />
  </div>
  <div>
    <label for="email">이메일</label>
    <input type="email" id="email" name="email" requied />
  </div>
  <div>
    <button type="submit">회원 가입하기</button>
  </div>
  <div id="info"></div>
</form>
