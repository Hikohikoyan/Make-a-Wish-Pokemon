<?php
function return_null($errcode,$errmsg){
    $return_null=[
        'errcode'=>$errcode,
        'errmsg'=>$errmsg
    ];
    return response()->json($return_null);
}