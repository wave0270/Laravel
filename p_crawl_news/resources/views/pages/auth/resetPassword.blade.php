@extends('extends/auth')

@section('head')
<style>
	.page-resetPassword{
		background: url(../images/login/HomeBG.jpg) fixed no-repeat; 
		background-size:cover;
	}
	.content-resetPassword{
		width:300px; height:220px; padding:20px; margin:0 auto; background:white; border-radius:10px; position:absolute; top:100px ;left:0;right:0;margin:0 auto;
	}
	.page-resetPassword .btn-primary{
		width:100%;
	}
	.page-resetPassword .logo{
		margin-bottom:30px;
	}
	.page-resetPassword input.form-control{
		padding:20px 10px;
		margin-bottom:10px;
	}
	
</style>
@stop

@section('js')
@stop

@section('content')
<div class="content-resetPassword">
{{ Form::open(array('url' => 'reqResetPass', 'method' => 'POST', 'class' => 'form-signin')) }}
<div class="logo text-center">
	<a href="#"><img src="{{ asset('images/logo.png') }}"></a>
</div>
<div class="login-wrap">
	<p>
		Enter your e-mail address.
	</p>
	<input type="text" name="email" placeholder="Email" autocomplete="off" class="form-control">

	<button class="btn btn-lg btn-primary" type="submit" title="Log in">
		Reset My Password
	</button>

</div>
{{ Form::close() }}
</div>
@stop
