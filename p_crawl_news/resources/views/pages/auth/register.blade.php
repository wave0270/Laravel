@extends('extends/auth')

@section('head')
<style>
	.page-register{
		/*background: url(../images/login/HomeBG.jpg) fixed no-repeat; 
		background-size:cover;*/
	}
	.content-register{
		background:white; border-radius:10px; position:absolute; top:100px ;left:0;right:0;margin:0 auto;
		border:1px solid #ddd;
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
<div class="content-register container">
{{ Form::open(array('url' => 'registration', 'method' => 'POST', 'class' => 'form-signup')) }}
	<div class="form-signin-heading text-center">
		<h3 class="text-center">Registration</h3>
	</div>
	
	<?php $data = Session::get('data') ?>
	@if(isset($data))
	<div class="signup-wrap">
		<div class="col-sm-12">
			Enter your account details below
		</div>
		<div class="col-sm-6">
			{{ Form::text('username', $data["username"], array('placeholder'=>'Username', 'class'=>'form-control')) }}
		</div>
		<div class="col-sm-6">
			{{ Form::text('email', $data["email"], array('placeholder'=>'Email', 'class'=>'form-control')) }}
		</div>
		<div class="col-sm-6">
			{{ Form::password('password', array('placeholder'=>'Password', 'class'=>'form-control', 'id'=>'password')) }}
		</div>
		<div class="col-sm-6">
			{{ Form::password('repassword', array('placeholder'=>'Re-type Password', 'class'=>'form-control')) }}
		</div>
		<label for="radio-01" class="col-sm-6">
			<input type="radio" checked="" value="male" id="radio-01" name="gender">
			Male </label>
		<label for="radio-02" class="col-sm-6">
			<input type="radio" value="female" id="radio-02" name="gender">
			Female </label>
		<div class="col-sm-12">
			Enter your personal details below
		</div>
		<div class="col-sm-6">
			{{ Form::text('firstname', $data["firstname"], array('placeholder'=>'First Name', 'class'=>'form-control', 'autofocus'=>'')) }}
		</div>
		<div class="col-sm-6">
			{{ Form::text('lastname', $data["lastname"], array('placeholder'=>'Last Name' , 'class'=>'form-control', 'autofocus'=>'')) }}
		</div>
		<div class="col-sm-4">
			{{ Form::text('company', $data["company"], array('placeholder'=>'Company'   , 'class'=>'form-control', 'autofocus'=>'')) }}
		</div>
		<div class="col-sm-4">
			{{ Form::text('address', $data["address"], array('placeholder'=>'Address'   , 'class'=>'form-control', 'autofocus'=>'')) }}
		</div>
		<div class="col-sm-4">
			{{ Form::text('state', $data["state"], array('placeholder'=>'City/Town' , 'class'=>'form-control', 'autofocus'=>'')) }}
		</div>
		<div class="col-sm-12 text-center">
			<input type="submit" class="button success radius" title="Signup now" value="Signup">
		</div>
		<div class="col-sm-12 text-center">
			Already Registered.
			<a href="#"> Login </a>
		</div>
		<div class="col-sm-12 text-center">
			<label class="checkbox">
				<input type="checkbox" value="agree this condition" name="agree">
				I agree to the Terms of Service and Privacy Policy</label>
		</div>
		{{ Form::hidden('route', Route::getCurrentRoute()->getPath()) }}
	</div>
	@else
	<div class="signup-wrap">
		<div class="col-sm-12">
			Enter your account details below
		</div>
		<div class="col-sm-6">
			<input type="text" name="username" placeholder="Username" class="form-control" />
			
		</div>
		<div class="col-sm-6">
			{{ Form::text('email'   , '', array('placeholder'=>'Email'   , 'class'=>'form-control')) }}
		</div>
		<div class="col-sm-6">
			{{ Form::password('password', array('placeholder'=>'Password', 'class'=>'form-control', 'id'=>'password')) }}
		</div>
		<div class="col-sm-6">
			{{ Form::password('repassword', array('placeholder'=>'Re-type Password', 'class'=>'form-control')) }}
		</div>
		<label for="radio-01" class="col-sm-6">
			<input type="radio" checked="" value="male" id="radio-01" name="gender">
			Male </label>
		<label for="radio-02" class="col-sm-6 0">
			<input type="radio" value="female" id="radio-02" name="gender">
			Female </label>
		<div class="col-sm-12">
			Enter your personal details below
		</div>
		<div class="col-sm-6">
			{{ Form::text('firstname', '', array('placeholder'=>'First Name', 'class'=>'form-control', 'autofocus'=>'')) }}
		</div>
		<div class="col-sm-6">
			{{ Form::text('lastname' , '', array('placeholder'=>'Last Name' , 'class'=>'form-control', 'autofocus'=>'')) }}
		</div>
		<div class="col-sm-4">
			{{ Form::text('company'  , '', array('placeholder'=>'Company'   , 'class'=>'form-control', 'autofocus'=>'')) }}
		</div>
		<div class="col-sm-4">
			{{ Form::text('address'  , '', array('placeholder'=>'Address'   , 'class'=>'form-control', 'autofocus'=>'')) }}
		</div>
		<div class="col-sm-4">
			{{ Form::text('state'    , '', array('placeholder'=>'City/Town' , 'class'=>'form-control', 'autofocus'=>'')) }}
		</div>
		<div class="col-sm-12 text-center">
			<input type="submit" class="btn btn-lg btn-primary" title="Signup now" value="Signup">
		</div>
		<div class="col-sm-12 text-center">
			Already Registered.
			<a href="#"> Login </a>
		</div>
		<div class="col-sm-12 text-center">
			<label class="checkbox">
				<input type="checkbox" value="agree this condition" name="agree">
				I agree to the Terms of Service and Privacy Policy</label>
		</div>
		{{ Form::hidden('route', Route::getCurrentRoute()->getPath()) }}
	</div>
	@endif
	{{ Form::close() }}
</div>
@stop
