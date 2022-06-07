
// 사이드바
// 오픈버튼 클릭했을때
function openNav() {
    document.getElementById("mySidepanel").style.width = "200px";
}
  
// 닫힘버튼 클릭했을때
function closeNav() {
document.getElementById("mySidepanel").style.width = "0";
}


//skill 막대
let i = 0;
let l = 0;
let k = 0;
const move = () => {
  // Java
  if(i == 0){
    i = 1;
    const java = document.getElementById("java");
    let width = 0;
    const id = setInterval(() => {
      if(width >= 40){
        clearInterval(id);
        i = 0;
      } else {
        width++;
        java.style.width = width + "%";
        java.innerHTML = width + "%";
      }                                    
    }, 10);
  }
  //html
  if(l == 0){
    l = 1;
    const html = document.getElementById("html");
    let width = 0;
    const id = setInterval(() => {
      if(width >= 60){
        clearInterval(id);
        l = 0;
      } else {
        width++;
        html.style.width = width + "%";
        html.innerHTML = width + "%";
      }                                    
    }, 10);
  }
  //javascript
  if(k == 0){
    k = 1;
    const javascript = document.getElementById("javascript");
    let width = 0;
    const id = setInterval(() => {
      if(width >= 30){
        clearInterval(id);
        k = 0;
      } else {
        width++;
        javascript.style.width = width + "%";
        javascript.innerHTML = width + "%";
      }                                    
    }, 10);
  }
}
// 깃 위해서 주석추가해봄
//회원가입 유효성검사
//비밀번호 일치여부 검사
function isEqualPwd() {
  if (pwd.value == pwdCheck.value) {
  return true;
  } else {
  alert("비밀번호가 일치하지 않습니다.");
  pwd.select();
  return false;
  }
}
document.querySelector("#pwdCheck").onblur = isEqualPwd;

//테스트
function regExpTest(regExp, el, msg) {
    if (regExp.test(el.value)) return true;
    alert(msg);
    el.value = "";
    el.focus();
    return false;
}

document.memberFrm.onsubmit = function () {
    const userId = document.getElementById("userId");
    const pwd = document.getElementById("pwd");
    const pwdCheck = document.getElementById("pwdCheck");
    const userName = document.getElementById("userName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const movie1 = document.getElementById("movie1");

//아이디 검사:첫글자는 반드시 영소문자로 이루어지고,숫자가 하나이상 포함되어야함.아이디의 길이는 4~12글자사이
const regExp1 = /^[a-z][a-z\d]{3,11}$/;
const regExp2 = /[0-9]/;
    if(!regExpTest(regExp1, userId, "아이디는 영소문자로 시작하는 4~12글자입니다.")) return false;
    if(!regExpTest(regExp2, userId, "아이디는 숫자를 하나이상 포함하세요.")) return false;

//비밀번호 검사 : 숫자/문자포함 형태의 8~15자리 이내의 문자열
const regExpArr = [/^.{8,15}$/, /\d/, /[a-zA-Z]/];
for (let i = 0; i < regExpArr.length; i++) {
    if (!regExpTest(regExpArr[i], pwd,"비밀번호는 8~15자리 숫자/문자를 포함해야합니다.")) return false;
};

//비밀번호일치여부
if (!isEqualPwd()) return false;

//3.이름검사
    const regExp3 = /^[가-힣]{2,}$/;
    if (!regExpTest(regExp3, userName, "이름은 한글2글자이상 입력하세요.")) return false;

//5.이메일 검사
    if (!regExpTest(/^[\w]{4,}@[\w]+(\.[\w]+){1,3}$/, email, "이메일 형식에 어긋납니다.")) return false;

//6. 전화번호 검사
if(!regExpTest(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/, phone, "핸드폰 번호를 입력해주세요.")) return false;
};             


// 회원목록조회
search.onclick = () => renderMemberbook(); 

class Memberbook{
    constructor(userId, userName, email, phone, movie1, datetime = Date.now()){
        this.userId = userId;
        this.userName = userName;
        this.email = email;
        this.phone = phone;
        this.movie1 = movie1;
        this.datetime = datetime;
    };
};

//회원 저장하기
const saveMemberbook = () => {
    const userIdVal = userId.value;
    const userNameVal = userName.value;
    const emailVal = email.value;
    const phoneVal = phone.value;
    const passwordVal = pwd.value;
    const movie1Val = movie1.value;

    //로그인위해서 key,value값 별도로 저장해두기
    localStorage.setItem(userIdVal,passwordVal);
    //memberbook객체 생성
    const memberbook = new Memberbook(userIdVal, userNameVal, emailVal, phoneVal, movie1Val);
    //배열에 저장하기
    const memberbooks = JSON.parse(localStorage.getItem("memberbooks")) || [];
    memberbooks.push(memberbook);
    //Json으로 변환
    const data = JSON.stringify(memberbooks);
    //localStorage에 저장
    localStorage.setItem('memberbooks', data);

    alert("회원가입 완료😆")
    document.memberFrm.reset(); //폼 초기화

};

const renderMemberbook = (memberbooks = JSON.parse(localStorage.getItem('memberbooks'))) => {
    if(!memberbooks) return;
    const tbody = document.querySelector("#tb-memberlist tbody");
    tbody.innerHTML = "";
    console.log(tbody);
    memberbooks   
        .map((memberbook, index) => {
            const {userId, userName, email, phone, movie1, datetime} = memberbook;
            return `<tr>
                <td>${index + 1}</td>
                <td>${userId}</td>
                <td>${userName}</td>
                <td>${email}</td>
                <td>${phone}</td>
                <td>${movie1}</td>
                <td>${datetimeFormatter(datetime)}</td>
                </tr>`;      
        }).forEach((tr) => {
            console.log(tr);
            tbody.innerHTML += tr;
        });
};

const datetimeFormatter = (millis) => {
    const d = new Date(millis);
    const f = (n) => n < 10? '0'+ n : n; 
    const yyyy = d.getFullYear();
    const mm = f(d.getMonth() + 1);
    const dd = f(d.getDay());
    const hh = f(d.getHours());
    const mi = f(d.getMinutes());
    return `${yyyy}/${mm}/${dd}/${hh}:${mi}`;
};


// 로그인
const loginBtn = document.querySelector("#btn_login");

function CheckValue(){
    const keyVal = login_id.value;  //사용자 키 입력값
    const value = localStorage.getItem(keyVal);   //저장된 value
    
    //사용자 비밀번호 입력값과 storage의 value값이 같다면
    if(value == document.querySelector("#login_pwd").value){
        alert('로그인 성공🙂');
        login_id.value = '';
        document.querySelector("#login_pwd").value = '';
    }
    else {
        alert(`${keyVal}님 비밀번호가 일치하지 않습니다😥`);
        login_id.value = '';
        document.querySelector("#login_pwd").value = '';
    }
}

function login(){
    loginBtn.addEventListener("click", CheckValue);
}
