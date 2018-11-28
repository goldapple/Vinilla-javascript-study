const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li"); //리스트 요소 생성
  const delBtn = document.createElement("button"); //버튼 요소 생성
  const newId = toDos.length + 1; // 길이를 통한 id값 부여
  const span = document.createElement("span"); //span 요소 부여
  delBtn.innerText = "X"; //안에 글씨를 X로 줄거에요
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text; //스팸에 글씨를 넣을꺼에요
  li.appendChild(span); //리스트요소안에 span이라는 요소를 넣을거에요 prepend가 아닌 이유는 뒤에 붙어야 하기 때문이에오
  li.appendChild(delBtn); //리스트요소안에 버튼요소를 넣을거에요
  li.id = newId; //리스트에 id값을 부여할 거에요.
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(toDo => {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
