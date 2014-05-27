<?php

App::error(function(Exception $exception, $code)
{
    $templates = array('401', '403', '404', '500', '503');

    if (Request::ajax())
    {
        return Response::json(array('error' => array('message' => $exception->getMessage(), 'code' => $code)), $code);
    }

    return Response::view((in_array($code, $templates) ? $code : '500'), array('error' => $exception->getMessage(), 'code' => $code), $code);
});

App::missing(function($exception)
{
    if (Request::ajax())
    {
        return Response::json(array('error' => 'Não encontrado.', 'code' => 404), 404);
    }

    return Response::view('404', array('code' => 404), 404);
});
