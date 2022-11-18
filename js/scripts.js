$(document).ready(function(){
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

