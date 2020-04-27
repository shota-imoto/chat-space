$(function () {
  // 自動更新
  var reloadMessages = function () {
    var last_message_id = $(".chat-space__message-list__message-box:last").data(
      "message-id"
    );
    $.ajax({
      url: "api/messages",
      type: "get",
      dataType: "json",
      data: { id: last_message_id },
    })
      .done(function (messages) {
        if (messages.length !== 0) {
          var insertHTML = "";
          $.each(messages, function (i, message) {
            insertHTML += buildHTML(message);
          });
          $(".chat-space__message-list").append(insertHTML);
          $(".chat-space__message-list").animate({
            scrollTop: $(".chat-space__message-list")[0].scrollHeight,
          });
        }
      })
      .fail(function () {
        alert("error");
      });
  };

  // インクリメンタルサーチ
  function buildHTML(message) {
    if (message.image) {
      var html = `<div class="chat-space__message-list__message-box" data-message-id=${message.id}>
        <div class="chat-space__message-list__message-box__title">
        <div class="chat-space__message-list__message-box__title--name">
        ${message.user_name}
        </div>
        <div class="chat-space__message-list__message-box__title--created_at">
        ${message.created_at}
        </div>
        </div>
        <div class="chat-space__message-list__message-box__text">
        <p>${message.text}</p>
        <img src= "${message.image}">
        </div>
        </div>`;
    } else {
      var html = `<div class="chat-space__message-list__message-box" data-message-id=${message.id}>
        <div class="chat-space__message-list__message-box__title"><div class="chat-space__message-list__message-box__title--name">
          ${message.user_name}
        </div><div class="chat-space__message-list__message-box__title--created_at">
          ${message.created_at}
          </div>
        </div>
        <div class="chat-space__message-list__message-box__text">
        <p>${message.text}</p>
        </div>
        </div>`;
    }
    return html;
  }

  $("#new_message").on("submit", function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false,
    })
      .done(function (data) {
        var html = buildHTML(data);
        $(".chat-space__message-list").append(html);
        $("form")[0].reset();
        $(".chat-space__message-list").animate({
          scrollTop: $(".chat-space__message-list")[0].scrollHeight,
        });
        $(".chat-space__message-form--send").prop("disabled", false);
      })
      .fail(function () {
        alert("メッセージ送信に失敗しました");
      });
  });

  // 自動更新関数を7秒ごとに呼び出し
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
