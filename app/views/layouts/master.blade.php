<!DOCTYPE html>
<html class="no-js{{ empty($class) ? '' :  ' ' . $class }}" lang="pt-br" xmlns:ng="http://angularjs.org" id="ng-app">
    <head>

        <title>{{ empty($title) ? '' : $title . ' | ' }}{{ Config::get('business.site_name') }}</title>

        <!-- Meta -->
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="robots" content="index, follow">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

{{ newrelic('get_browser_timing_header') }}

        <!-- Styles -->
        <style> .ng-cloak { display: none !important; } </style>
        <link rel="stylesheet" href="{{ URL::asset(($production ? 'dist' : 'app') . '/vendor/bootstrap/dist/css/bootstrap.css') }}">
        <link rel="stylesheet" href="{{ URL::asset(($production ? 'dist' : 'app') . '/' . (empty($main) ? 'main' : "$main/$main") . '.css') }}">

@yield('styles') 

        <!-- Scripts -->
        <script>
            var require = {
                config: function(options) {
                    require = options;
                    require.baseUrl = "{{ URL::asset($production ? 'dist' : 'app'); }}";
                }
            };
        </script>
        <script src="{{ URL::asset(($production ? 'dist' : 'app') . '/common.js') }}"></script>
@if ($production) 
        <script src="{{ URL::asset('dist/vendor/requirejs/require.js') }}" data-main="{{ URL::asset('dist/' . (empty($main) ? 'main' : "$main/$main") . '-built.js') }}"></script>
@else 
        <script src="{{ URL::asset('app/vendor/requirejs/require.js') }}" data-main="{{ URL::asset('app/' . (empty($main) ? 'main' : "$main/$main") . '.js') }}"></script>
@endif 

        <!--[if lte IE 7]>
            <script src="{{ URL::asset(($production ? 'dist' : 'app') . '/vendor/json3/lib/json3.js') }}"></script>
        <![endif]-->

        <!--[if lt IE 9]>
            <script src="{{ URL::asset(($production ? 'dist' : 'app') . '/vendor/respond/dest/respond.js') }}"></script>
            <script src="{{ URL::asset(($production ? 'dist' : 'app') . '/vendor/selectivizr/selectivizr.js') }}"></script>
        <![endif]-->

@yield('scripts') 

    </head>
    <body class="{{ empty($main) ? '' : $main }}">

        <span id="top"></span>

@yield('top') 

        <a class="sr-only" href="#content">Pular navegação</a>

        <!-- Full height wrapper -->
        <div id="wrapper">

@include('layouts.master.header') 

            <a class="sr-only" name="content"></a>

            <!-- Main page container -->
            <section class="container" role="main" id="content">

@include('layouts.master.alerts') 

                <!-- Contents -->
@yield('content') 
                <!-- /Contents -->

            </section>
            <!-- /Main page container -->

        </div>
        <!-- /Full height wrapper -->

@include('layouts.master.footer') 

@yield('javascript') 

{{ newrelic('get_browser_timing_footer') }}

    </body>
</html>
