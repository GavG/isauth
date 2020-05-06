function defineIsAuth(user, newOptions = {}){
    let options = {
        texts: {
            placeholder:"Type Your Password",
            wrong:"Wrong Password",
            error:"Error",
            button:"Login"
        },
        loginField: 'email'
    };
    $.extend(options, newOptions);
    let object={
        posterror:function(){
            Swal.fire({
                title:options.texts.error,
                icon:"error"
            });
        },
        object:this,
        csrf:null,
        isAuth:function(callback){
            $.get("/isAuth").done(function (data) {
                if(data.csrf!==object.csrf) object.update_csrf(data.csrf);
                if (data.logged) {
                    if (callback) callback();
                }else{
                    object.askPassword(callback);
                }
            }).fail(function () {
                object.posterror();
            });
        },
        askPassword:function(callback){
            Swal.fire({
                title: user.name,
                icon:user.photo,
                input: 'password',
                inputPlaceholder: options.texts.placeholder,
                confirmButtonText: options.texts.button,
            })
                .then(password => {
                    if(password){
                        $.post("/ajaxlogin",
                            {
                                username:user[options.loginField],
                                password: password.value,
                                loginField: options.loginField
                            }
                        ).done(data=> {
                            if(data.logged){
                                Swal.stopLoading();
                                Swal.close();
                                if (callback) callback();
                            }else{
                                Swal.fire({
                                    title:options.texts.wrong,
                                    icon:"warning",
                                    timer: 1000,
                                });
                            }
                        }).fail(function () {
                            object.posterror();
                        });
                    }else{
                        Swal.close();
                    }
                });
        },
        update_csrf:function(newcsrf){
            object.csrf=newcsrf;
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': newcsrf
                }
            });
            $("input[name='_token']").val(newcsrf);
        }
    };
    object.update_csrf($('meta[name="csrf-token"]').attr('content'));
    $("form").submit(function (event) {
        let _this=this;
        event.preventDefault();
        object.isAuth(function () {
            $(_this).unbind('submit').submit();
        });
    });
    return object;
}
