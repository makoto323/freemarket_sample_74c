$(function(){
  const buildFileField = (index)=> {
    if (fileIndex.length != 0) {
      const html = `<div class="js-file_group" data-index="${index}" >
                      <input class="js-file" type="file"
                      name="item[images_attributes][${index}][image]"
                      id="item_images_attributes_${index}_image">
                    </div>`;
      return html;
    } else {
      return;
    }
  }

  const buildImg = (index, url)=> {
    const html = `<div class="previews__image">
                    <img class="previews__image__src" data-index="${index}" src="${url}" width="120px" height="120px">
                    <div class="remove-btn">削除</div>
                  </div>`;
    return html;
  }

  const buildPreviewSecond = ()=> {
    const html = `<div class="new-wrapper__main__image-box__image-label__image-field" id="image-field-second">
                    <i class="fas fa-camera"></i>
                    <div class="new-wrapper__main__imagde-box__image-label__image-field__text">
                      クリックしてファイルをアップロード
                    </div>
                  </div>`;
    return html;
  }

  const fileIndex = [0,1,2,3,4,5,6,7,8,9];
  if ($('.previews__image').length <= $('.js-file').length-2) {
    $('.js-file_group').remove();
  }
  lastIndex = $('.js-file_group:last').data('index');
  fileIndex.splice(0, lastIndex);

  $('.hidden-destroy').hide();

  if ($('.js-file').length == 0  && ($('.previews__image').length == 0)) {
    $("#image-label").attr("for", `item_images_attributes_${fileIndex[0]}_image`);
    $('.new-wrapper__main__image-box').append(buildFileField(fileIndex[0]));
  };

  if ($('.previews__image').length != 0) {
    $("#image-label").attr("for", `image`);
    if ($('.previews__image').length < 5) {
      $(".new-wrapper__main__image-box__image-label__image-field").css("width", 650-($('.previews__image').length)*130);
    } else {
      $(".new-wrapper__main__image-box__image-label__image-field").css("width", 650-($('.previews__image').length-5)*130);
    }
  }

  $('.new-wrapper__main__image-box').on('change', '.js-file', function(e) {
    const targetIndex = $(this).parent().data('index');
    const file = e.target.files[0];
    const blobUrl = window.URL.createObjectURL(file);

    if (img = $(`img[data-index="${targetIndex}"]`)[0]) {
      img.setAttribute('src', blobUrl);
    } else {
      $('.previews').append(buildImg(targetIndex, blobUrl));
      fileIndex.shift();
      $('#image-label').append(buildFileField(fileIndex[0]));
      $("#image-label").attr("for",`item_images_attributes_${fileIndex[0]}_image`);
      if($('.previews__image').length < 5) {
        $("#image-field-second").remove();
        $(".new-wrapper__main__image-box__image-label__image-field").css("display", "flex");
        $(".new-wrapper__main__image-box__image-label__image-field").css("width", 650-($('.previews__image').length)*130);
      } else if($('.previews__image').length == 5) {
        $(".new-wrapper__main__image-box__image-label__image-field").css("display", "none");
        $("#image-label").append(buildPreviewSecond);
        $(".previews").attr("class", "preview-first");
        $(".preview-first").after(`<div class="previews"></div>`);
      } else if ($('.previews__image').length == 10) {
        $('#image-field-second').css("display","none");
      } else {
        $("#image-field-second").css("width", 650-($('.previews__image').length-5)*130);
      }
      $("#image-field-second").css("width",650-($('.previews__image').length-5)*130);
    }
  });

  $('.new-wrapper__main__image-box').on('click', '.remove-btn', function() {
    const targetIndex = $(this).prev().data('index');
    const hiddenCheck = $(`input[data-index="${targetIndex}"].hidden-destroy`);
    if (hiddenCheck) hiddenCheck.prop('checked', true);
    fileIndex.push(targetIndex);
    if($(this).parent().parent().attr("class") == "preview-first") {
      $(".previews .previews__image:first").appendTo(".preview-first");
    }
    $(`#item_images_attributes_${targetIndex}_image`).parent().remove();
    $(this).parent().remove();

    if($('.previews__image').length < 5) {
      $(".new-wrapper__main__image-box__image-label__image-field").css("width", 650-($('.previews__image').length)*130);
    } else if($('.previews__image').length == 5) {
      $("#image-field-second").remove();
      $('.new-wrapper__main__image-box__image-label__image-field').css("width", 650);
      $(".previews").remove();
      $(".preview-first").attr("class", "previews");
      $(".new-wrapper__main__image-box__image-label__image-field").css("display", "flex");
    } else if($('.previews__image').length == 9) {
      $("#image-field-second").css("display", "flex");
      $("#image-field-second").css("width", 650-($('.previews__image').length-5)*130);
    } else {
      $("#image-field-second").css("width", 650-($('.previews__image').length-5)*130);
    }
  });
});