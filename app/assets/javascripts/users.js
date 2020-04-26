$(function () {
  function addUser(user) {
    var html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>`;
    $("#user-search-result").append(html);
  }
  function addNoUser() {
    var html = `
      <div class="chat-group-user clearfix">
       <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>`;
    $("#user-search-result").append(html);
  }

  function addMember(id, name) {
    var html = `
            <div class='chat-group-user'>
              <input name='group[user_ids][]' type='hidden' value='${id}'>
              <p class='chat-group-user__name'>${name}</p>
              <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
            </div>
            `;
    $("#chat-group-users").append(html);
  }

  $("#user-search-field").on("keyup", function () {
    var input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      dataType: "json",
      data: { keyword: input },
    })
      .done(function (users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function (user) {
            addUser(user);
          });
        } else if (input.length == 0) {
          return false;
        } else {
          addNoUser();
        }
      })
      .fail(function () {
        // alert("検索エラーが発生しました");
      });
  });

  $("#user-search-result").on(
    "click",
    ".chat-group-user__btn--add",
    function () {
      var user_id = $(this).attr("data-user-id");
      var user_name = $(this).attr("data-user-name");
      addMember(user_id, user_name);

      $(this).parent().remove();
    }
  );

  $("#chat-group-users").on(
    "click",
    ".chat-group-user__btn--remove",
    function () {
      $(this).parent().remove();
    }
  );
});
