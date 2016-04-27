@extends('extends/auth')

@section('head')
<style>
	.page-login{
		background: url(../images/login/HomeBG.jpg) fixed no-repeat; 
		background-size:cover;
	}
	.content-login{
		width:300px; height:270px; padding:20px; margin:0 auto; background:white; border-radius:10px; position:absolute; top:100px ;left:0;right:0;margin:0 auto;
	}
	.w-btn-login{
		width:100%;
	}
	.full-left-remember{
		margin-left:20px;
	}
	.page-login .logo{
		margin-bottom:30px;
	}
	.page-login input.form-control{
		padding:20px 10px;
		margin-bottom:10px;
	}
	
</style>
@stop

@section('js')
@stop

@section('content')
<div class="content-login">
{{ Form::open(array('url' => 'login', 'method' => 'POST', 'class' => 'form-signin')) }}
    <div class="logo text-center">
        <a href="#"><img src="{{ asset('images/logo.png') }}"></a>
    </div>
    <div class="login-wrap">
        {{ Form::text('username', Input::old('username'), array('placeholder'=>'Username', 'class'=>'form-control', 'autofocus'=>'')) }}
        {{ Form::password('password', array('placeholder'=>'Password', 'class'=>'form-control')) }}

        <button class="w-btn-login btn-lg btn-primary" type="submit" title="Log in">
            Log In
        </button>
        <div class="checkbox">
            <span class="full-left-remember">
            	<input type="checkbox" value="remember-me">
            	 Remember me
            </span>
            <span class="pull-right">
                <a href="#"> Forgot Password?</a>
            </span>
        </div>

    </div>
{{ Form::close() }}
</div>
@stop
