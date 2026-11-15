(function(){
  var forms=document.querySelectorAll('form.nl-form');
  forms.forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var input=f.querySelector('input[name=EMAIL]'),btn=f.querySelector('button'),msg=f.querySelector('.nl-msg');
      var email=(input.value||'').trim();
      msg.className='nl-msg';
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){msg.textContent='Escribe un email válido.';msg.classList.add('err');input.focus();return;}
      btn.disabled=true;var txt=btn.textContent;btn.textContent='Enviando…';
      var fd=new FormData(f);fd.set('EMAIL',email);
      fetch(f.action,{method:'POST',body:fd}).then(function(r){return r.json().catch(function(){return {success:r.ok};});}).then(function(d){
        if(d&&d.success){f.classList.add('nl-done');msg.textContent='¡Dentro! Ya estás en la lista. Revisa tu correo en los próximos días.';msg.classList.add('ok');
          try{if(window.gtag)gtag('event','sign_up',{method:'newsletter'});}catch(_){}}
        else{var er=(d&&d.errors&&(d.errors.EMAIL||d.errors.global))||'No se ha podido completar. Inténtalo de nuevo.';msg.textContent=er;msg.classList.add('err');}
      }).catch(function(){f.submit();}).finally(function(){btn.disabled=false;btn.textContent=txt;});
    });
  });
})();