/**
 * Created by 84000 on 2018/4/5.
 */
$(function() {
            var data = {
                "defa_link": "http://www.baike.com/wiki/",
                "details_path": "//*[@id='unifyprompt']//p",
                "picture_xpath": "//*[@class='pic-scroller']/div[@class='pic-list']/a/img/@src"

            };
            var x = 0;
            $("span").click(function() {
                $(this).attr({ "class": "white", "style": "z-index:2" }).siblings().attr({ "class": "grey", "style": "z-index:1" });

            });

            $("img").click(function() {
                    if (this.id === "left") {
                        x -= 1;
                        if (x < 0) {
                            x = window.photo_items.length - 1;
                            change_photo(x);
                        } else {
                            change_photo(x);
                        };

                    } else {
                        x += 1;
                        if (x === window.photo_items.length) {
                            x = 0;
                            change_photo(x);
                        } else {
                            change_photo(x);
                        };
                    };
                });

                function be_ready() {
                    if ($("input").val()) {
                        data.link = data.defa_link + $("input").val();
                        data.picture_link = "http://tupian.baike.com/doc/" + $("input").val() + "/tctupian/1/1";
                        go(data);
                    } else {
                        alert("请输入关键字");
                    }

                }

                $("button").click(be_ready);
                $("input").keypress(function(event) {
                    if(event.keyCode === 13){
                        be_ready();
                    }
                });
                function process_data(result) {
                    result = JSON.parse(result);
                    if (result.error_info) {
                        alert("词条未收录");
                    }
                    else
                    {
                        window.photo_items = result.photo;
                        $("#info").text(result.base_info);
                        $("#photo").attr("src", result.photo[0]);
                        $("#data").css("display", "block");
                    };
                };

                function change_photo(p) {
                    $("#photo").fadeOut("slow",function () {
                        $(this).attr("src", window.photo_items[p]).fadeIn("slow");

                    });



                };

                function go(x) {
                    $.ajax({
                        type: "POST",
                        url: "./actor.php",
                        data: x,
                        success: process_data
                    });
                };


            });