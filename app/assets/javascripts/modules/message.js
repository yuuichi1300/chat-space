$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="main_chat__box" data-message-id=${message.id}>
          <div class="main_messages">
            <div class="main_messages__name">
              ${message.user_name}
            </div>
            <div class="main_messages__time">
              ${message.created_at}
            </div>
          </div>
          <div class="coments">
            <p class="coments__rial">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="main_chat__box" data-message-id=${message.id}>
        <div class="main_messages">
          <div class="main_messages__name">
            ${message.user_name}
          </div>
          <div class="main_messages__time">
            ${message.created_at}
          </div>
        </div>
        <div class="coments">
          <p class="coments__rial">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main_chat').append(html);      
      $('form')[0].reset();
      $('.main_chat').animate({ scrollTop: $('.main_chat')[0].scrollHeight});
      $('.send').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.send').prop("disabled", false);
    });
  });
});