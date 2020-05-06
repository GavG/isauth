<?php
Route::middleware(config('isAuth.middleware')??'web')->namespace("gavg\isauth")->group(function (){
    Route::get("isAuth","isAuthController@isAuth")->name("isAuth");
    Route::post("ajaxlogin","isAuthController@ajaxlogin");
});
