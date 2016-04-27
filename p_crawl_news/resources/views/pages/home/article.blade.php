@extends('extends/globalHome')

@section('content')
<h1>Article</h1>
@include('include/home/article_group', array('titleGroup'=>'','classname'=>'articleNew','data'=>[]))
@stop

@section('head')
<title>Article</title>
@stop

@section('js')
@stop