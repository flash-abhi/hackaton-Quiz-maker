const moonlogo = document.querySelector("#toggle");
const body = document.querySelector("body");
moonlogo.addEventListener("click",(e)=>{
    e.preventDefault();
    body.classList.toggle("toggle");
});

async function generateQuiz(QuestionNumbers,para){
const quiz = document.querySelector(".quiz");
     const data = await fetch("https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer your-hugging-face-token"
  },
  body: JSON.stringify({
    inputs: `from this para "${para}"generate ${QuestionNumbers} questions with 4 options. and after each question give a new line .`,
  })
})
const body = await data.json();
// console.log(body[0].generated_text);
const str =body[0].generated_text;
console.log(str);
const cleaned = str.replace(/^[\s\S]*?(?=What|Which|How|Why|Who)/, '');
    quiz.innerHTML = ' '
    const questionHTML = `<pre>${cleaned}</pre>`;
    quiz.insertAdjacentHTML("beforeend", questionHTML);
    quiz.style.display= "block";
}
const generateButton = document.querySelector("#generate-btn");
const generateSummary = document.querySelector("#generate-summary");
// const questionType = document.querySelector("#questions-type");
const questionsNumbers = document.querySelector("#questions-numbers");
const paragraph = document.querySelector("#paragraph");
generateButton.addEventListener('click',(e)=>{
    e.preventDefault();
    const QuestionNumbers = questionsNumbers.value; 
    const para = paragraph.value;
    console.log(para);
    console.log(QuestionNumbers);
    const quiz = document.querySelector(".quiz");
    quiz.innerHTML = "Please wait";
    quiz.style.display = "block";
    generateQuiz(QuestionNumbers,para);
});
generateSummary.addEventListener("click",(e)=>{
    e.preventDefault();
     const para = paragraph.value;
     const summary = document.querySelector(".summary");
     summary.style.display= "block";
     summary.innerHTML = "Please wait";
     generateSummaryy(para);

})
async function generateSummaryy(paragraph){
    const summary = document.querySelector(".summary");
 const data = await fetch("https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer your-huggingface-token"
  },
  body: JSON.stringify({
    inputs: `from this para "${paragraph}" generate Summary in 500 charaters .~`,
  })
})
const body = await data.json();
// console.log(body[0].generated_text);
const str =body[0].generated_text;
console.log(str);
const start = str.indexOf('.~');
const end = str.lastIndexOf('.');
const notes = str.substring(start+2, end);
console.log(notes);
const summaryHtml = `
<h3>Summary</h3>
<p>${notes}</p>`
summary.innerHTML = ' ';
summary.insertAdjacentHTML("beforeend", summaryHtml);
summary.style.display = "block";
}