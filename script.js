// Small script used across pages: current year, form masks and simple validation messaging
return d;
}


function phoneMask(v){
var d = v.replace(/\D/g,'').slice(0,11);
if(d.length<=2) return d;
if(d.length<=6) return '('+d.slice(0,2)+') '+d.slice(2);
if(d.length<=10) return '('+d.slice(0,2)+') '+d.slice(2,6)+'-'+d.slice(6);
return '('+d.slice(0,2)+') '+d.slice(2,7)+'-'+d.slice(7);
}


function cepMask(v){
var d = v.replace(/\D/g,'').slice(0,8);
if(d.length<=5) return d;
return d.slice(0,5)+'-'+d.slice(5);
}


document.addEventListener('DOMContentLoaded', function(){
var cpfEl = document.getElementById('cpf');
var telEl = document.getElementById('telefone');
var cepEl = document.getElementById('cep');
if(cpfEl) setMask(cpfEl, cpfMask);
if(telEl) setMask(telEl, phoneMask);
if(cepEl) setMask(cepEl, cepMask);


// Basic client-side validation UI using native constraint API
var form = document.getElementById('formCadastro');
if(form){
form.addEventListener('submit', function(ev){
if(!form.checkValidity()){
ev.preventDefault();
// find first invalid field and focus
var first = form.querySelector(':invalid');
if(first){
first.focus();
// show simple message using browser's validation bubble
// additionally we can add aria-live message for screen readers
var live = document.getElementById('form-feedback');
if(!live){
live = document.createElement('div');
live.id = 'form-feedback';
live.setAttribute('aria-live','assertive');
live.style.position='absolute';live.style.left='-9999px';
document.body.appendChild(live);
}
live.textContent = first.validationMessage || 'Preencha os campos obrigatórios';
}
} else {
ev.preventDefault();
// for demonstration we show a success message
alert('Cadastro enviado com sucesso (simulação). Verifique o console para os dados.');
var data = new FormData(form);
var obj = {};
data.forEach(function(v,k){
if(obj[k]){
if(Array.isArray(obj[k])) obj[k].push(v); else obj[k]=[obj[k],v];
} else obj[k]=v;
});
console.log('Dados do formulário:', obj);
}
});
}


});


})();
