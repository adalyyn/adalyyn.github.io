            //유효성검사
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


            //아이디 검사
                //첫글자는 반드시 영소문자로 이루어지고,
                //숫자가 하나이상 포함되어야함.
                //아이디의 길이는 4~12글자사이
            const regExp1 = /^[a-z][a-z\d]{3,11}$/;
            const regExp2 = /[0-9]/;
                if(!regExpTest(regExp1
                        ,userId
                        ,"아이디는 영소문자로 시작하는 4~12글자입니다."))
                    return false;
                if(!regExpTest(regExp2
                            ,userId
                            ,"아이디는 숫자를 하나이상 포함하세요."))
                    return false;



            //비밀번호 검사
                //숫자/문자/ 포함 형태의 8~15자리 이내의 암호 정규식
                //전체길이검사 /^.{8,15}$/
                //숫자하나 반드시 포함 /\d/
                //영문자 반드시 포함 /[a-zA-Z]/

            const regExpArr = [/^.{8,15}$/, /\d/, /[a-zA-Z]/];

            for (let i = 0; i < regExpArr.length; i++) {
                if (
                    !regExpTest(regExpArr[i], pwd,"비밀번호는 8~15자리 숫자/문자를 포함해야합니다.")
                ) {
                    return false;
                }
            };

            //비밀번호일치여부
            if (!isEqualPwd()) {
            return false;
            }
            
            //3.이름검사
            //한글2글자 이상만 허용.
                const regExp3 = /^[가-힣]{2,}$/;
                if (!regExpTest(regExp3, userName, "이름은 한글2글자이상 입력하세요."))
                return false;

            //5.이메일 검사
            // 4글자 이상(\w = [a-zA-Z0-9_], [\w-\.]) @가 나오고
            // 1글자 이상(주소). 글자 가 1~3번 반복됨
                if (
                    !regExpTest(/^[\w]{4,}@[\w]+(\.[\w]+){1,3}$/, email, "이메일 형식에 어긋납니다.")
                )
                return false;

            
            //6. 전화번호 검사
            if(!regExpTest(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/, phone, "핸드폰 번호를 입력해주세요."))    
                return false;
            };




            search.onclick = () => renderMemberbook(); 

            class Memberbook{
                constructor(userId, userName, email, phone, datetime = Date.now()){
                    this.userId = userId;
                    this.userName = userName;
                    this.email = email;
                    this.phone = phone;
                    this.datetime = datetime;
                };
            };

            //방명록 저장하기
            const saveMemberbook = () => {
                const userIdVal = userId.value;
                const userNameVal = userName.value;
                const emailVal = email.value;
                const phoneVal = phone.value;
                const passwordVal = pwd.value;

                //로그인위해서 key,value값 저장
                localStorage.setItem(userIdVal,passwordVal);

                const memberbook = new Memberbook(userIdVal, userNameVal, emailVal, phoneVal);

                const memberbooks = JSON.parse(localStorage.getItem("memberbooks")) || [];
                memberbooks.push(memberbook);

                const data = JSON.stringify(memberbooks);

                localStorage.setItem('memberbooks', data);

                document.memberFrm.reset();

                // renderMemberbook(memberbooks);
            };

            const renderMemberbook = (memberbooks = JSON.parse(localStorage.getItem('memberbooks'))) => {
                if(!memberbooks) return;
                const tbody = document.querySelector("#tb-memberlist tbody");
                tbody.innerHTML = "";
                console.log(tbody);
                memberbooks   
                    .map((memberbook, index) => {
                        const {userId, userName, email, phone, datetime} = memberbook;
                        return `<tr>
                            <td>${index + 1}</td>
                            <td>${userId}</td>
                            <td>${userName}</td>
                            <td>${email}</td>
                            <td>${phone}</td>
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