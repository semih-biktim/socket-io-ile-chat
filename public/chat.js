const socket = io.connect("http://localhost:3000");

const sender = document.querySelector("#sender");
const message = document.querySelector("#message");
const submit = document.querySelector("#submit");
const output = document.querySelector("#output");
const feedback = document.querySelector("#feedback");

submit.onclick = function(){
	if(!message.value || !sender.value) return alert("Lütfen İsmi ve Mesajı boş bırakmayın ! ");
	socket.emit("chat",{
		message:message.value,
		sender:sender.value
	});
};

socket.on("chat",data=>{
	output.innerHTML += `<p><strong>${data.sender} : </strong>${data.message}</p>`;
	message.value = "";
});

message.keypress = function () {
	socket.emit("typing",sender.value);
};

socket.on("typing",data=>{
	feedback.innerHTML = `<p>${data} yazıyor...</p>`
});
