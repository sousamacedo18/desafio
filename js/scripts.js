$(document).ready(function(){
 
 
   feedbackCurso=async(id)=>{
    const logado = JSON.parse(sessionStorage.getItem('login')||0);
    const url = "http://localhost:5000/feedback";
    const _data={
      idusuario:1,
      idcurso:id,
      feedback:1
    }
  
     const response = await fetch(url,
      {
        method: "POST",
        headers:{
          "Content-type":"application/json",
        },
        body:JSON.stringify(_data)
      }
     )
         .then((response) => response.json())
    
         .then((data) => {
         console.log('Success:', data);
  

  })
}

async function montarCursos()
{
  let _htmldestaque="";
  let _reacaotopo="";
  let _reacaorodape="";

  const url = "http://localhost:5000/curso";
  const response = await fetch(url,
    {
      method: "GET",
      headers:{
        "Content-type":"application/json",
      }
    }
   )
       .then((response) => response.json())
       .then((data) => {
        const curso = data.curso;
           for(var i=0; i<=curso.length;i++){
            if(i>=0 && i<=1){
            _htmldestaque+= "<div class=card-destaque>"
            _htmldestaque+= "<img src=./assets/img/mecanico.jpg>"
            _htmldestaque+=  "<div class=reacao>"
            _htmldestaque+= " <div>"
            _htmldestaque+="<label>Automóveis</label>"
            _htmldestaque+=" </div>"
            _htmldestaque+= "<div>"
            _htmldestaque+= "<i onClick='feedbackCurso("+curso[i].id+")' class='bi bi-hand-thumbs-up'></i>"
            _htmldestaque+="<label id='like"+curso[i].id+"'>"+curso[i].like+"</label>"
            _htmldestaque+="<i class='bi bi-hand-thumbs-down'></i>"
            _htmldestaque+= "<label>"+curso[i].deslike+"</label>"
            _htmldestaque+= "<i class='bi bi-star'></i>"
            _htmldestaque+=  "</div>"
            _htmldestaque+= " </div>"
            _htmldestaque+= "</div>"
            }
            if(i>1 && i<=5){
                   _reacaotopo+="<div class=card>"
                   _reacaotopo+="<img src=./assets/img/mecanico.jpg>"
                   _reacaotopo+="<div class=reacao>"
                   _reacaotopo+="<div>"
                   _reacaotopo+="<label>Automóveis</label>"
                   _reacaotopo+="</div>"
                   _reacaotopo+="<div>"
                   _reacaotopo+="<i onClick='feedbackCurso("+curso[i].id+")' class='bi bi-hand-thumbs-up'></i>"
                   _reacaotopo+= "<label id='like"+curso[i].id+"'>"+curso[i].like+"</label>"
                   _reacaotopo+= "<i class='bi bi-hand-thumbs-down'></i>"
                    _reacaotopo+= "<label>"+curso[i].deslike+"</label>"
                    _reacaotopo+= "<i class='bi bi-star'></i>"
                    _reacaotopo+="</div>"
                    _reacaotopo+="</div></div>"
            }
            if(i>5 && i<=8){
                  _reacaorodape+="<div class=card>"
                  _reacaorodape+="<img src=./assets/img/mecanico.jpg>"
                  _reacaorodape+="<div class=reacao>"
                  _reacaorodape+="<div>"
                  _reacaorodape+="<label>Automóveis</label>"
                  _reacaorodape+="</div>"
                  _reacaorodape+="<div>"
                  _reacaorodape+="<i onClick='feedbackCurso("+curso[i].id+")' class='bi bi-hand-thumbs-up'></i>"
                  _reacaorodape+= "<label id='like"+curso[i].id+"'>"+curso[i].like+"</label>"
                  _reacaorodape+= "<i class='bi bi-hand-thumbs-down'></i>"
                  _reacaorodape+= "<label>"+curso[i].deslike+"</label>"
                  _reacaorodape+= "<i class='bi bi-star'></i>"
                  _reacaorodape+="</div>"
                  _reacaorodape+="</div></div>"             
            }
           }
           $(".destaque").html(_htmldestaque);
           $(".reacao-topo").html(_reacaotopo);
           $(".reacao-rodape").html(_reacaorodape);
      
       });

}
montarCursos();

async function logar(){
   
   const email=document.getElementById("email").value;
   const senha=document.getElementById("senha").value;
  
    const url = "http://localhost:5000/logar";
    const _data={
      email:email,
      senha:senha
    }
  
     const response = await fetch(url,
      {
        method: "POST",
        headers:{
          "Content-type":"application/json",
        },
        body:JSON.stringify(_data)
      }
     )
         .then((response) => response.json())
    
         .then((data) => {
         console.log('Success:', data);
         $("#exampleModal").modal("hide");
         const lista = data.usuario;
         $("#id").val(lista[0].id);
         $("#log-in").html(lista[0].nome)
         sessionStorage.setItem("login",JSON.stringify(lista));
     
          
         })
         .catch((error) => {
         console.error('Error:', error);
         });
}
$('#acesso').click(function(){
  $('#exampleModal').modal('show')
});
$('#btn-logar').click(function(){
  logar();
}) 
// $(window).load(function(){
//   const usuario=JSON.parse(sessionStorage.getItem('login')||0);
//    if(usuario!==0){
//       const id= usuario[0].id;
//       const nome = usuario[0].nome;
//       alert(nome)
//       $("#log-in").html("<h6>Usuário: "+nome+"</h6>");
//       alert("aqui")
//       $("#id").val(id);
//    }

// });


});

