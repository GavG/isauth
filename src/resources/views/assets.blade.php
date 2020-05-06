@auth
    <script src="/assets/gavg/isAuth/isAuth.js"></script>
    <script>
        window.addEventListener('load', function(){
            window.AuthCheck = defineIsAuth({
                    name:"{{$user->name}}",
                    email:"{{$user->email}}",
                }, @json(config('isAuth.options')));
        })
    </script>
@endauth
