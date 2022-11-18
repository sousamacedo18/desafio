$(document).ready(function(){

async function montarCursos()
{
  let _htmldestaque="";
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
           for(var i=0; curso.length<=8;i++){
            if(i<=1){
            _htmldestaque+= "<div class=card-destaque>"
            _htmldestaque+= "<img src=\"./assets/img/mecanico.jpg\">"
            _htmldestaque+=  "<div class=reacao>"
            _htmldestaque+= " <div>"
            _htmldestaque+="<label>Automóveis</label>"
            _htmldestaque+=" </div>"
            _htmldestaque+= "<div>"
            _htmldestaque+= "<i class=bi bi-hand-thumbs-up></i>"
            _htmldestaque+="<label>"+curso[i].like+"</label>"
            _htmldestaque+="<i class=bi bi-hand-thumbs-down></i>"
            _htmldestaque+= "<label>"+curso[i].deslike+"</label>"
            _htmldestaque+= "<i class=bi bi-star></i>"
            _htmldestaque+=  "</div>"
            _htmldestaque+= " </div>"
            _htmldestaque+= "</div>"
            }
            if(i>1 && i<=6){
            }
           }
            $(".destaque").html(_htmldestaque);
      
       });
}
montarCursos();

async function logar(){
   const logado = JSON.parse(sessionStorage.getItem('login')||0);
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
         $("#log-in").html(lista[0].nome)
         sessionStorage.setItem("login",JSON.stringify(data.usuario));
          verSessao();
          
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
$(window).load(function(){
  const usuario=JSON.parse(sessionStorage.getItem('login')||0);
   if(usuario!==0){
      const id= usuario[0].id;
      const nome = usuario[0].nome;
      alert(nome)
      $("#log-in").html("<h6>Usuário: "+nome+"</h6>");
      alert("aqui")
      $("#id").val(id);
   }

});


});

