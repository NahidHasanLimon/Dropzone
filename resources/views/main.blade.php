<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Uploading images in Laravel with DropZone</title>
 
    <link rel="stylesheet" href="{{ url('/css/bootstrap.css') }}">
 
    @yield('head')
     <style>
        .loader {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 9999;
    /*background: {{ url('/images/loader/dr.gif') }} 50% 50% no-repeat rgb(249,249,249);*/
    /*background: url('gif/giphy.gif') 50% 50% no-repeat rgb(249,249,249);*/
    opacity: .8;
}
    </style>
</head>
<body>
       @yield('loaderSection')
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="{{ url('/') }}">Upload</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="{{ url('/') }}">Upload Images</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{ url('/images-show') }}">View Uploaded Files</a>
                </li>
            </ul>
        </div>
    </nav>
    <div class="container-fluid">
        @yield('content')
    </div>
 
    @yield('js')
 
</body>
</html>